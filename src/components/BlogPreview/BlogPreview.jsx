"use client";

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'motion/react';
import { LeafSVG } from '../../assets/svg/Icons';
import PeekingAnimal from '../PeekingAnimal/PeekingAnimal';
import './BlogPreview.css';

gsap.registerPlugin(ScrollTrigger);

export default function BlogPreview() {
  const sectionRef = useRef(null);
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  // Fetch blogs dynamically from local CMS API
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('/api/blogs');
        const data = await res.json();
        if (data.success) {
          setBlogs(data.blogs || []);
        } else {
          setError(data.error || 'Failed to load posts');
        }
      } catch (err) {
        console.error(err);
        setError('Network error loading posts');
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  // Handle responsive columns
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP scroll reveals
  useGSAP(() => {
    if (loading || blogs.length === 0) return;
    
    gsap.fromTo('.blog__header > *',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
    );
    gsap.fromTo('.blog__slider-container',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: '.blog__slider-container', start: 'top 80%' } }
    );
  }, { scope: sectionRef, dependencies: [loading, blogs] });

  const maxIndex = Math.max(0, blogs.length - visibleCards);

  const slidePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const slideNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section ref={sectionRef} className="blog section section--alt" id="blog">
      <div className="grain-overlay" />

      {/* Peeking Animal mini-game */}
      <PeekingAnimal type="kitten" position="bottom" />

      {/* Decorative floating leaves */}
      <div className="blog__deco blog__deco--1">
        <LeafSVG size={32} color="rgba(122, 158, 109, 0.1)" />
      </div>
      <div className="blog__deco blog__deco--2">
        <LeafSVG size={24} color="rgba(122, 158, 109, 0.08)" />
      </div>

      <div className="container">
        {/* Header */}
        <div className="blog__header text-center">
          <span className="blog__label label">FROM THE KITCHEN JOURNAL ✦</span>
          <h2 className="blog__title">Stories & Philosophy</h2>
          <p className="blog__subtitle">Insights into plant-based innovation, culinary training, and food creations.</p>
        </div>

        {/* Dynamic States */}
        {loading ? (
          <div className="blog__loading text-center">
            <div className="blog__spinner" />
            <p>Gathering fresh articles...</p>
          </div>
        ) : error ? (
          <div className="blog__error text-center">
            <p>{error}</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="blog__empty text-center">
            <p>No articles posted yet. Check back soon!</p>
          </div>
        ) : (
          <div className="blog__slider-wrapper">
            {/* Slider window */}
            <div className="blog__slider-container">
              <div 
                className="blog__slider-track" 
                style={{ 
                  transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
                  width: `${(blogs.length / visibleCards) * 100}%`
                }}
              >
                {blogs.map((post) => (
                  <div 
                    key={post.id} 
                    className="blog__slider-slide"
                    style={{ width: `${100 / blogs.length}%` }}
                  >
                    <Link href={`/blogs/${post.slug}`} className="blog__card card">
                      {/* Image container */}
                      <div className="blog__card-img-container">
                        <img 
                          src={post.image || '/images/sec-image.png'} 
                          alt={post.title} 
                          className="blog__card-img"
                          loading="lazy"
                        />
                        <span className="blog__card-tag">{post.category}</span>
                      </div>
                      
                      {/* Card Content */}
                      <div className="blog__card-body">
                        <span className="blog__card-date">{post.date}</span>
                        <h4 className="blog__card-headline">{post.title}</h4>
                        <p className="blog__card-desc">{post.excerpt}</p>
                        <span className="blog__card-link">
                          Read Story 
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Controls */}
            {blogs.length > visibleCards && (
              <div className="blog__controls">
                <button 
                  onClick={slidePrev} 
                  disabled={currentIndex === 0}
                  className="blog__control-btn blog__control-btn--prev"
                  aria-label="Previous posts"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                
                {/* Dots indicator */}
                <div className="blog__dots">
                  {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`blog__dot ${currentIndex === i ? 'blog__dot--active' : ''}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>

                <button 
                  onClick={slideNext} 
                  disabled={currentIndex === maxIndex}
                  className="blog__control-btn blog__control-btn--next"
                  aria-label="Next posts"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
