"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LeafSVG } from '@/assets/svg/Icons';
import './admin.css';

export default function AdminDashboard() {
  const router = useRouter();
  const editorRef = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('blogs'); // blogs, edit-blog, testimonials, edit-testimonial, milestones, edit-milestone, messages

  // Blog form states
  const [blogForm, setBlogForm] = useState({ id: '', title: '', excerpt: '', content: '', image: '', category: 'Culinary Philosophy' });
  const [blogLoading, setBlogLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Testimonial form states
  const [testimonialForm, setTestimonialForm] = useState({ id: '', rating: 5, text: '', avatar: '🌿', author: '', role: '' });
  const [testimonialLoading, setTestimonialLoading] = useState(false);
  const [isEditingTestimonial, setIsEditingTestimonial] = useState(false);

  // Milestone form states
  const [milestoneForm, setMilestoneForm] = useState({ id: '', org: '', title: '', description: '', type: 'training' });
  const [milestoneLoading, setMilestoneLoading] = useState(false);
  const [isEditingMilestone, setIsEditingMilestone] = useState(false);

  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Sync editor content editable value only when activeTab or blog ID changes (prevents cursor jumping)
  useEffect(() => {
    if (activeTab === 'edit-blog' && editorRef.current) {
      if (editorRef.current.innerHTML !== blogForm.content) {
        editorRef.current.innerHTML = blogForm.content || '';
      }
    }
  }, [activeTab, blogForm.id]);

  // Client-side image compression and Base64 conversion
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800; // Resize large images to optimized maximum width
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Compress as JPEG at 0.7 quality to output a lightweight Base64 string
        const base64 = canvas.toDataURL('image/jpeg', 0.7);
        setBlogForm({ ...blogForm, image: base64 });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Rich Text command executors
  const formatDoc = (cmd, value = null) => {
    document.execCommand(cmd, false, value);
    if (editorRef.current) {
      setBlogForm(prev => ({ ...prev, content: editorRef.current.innerHTML }));
    }
  };

  const insertHTML = (html) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    range.deleteContents();

    const div = document.createElement('div');
    div.innerHTML = html;

    const fragment = document.createDocumentFragment();
    let node;
    while ((node = div.firstChild)) {
      fragment.appendChild(node);
    }

    range.insertNode(fragment);

    if (editorRef.current) {
      setBlogForm(prev => ({ ...prev, content: editorRef.current.innerHTML }));
    }
  };

  // Fetch all CMS data
  const fetchData = async () => {
    try {
      const [blogsRes, messagesRes, testimonialsRes, milestonesRes] = await Promise.all([
        fetch('/api/blogs'),
        fetch('/api/contact'),
        fetch('/api/testimonials'),
        fetch('/api/milestones')
      ]);

      if (
        blogsRes.status === 401 ||
        messagesRes.status === 401 ||
        testimonialsRes.status === 401 ||
        milestonesRes.status === 401
      ) {
        router.push('/login-now');
        return;
      }

      const blogsData = blogsRes.status === 200 ? await blogsRes.json() : { blogs: [] };
      const messagesData = messagesRes.status === 200 ? await messagesRes.json() : { messages: [] };
      const testimonialsData = testimonialsRes.status === 200 ? await testimonialsRes.json() : { testimonials: [] };
      const milestonesData = milestonesRes.status === 200 ? await milestonesRes.json() : { milestones: [] };

      setBlogs(blogsData.blogs || []);
      setMessages(messagesData.messages || []);
      setTestimonials(testimonialsData.testimonials || []);
      setMilestones(milestonesData.milestones || []);
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

  // -------------------------
  // BLOG POST HANDLERS
  // -------------------------
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

  // -------------------------
  // TESTIMONIAL HANDLERS
  // -------------------------
  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    setTestimonialLoading(true);
    setFormError('');
    setFormSuccess('');

    const endpoint = isEditingTestimonial ? `/api/testimonials/${testimonialForm.id}` : '/api/testimonials';
    const method = isEditingTestimonial ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonialForm),
      });
      const data = await res.json();

      if (data.success) {
        setFormSuccess(isEditingTestimonial ? 'Testimonial updated successfully!' : 'Testimonial created successfully!');
        resetForm();
        fetchData();
        setActiveTab('testimonials');
      } else {
        setFormError(data.error || 'Failed to submit testimonial');
      }
    } catch (err) {
      console.error(err);
      setFormError('Network error. Please try again.');
    } finally {
      setTestimonialLoading(false);
    }
  };

  const startEditTestimonial = (testimonial) => {
    setTestimonialForm(testimonial);
    setIsEditingTestimonial(true);
    setActiveTab('edit-testimonial');
  };

  const handleTestimonialDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchData();
      } else {
        alert(data.error || 'Failed to delete testimonial');
      }
    } catch (err) {
      console.error(err);
      alert('Network error deleting testimonial');
    }
  };

  // -------------------------
  // MILESTONE HANDLERS
  // -------------------------
  const handleMilestoneSubmit = async (e) => {
    e.preventDefault();
    setMilestoneLoading(true);
    setFormError('');
    setFormSuccess('');

    const endpoint = isEditingMilestone ? `/api/milestones/${milestoneForm.id}` : '/api/milestones';
    const method = isEditingMilestone ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(milestoneForm),
      });
      const data = await res.json();

      if (data.success) {
        setFormSuccess(isEditingMilestone ? 'Milestone updated successfully!' : 'Milestone created successfully!');
        resetForm();
        fetchData();
        setActiveTab('milestones');
      } else {
        setFormError(data.error || 'Failed to submit milestone');
      }
    } catch (err) {
      console.error(err);
      setFormError('Network error. Please try again.');
    } finally {
      setMilestoneLoading(false);
    }
  };

  const startEditMilestone = (milestone) => {
    setMilestoneForm(milestone);
    setIsEditingMilestone(true);
    setActiveTab('edit-milestone');
  };

  const handleMilestoneDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this milestone?')) return;

    try {
      const res = await fetch(`/api/milestones/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchData();
      } else {
        alert(data.error || 'Failed to delete milestone');
      }
    } catch (err) {
      console.error(err);
      alert('Network error deleting milestone');
    }
  };

  // -------------------------
  // COMMON HELPERS
  // -------------------------
  const resetForm = () => {
    setBlogForm({ id: '', title: '', excerpt: '', content: '', image: '', category: 'Culinary Philosophy' });
    setTestimonialForm({ id: '', rating: 5, text: '', avatar: '🌿', author: '', role: '' });
    setMilestoneForm({ id: '', org: '', title: '', description: '', type: 'training' });
    setIsEditing(false);
    setIsEditingTestimonial(false);
    setIsEditingMilestone(false);
    setFormError('');
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab !== 'edit-blog' && tab !== 'edit-testimonial' && tab !== 'edit-milestone') {
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
            onClick={() => handleTabChange('testimonials')}
            className={`admin-nav-item ${activeTab === 'testimonials' ? 'active' : ''}`}
          >
            Manage Testimonials
          </button>

          <button
            onClick={() => handleTabChange('edit-testimonial')}
            className={`admin-nav-item ${activeTab === 'edit-testimonial' ? 'active' : ''}`}
          >
            {isEditingTestimonial ? 'Edit Testimonial ✍️' : 'Add Testimonial ➕'}
          </button>

          <button
            onClick={() => handleTabChange('milestones')}
            className={`admin-nav-item ${activeTab === 'milestones' ? 'active' : ''}`}
          >
            Manage Journey (Timeline)
          </button>

          <button
            onClick={() => handleTabChange('edit-milestone')}
            className={`admin-nav-item ${activeTab === 'edit-milestone' ? 'active' : ''}`}
          >
            {isEditingMilestone ? 'Edit Milestone ✍️' : 'Add Milestone ➕'}
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
          <h2>
            {activeTab === 'blogs' && 'Manage Blogs'}
            {activeTab === 'edit-blog' && (isEditing ? 'Edit Blog Post' : 'Add New Blog Post')}
            {activeTab === 'testimonials' && 'Manage Testimonials'}
            {activeTab === 'edit-testimonial' && (isEditingTestimonial ? 'Edit Testimonial' : 'Add Testimonial')}
            {activeTab === 'milestones' && 'Manage Journey (Milestones)'}
            {activeTab === 'edit-milestone' && (isEditingMilestone ? 'Edit Milestone' : 'Add Milestone')}
            {activeTab === 'messages' && 'Contact Inquiries'}
          </h2>
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
                    <option value="Culinary Philosophy">Culinary Philosophy</option>
                    <option value="Culinary Innovation">Culinary Innovation</option>
                    <option value="Building Change">Building Change</option>
                    <option value="Beyond the Kitchen">Beyond the Kitchen</option>
                    <option value="Community and Change">Community and Change</option>
                    <option value="My Journey">My Journey</option>

                  </select>
                </div>
              </div>

              {/* Cover Image Upload Layout */}
              <div className="form-group">
                <label>Cover Image</label>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                  {blogForm.image && (
                    <img
                      src={blogForm.image}
                      alt="Preview"
                      style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.08)' }}
                    />
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, minWidth: '220px' }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                      id="blog-image-upload-input"
                    />
                    <label
                      htmlFor="blog-image-upload-input"
                      className="btn btn--outline"
                      style={{ display: 'inline-block', textAlign: 'center', cursor: 'pointer', margin: 0, padding: '10px 18px', fontSize: '0.85rem' }}
                    >
                      📸 Select & Upload Image
                    </label>
                    <span style={{ fontSize: '0.75rem', color: 'var(--tan)' }}>Or manually type/paste an image URL:</span>
                    <input
                      type="text"
                      value={blogForm.image}
                      onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                      placeholder="e.g. /images/sec-image.png or external link"
                      style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>
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

                {/* Rich text formatting toolbar */}
                <div className="editor-toolbar">
                  <button type="button" onClick={() => formatDoc('bold')} className="toolbar-btn" title="Bold"><b>B</b></button>
                  <button type="button" onClick={() => formatDoc('italic')} className="toolbar-btn" title="Italic"><i>I</i></button>
                  <button type="button" onClick={() => formatDoc('formatBlock', '<h2>')} className="toolbar-btn" title="Heading 2">H2</button>
                  <button type="button" onClick={() => formatDoc('formatBlock', '<h3>')} className="toolbar-btn" title="Heading 3">H3</button>
                  <button type="button" onClick={() => formatDoc('formatBlock', '<p>')} className="toolbar-btn" title="Paragraph">Paragraph</button>
                  <button type="button" onClick={() => formatDoc('insertHorizontalRule')} className="toolbar-btn" title="Line Break">Divider</button>

                  <span style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />

                  <button type="button" onClick={() => {
                    const sel = window.getSelection().toString();
                    insertHTML(`<span style="font-size: 1.25rem;">${sel || 'Large Text'}</span>`);
                  }} className="toolbar-btn" title="Large Text">Large Text</button>

                  <button type="button" onClick={() => {
                    const sel = window.getSelection().toString();
                    insertHTML(`<span style="font-size: 1.5rem;">${sel || 'XL Text'}</span>`);
                  }} className="toolbar-btn" title="XL Text">XL Text</button>

                  <button type="button" onClick={() => {
                    const sel = window.getSelection().toString();
                    insertHTML(`<blockquote style="font-size: 1.25rem; font-style: italic; color: var(--leaf-green); border-left: 3px solid var(--leaf-green); padding-left: 15px; margin: 15px 0;">${sel || 'Quote highlight...'}</blockquote>`);
                  }} className="toolbar-btn" title="Highlight Quote">Quote Highlight</button>

                  <span style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />

                  <button type="button" onClick={() => {
                    const url = prompt('Enter link URL (e.g., https://example.com):');
                    if (url) {
                      const sel = window.getSelection().toString();
                      insertHTML(`<a href="${url}" target="_blank" style="color: var(--leaf-green); text-decoration: underline;">${sel || url}</a>`);
                    }
                  }} className="toolbar-btn" title="Insert Link">Link</button>

                  <button type="button" onClick={() => {
                    const src = prompt('Enter image URL (e.g., /images/pasta-shot.png):');
                    if (src) insertHTML(`<img src="${src}" alt="" style="max-width: 100%; border-radius: var(--radius-lg); margin: 20px 0; border: 1px solid rgba(255,255,255,0.1);" />`);
                  }} className="toolbar-btn" title="Insert Image">Image</button>
                </div>

                {/* ContentEditable Rich Text Editor (Preserves Copy/Paste format naturally) */}
                <div
                  id="blog-content-textarea"
                  ref={editorRef}
                  contentEditable="true"
                  onInput={(e) => {
                    const html = e.currentTarget.innerHTML;
                    setBlogForm(prev => ({ ...prev, content: html }));
                  }}
                  onBlur={(e) => {
                    const html = e.currentTarget.innerHTML;
                    setBlogForm(prev => ({ ...prev, content: html }));
                  }}
                  className="editor-textarea editor-contenteditable"
                  style={{
                    minHeight: '280px',
                    maxHeight: '550px',
                    overflowY: 'auto',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '16px',
                    color: 'var(--cream)',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    outline: 'none',
                    borderBottomLeftRadius: 'var(--radius-md)',
                    borderBottomRightRadius: 'var(--radius-md)'
                  }}
                />

                {/* Real-time HTML Preview */}
                {blogForm.content && (
                  <div className="editor-preview">
                    <div className="editor-preview-title">Real-time Article Preview</div>
                    <div
                      className="editor-preview-content"
                      dangerouslySetInnerHTML={{
                        __html: (() => {
                          const content = blogForm.content;
                          if (!content) return '';
                          if (!/<[a-z][\s\S]*>/i.test(content)) {
                            return content
                              .split('\n\n')
                              .map((p) => `<p>${p.trim().replace(/\n/g, '<br />')}</p>`)
                              .join('');
                          }
                          return content;
                        })()
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => handleTabChange('blogs')} className="btn btn--outline">Cancel</button>
                <button type="submit" disabled={blogLoading} className="btn btn--primary">
                  {blogLoading ? 'Saving...' : isEditing ? 'Update Article 📝' : 'Publish Article 🌿'}
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: TESTIMONIALS LIST */}
          {activeTab === 'testimonials' && (
            <div className="panel-list">
              {testimonials.length === 0 ? (
                <div className="panel-empty">No testimonials found. Create one now!</div>
              ) : (
                <div className="blogs-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Avatar</th>
                        <th>Author</th>
                        <th>Role</th>
                        <th>Rating</th>
                        <th>Review</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testimonials.map((t) => (
                        <tr key={t.id}>
                          <td style={{ fontSize: '1.5rem', width: '50px' }}>{t.avatar}</td>
                          <td className="table-title">{t.author}</td>
                          <td>{t.role}</td>
                          <td>{'★'.repeat(t.rating)}</td>
                          <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.text}</td>
                          <td>
                            <div className="table-actions">
                              <button onClick={() => startEditTestimonial(t)} className="tbl-btn tbl-btn--edit">Edit</button>
                              <button onClick={() => handleTestimonialDelete(t.id)} className="tbl-btn tbl-btn--delete">Delete</button>
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

          {/* TAB 4: TESTIMONIAL FORM (ADD/EDIT) */}
          {activeTab === 'edit-testimonial' && (
            <form onSubmit={handleTestimonialSubmit} className="blog-form">
              {formError && <div className="form-alert error">{formError}</div>}
              {formSuccess && <div className="form-alert success">{formSuccess}</div>}

              <div className="form-group-row">
                <div className="form-group flex-1">
                  <label>Author / Client Name</label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.author}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, author: e.target.value })}
                    placeholder="e.g. Dr. Meera Sharma"
                  />
                </div>

                <div className="form-group" style={{ width: '150px' }}>
                  <label>Rating (Stars)</label>
                  <select
                    value={testimonialForm.rating}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) })}
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group flex-1">
                  <label>Role / Organisation</label>
                  <input
                    type="text"
                    value={testimonialForm.role}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                    placeholder="e.g. Head of Culinary Arts, Chandigarh University"
                  />
                </div>

                <div className="form-group" style={{ width: '150px' }}>
                  <label>Avatar Emoji / Icon</label>
                  <input
                    type="text"
                    value={testimonialForm.avatar}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, avatar: e.target.value })}
                    placeholder="e.g. 🇮🇹 or 🍽️"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Review Text</label>
                <textarea
                  required
                  rows={6}
                  value={testimonialForm.text}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })}
                  placeholder="Write the testimonial review description here..."
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => handleTabChange('testimonials')} className="btn btn--outline">Cancel</button>
                <button type="submit" disabled={testimonialLoading} className="btn btn--primary">
                  {testimonialLoading ? 'Saving...' : isEditingTestimonial ? 'Update Testimonial 📝' : 'Publish Testimonial 🌿'}
                </button>
              </div>
            </form>
          )}

          {/* TAB 5: MILESTONES (JOURNEY) LIST */}
          {activeTab === 'milestones' && (
            <div className="panel-list">
              {milestones.length === 0 ? (
                <div className="panel-empty">No milestones found. Create one now!</div>
              ) : (
                <div className="blogs-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Organisation</th>
                        <th>Milestone / Title</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {milestones.map((m) => (
                        <tr key={m.id}>
                          <td className="table-title">{m.org}</td>
                          <td>{m.title}</td>
                          <td><span className="table-badge" style={{ textTransform: 'capitalize' }}>{m.type}</span></td>
                          <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.description}</td>
                          <td>
                            <div className="table-actions">
                              <button onClick={() => startEditMilestone(m)} className="tbl-btn tbl-btn--edit">Edit</button>
                              <button onClick={() => handleMilestoneDelete(m.id)} className="tbl-btn tbl-btn--delete">Delete</button>
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

          {/* TAB 6: MILESTONE FORM (ADD/EDIT) */}
          {activeTab === 'edit-milestone' && (
            <form onSubmit={handleMilestoneSubmit} className="blog-form">
              {formError && <div className="form-alert error">{formError}</div>}
              {formSuccess && <div className="form-alert success">{formSuccess}</div>}

              <div className="form-group-row">
                <div className="form-group flex-1">
                  <label>Organisation / Client</label>
                  <input
                    type="text"
                    required
                    value={milestoneForm.org}
                    onChange={(e) => setMilestoneForm({ ...milestoneForm, org: e.target.value })}
                    placeholder="e.g. Chandigarh University"
                  />
                </div>

                <div className="form-group" style={{ width: '220px' }}>
                  <label>Milestone Type</label>
                  <select
                    value={milestoneForm.type}
                    onChange={(e) => setMilestoneForm({ ...milestoneForm, type: e.target.value })}
                  >
                    <option value="training">Training</option>
                    <option value="event">Event</option>
                    <option value="venture">Venture</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Milestone Title</label>
                <input
                  type="text"
                  required
                  value={milestoneForm.title}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, title: e.target.value })}
                  placeholder="e.g. Faculty Vegan Culinary Workshop"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  required
                  rows={6}
                  value={milestoneForm.description}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, description: e.target.value })}
                  placeholder="Describe the milestone or achievement..."
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => handleTabChange('milestones')} className="btn btn--outline">Cancel</button>
                <button type="submit" disabled={milestoneLoading} className="btn btn--primary">
                  {milestoneLoading ? 'Saving...' : isEditingMilestone ? 'Update Milestone 📝' : 'Publish Milestone 🌿'}
                </button>
              </div>
            </form>
          )}

          {/* TAB 7: CONTACT SUBMISSIONS */}
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
