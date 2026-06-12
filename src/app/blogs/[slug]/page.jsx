import { notFound } from 'next/navigation';
import { readDB } from '@/lib/db';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import CustomCursor from '@/components/CustomCursor/CustomCursor';
import Link from 'next/link';
import './blogDetail.css';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const db = await readDB();
  const post = db.blogs.find((b) => b.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found — Chef Akanksha',
    };
  }

  return {
    title: `${post.title} — Chef Akanksha`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const db = await readDB();
  const post = db.blogs.find((b) => b.slug === slug);

  if (!post) {
    notFound();
  }

  // Split content by newline to render separate paragraphs
  const paragraphs = post.content.split('\n\n');

  return (
    <div className="blog-detail-root">
      <CustomCursor />
      <Navbar />

      <main className="blog-detail-main">
        <div className="grain-overlay" />
        
        <div className="container container--narrow">
          {/* Back button */}
          <Link href="/#blog" className="blog-detail-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Journal
          </Link>

          {/* Article Header */}
          <header className="blog-detail-header">
            <span className="blog-detail-category label">{post.category}</span>
            <h1 className="blog-detail-title">{post.title}</h1>
            <div className="blog-detail-meta">
              <span>Published on {post.date}</span>
              <span>•</span>
              <span>By Chef Akanksha</span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="blog-detail-img-wrapper">
            <img 
              src={post.image || '/images/sec-image.png'} 
              alt={post.title} 
              className="blog-detail-img" 
            />
          </div>

          {/* Article Content */}
          <article className="blog-detail-content">
            {paragraphs.map((para, i) => {
              if (para.trim()) {
                return <p key={i}>{para}</p>;
              }
              return null;
            })}
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  try {
    const db = await readDB();
    return (db.blogs || []).map((post) => ({
      slug: post.slug,
    }));
  } catch (err) {
    console.error('generateStaticParams error:', err);
    return [];
  }
}
