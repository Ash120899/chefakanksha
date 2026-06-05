import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'motion/react';
import { siteContent } from '../../data/content';
import { icons } from '../../assets/svg/Icons';
import './BlogPreview.css';

gsap.registerPlugin(ScrollTrigger);

export default function BlogPreview() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.blog__header > *',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
    );
    gsap.utils.toArray('.blog__card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, delay: i * 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%' }
        }
      );
    });
  }, { scope: sectionRef });

  const { blog } = siteContent;

  return (
    <section ref={sectionRef} className="blog section" id="blog">
      <div className="container">
        <div className="blog__header text-center">
          <span className="label">{blog.label} ✍️</span>
          <h2>{blog.title}</h2>
        </div>
        <div className="blog__grid">
          {blog.posts.map((post) => (
            <motion.article key={post.id} className="blog__card card" whileHover={{ y: -6 }}>
              <div className="blog__card-accent" style={{ background: post.color }} />
              <span className="blog__card-category" style={{ color: post.color }}>{post.category}</span>
              <h4 className="blog__card-title">{post.title}</h4>
              <p className="blog__card-excerpt">{post.excerpt}</p>
              <div className="blog__card-meta">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="blog__more text-center">
          <a href="#" className="btn btn--outline">View All Posts {icons.arrow(16)}</a>
        </div>
      </div>
    </section>
  );
}
