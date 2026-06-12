"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LeafSVG } from '@/assets/svg/Icons';
import './admin.css';

export default function AdminDashboard() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('blogs'); // blogs, messages, edit-blog
  
  // Blog form states
  const [blogForm, setBlogForm] = useState({ id: '', title: '', excerpt: '', content: '', image: '', category: 'My Journey' });
  const [blogLoading, setBlogLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Fetch blogs & contact messages
  const fetchData = async () => {
    try {
      const [blogsRes, messagesRes] = await Promise.all([
        fetch('/api/blogs'),
        fetch('/api/contact')
      ]);

      if (blogsRes.status === 401 || messagesRes.status === 401) {
        router.push('/login-now');
        return;
      }

      const blogsData = await blogsRes.status === 200 ? await blogsRes.json() : { blogs: [] };
      const messagesData = await messagesRes.status === 200 ? await messagesRes.json() : { messages: [] };

      setBlogs(blogsData.blogs || []);
      setMessages(messagesData.messages || []);
    } catch (err) {
      console.error('Error fetching CMS data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login-now');
    } catch (err) {
      console.error(err);
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setBlogLoading(true);
    setFormError('');
    setFormSuccess('');

    const endpoint = isEditing ? `/api/blogs/${blogForm.id}` : '/api/blogs';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogForm),
      });
      const data = await res.json();

      if (data.success) {
        setFormSuccess(isEditing ? 'Blog updated successfully!' : 'Blog created successfully!');
        resetForm();
        fetchData();
        setActiveTab('blogs');
      } else {
        setFormError(data.error || 'Failed to submit article');
      }
    } catch (err) {
      console.error(err);
      setFormError('Network error. Please try again.');
    } finally {
      setBlogLoading(false);
    }
  };

  const startEdit = (blog) => {
    setBlogForm(blog);
    setIsEditing(true);
    setActiveTab('edit-blog');
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchData();
      } else {
        alert(data.error || 'Failed to delete blog');
      }
    } catch (err) {
      console.error(err);
      alert('Network error deleting blog');
    }
  };

  const resetForm = () => {
    setBlogForm({ id: '', title: '', excerpt: '', content: '', image: '', category: 'My Journey' });
    setIsEditing(false);
    setFormError('');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab !== 'edit-blog') {
      resetForm();
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner" />
        <p>Verifying secure CMS session...</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="grain-overlay" />
      
      {/* Sidebar Nav */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <LeafSVG size={28} color="var(--leaf-green)" />
          <span>Chef CMS</span>
        </div>
        
        <nav className="admin-nav">
          <button 
            onClick={() => handleTabChange('blogs')}
            className={`admin-nav-item ${activeTab === 'blogs' ? 'active' : ''}`}
          >
            Manage Blogs
          </button>
          
          <button 
            onClick={() => handleTabChange('edit-blog')}
            className={`admin-nav-item ${activeTab === 'edit-blog' ? 'active' : ''}`}
          >
            {isEditing ? 'Edit Post ✍️' : 'Add New Post ➕'}
          </button>
          
          <button 
            onClick={() => handleTabChange('messages')}
            className={`admin-nav-item ${activeTab === 'messages' ? 'active' : ''}`}
          >
            Inquiries Inbox ({messages.length})
          </button>
        </nav>
        
        <div className="admin-sidebar-footer">
          <Link href="/" className="admin-home-link">← Website Home</Link>
          <button onClick={handleLogout} className="admin-logout-btn">Logout 🔒</button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="admin-content">
        <header className="admin-header">
          <h2>{activeTab === 'blogs' ? 'Manage Blogs' : activeTab === 'messages' ? 'Contact Inquiries' : isEditing ? 'Edit Blog Post' : 'Add New Blog Post'}</h2>
          <span className="admin-session-badge">Session: Admin User</span>
        </header>

        <section className="admin-panel">
          {/* TAB 1: BLOGS LIST */}
          {activeTab === 'blogs' && (
            <div className="panel-list">
              {blogs.length === 0 ? (
                <div className="panel-empty">No blog posts found. Create one now!</div>
              ) : (
                <div className="blogs-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Cover</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Date Published</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.map((b) => (
                        <tr key={b.id}>
                          <td>
                            <img src={b.image} alt="" className="table-img" />
                          </td>
                          <td className="table-title">{b.title}</td>
                          <td><span className="table-badge">{b.category}</span></td>
                          <td>{b.date}</td>
                          <td>
                            <div className="table-actions">
                              <button onClick={() => startEdit(b)} className="tbl-btn tbl-btn--edit">Edit</button>
                              <button onClick={() => handleDelete(b.id)} className="tbl-btn tbl-btn--delete">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: BLOG FORM (ADD/EDIT) */}
          {activeTab === 'edit-blog' && (
            <form onSubmit={handleBlogSubmit} className="blog-form">
              {formError && <div className="form-alert error">{formError}</div>}
              {formSuccess && <div className="form-alert success">{formSuccess}</div>}

              <div className="form-group-row">
                <div className="form-group flex-1">
                  <label>Title</label>
                  <input
                    type="text"
                    required
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    placeholder="Enter article title..."
                  />
                </div>
                
                <div className="form-group" style={{ width: '220px' }}>
                  <label>Category</label>
                  <select
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                  >
                    <option value="My Journey">My Journey</option>
                    <option value="Culinary Innovation">Culinary Innovation</option>
                    <option value="Italian Craft">Italian Craft</option>
                    <option value="Kitchen Journal">Kitchen Journal</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Cover Image URL (e.g. /images/sec-image.png)</label>
                <input
                  type="text"
                  value={blogForm.image}
                  onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                  placeholder="e.g. /images/sec-image.png or external link"
                />
              </div>

              <div className="form-group">
                <label>Excerpt / Short Summary</label>
                <input
                  type="text"
                  required
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  placeholder="A short snippet for homepage slider card..."
                />
              </div>

              <div className="form-group">
                <label>Article Content</label>
                <textarea
                  required
                  rows={14}
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  placeholder="Write the blog contents here... (markdown or plain text)"
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => handleTabChange('blogs')} className="btn btn--outline">Cancel</button>
                <button type="submit" disabled={blogLoading} className="btn btn--primary">
                  {blogLoading ? 'Saving...' : isEditing ? 'Update Article 📝' : 'Publish Article 🌿'}
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: CONTACT SUBMISSIONS */}
          {activeTab === 'messages' && (
            <div className="panel-list">
              {messages.length === 0 ? (
                <div className="panel-empty">No inquiry messages in your inbox.</div>
              ) : (
                <div className="messages-grid">
                  {messages.map((m) => (
                    <div key={m.id} className="message-card">
                      <div className="message-card-header">
                        <div>
                          <span className="message-name">{m.name}</span>
                          <a href={`mailto:${m.email}`} className="message-email">{m.email}</a>
                        </div>
                        <span className="message-date">{m.date}</span>
                      </div>
                      <div className="message-subject"><strong>Inquiry:</strong> {m.subject}</div>
                      <p className="message-body">{m.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
