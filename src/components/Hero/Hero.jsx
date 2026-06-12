"use client";

// ========================================
// HERO SECTION — Chef Akanksha
// ========================================
import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { siteContent } from '../../data/content';
import { LeafSVG, PawPrintSVG, KittenPawSVG } from '../../assets/svg/Icons';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const parallaxRefs = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const smoothPos = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  const { hero } = siteContent;
  const descriptionParagraphs = hero.description.split('\n\n');

  // --- Mouse parallax with lerp-smoothed rAF ---
  const handleMouseMove = useCallback((e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mousePos.current.x = (e.clientX - cx) / cx;
    mousePos.current.y = (e.clientY - cy) / cy;
  }, []);

  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      smoothPos.current.x = lerp(smoothPos.current.x, mousePos.current.x, 0.08);
      smoothPos.current.y = lerp(smoothPos.current.y, mousePos.current.y, 0.08);

      parallaxRefs.current.forEach((el) => {
        if (!el) return;
        const depth = parseFloat(el.dataset.depth || 1);
        const moveX = smoothPos.current.x * 30 * depth;
        const moveY = smoothPos.current.y * 20 * depth;
        el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });

      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [handleMouseMove]);

  // --- GSAP animations ---
  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Entrance: label
    gsap.fromTo(
      section.querySelector('.hero__label'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power2.out' }
    );

    // Entrance: headline lines clip-path reveal
    const headlineLines = section.querySelectorAll('.hero__headline-line');
    headlineLines.forEach((line, i) => {
      gsap.fromTo(
        line,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 1.2,
          delay: 0.4 + i * 0.15,
          ease: 'power3.out',
        }
      );
    });

    // Entrance: subtitle
    gsap.fromTo(
      section.querySelector('.hero__subtitle'),
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.9, ease: 'power2.out' }
    );

    // Entrance: description paragraphs
    const descEls = section.querySelectorAll('.hero__desc');
    descEls.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, delay: 1.1 + i * 0.12, ease: 'power2.out' }
      );
    });

    // Entrance: CTA buttons
    gsap.fromTo(
      section.querySelectorAll('.hero__cta-btn'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 1.4, stagger: 0.12, ease: 'power2.out' }
    );

    // Entrance: image blob reveal
    gsap.fromTo(
      section.querySelector('.hero__image-wrapper'),
      {
        clipPath: 'circle(0% at 50% 50%)',
        opacity: 0,
      },
      {
        clipPath: 'circle(75% at 50% 50%)',
        opacity: 1,
        duration: 1.6,
        delay: 0.3,
        ease: 'power3.out',
      }
    );

    // Entrance: stats
    gsap.fromTo(
      section.querySelectorAll('.hero__stat'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, delay: 1.6, stagger: 0.1, ease: 'power2.out' }
    );

    // --- Scroll-based parallax ---
    // Image drifts downward on scroll
    gsap.fromTo(
      section.querySelector('.hero__image-wrapper'),
      { y: 0 },
      {
        y: 120,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    // Content fades and drifts up on scroll
    gsap.fromTo(
      section.querySelector('.hero__content'),
      { opacity: 1, y: 0 },
      {
        opacity: 0,
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: '20% top',
          end: '80% top',
          scrub: true,
        },
      }
    );

    // Stats drift up on scroll
    gsap.fromTo(
      section.querySelector('.hero__stats'),
      { opacity: 1, y: 0 },
      {
        opacity: 0,
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: '30% top',
          end: '90% top',
          scrub: true,
        },
      }
    );
  }, { scope: sectionRef });

  const addParallaxRef = useCallback((el) => {
    if (el && !parallaxRefs.current.includes(el)) {
      parallaxRefs.current.push(el);
    }
  }, []);

  return (
    <section className="hero section" id="hero" ref={sectionRef}>
      <div className="grain-overlay" />
      {/* Decorative parallax elements */}
      <div className="hero__decorations">
        <div ref={addParallaxRef} data-depth="1.2" className="hero__deco hero__deco--leaf-1" style={{ willChange: 'transform' }}>
          <LeafSVG size={64} color="var(--leaf-green)" />
        </div>
        <div ref={addParallaxRef} data-depth="0.8" className="hero__deco hero__deco--paw-1" style={{ willChange: 'transform' }}>
          <PawPrintSVG size={40} color="var(--soft-pink)" />
        </div>
        <div ref={addParallaxRef} data-depth="1.5" className="hero__deco hero__deco--leaf-2" style={{ willChange: 'transform' }}>
          <LeafSVG size={48} color="var(--sage)" />
        </div>
        <div ref={addParallaxRef} data-depth="0.6" className="hero__deco hero__deco--paw-2" style={{ willChange: 'transform' }}>
          <KittenPawSVG size={28} color="var(--tan)" />
        </div>
        <div ref={addParallaxRef} data-depth="1.0" className="hero__deco hero__deco--leaf-3" style={{ willChange: 'transform' }}>
          <LeafSVG size={36} color="var(--olive-green)" />
        </div>
      </div>

      <div className="container hero__container">
        {/* Text content */}
        <div className="hero__content" ref={contentRef}>
          <span className="hero__label label">{hero.label}</span>

          <h1 className="hero__headline">
            {hero.headline.map((line, i) => (
              <span key={i} className="hero__headline-line" style={{ willChange: 'clip-path, opacity' }}>
                {line}
              </span>
            ))}
          </h1>

          <p className="hero__subtitle handwritten">{hero.subtitle}</p>

          <div className="hero__description">
            {descriptionParagraphs.map((para, i) => (
              <p key={i} className="hero__desc">{para}</p>
            ))}
          </div>

          <div className="hero__cta-group">
            <a href="#journey" className="btn btn--primary hero__cta-btn">
              {hero.cta}
            </a>
            <a href="#contact" className="btn btn--outline hero__cta-btn">
              {hero.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Chef image in organic blob */}
        <div className="hero__visual" ref={imageRef} style={{ position: 'relative' }}>
          <div className="hero__image-wrapper" style={{ willChange: 'clip-path, transform, opacity' }}>
            <div className="hero__blob-shape">
              <img
                src="/images/hero-chef1.jpeg"
                alt="Chef Akanksha — Plant-based culinary artist"
                className="hero__image"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="hero__stats">
        <div className="container">
          <div className="hero__stats-inner">
            {hero.stats.map((stat, i) => (
              <div key={i} className="hero__stat">
                <span className="hero__stat-number">{stat.number}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Organic SVG wave divider */}
      <div className="hero__wave-divider">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C180,120 360,0 540,60 C720,120 900,20 1080,60 C1200,85 1320,40 1440,60 L1440,120 L0,120 Z"
            fill="var(--cream)"
          />
          <path
            d="M0,80 C200,100 400,40 600,80 C800,120 1000,50 1200,80 C1320,95 1380,70 1440,80 L1440,120 L0,120 Z"
            fill="var(--cream)"
            opacity="0.5"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
