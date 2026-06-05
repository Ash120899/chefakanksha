import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { siteContent } from '../../data/content';
import { HeartSVG, LeafSVG } from '../../assets/svg/Icons';
import './PersonalStory.css';

gsap.registerPlugin(ScrollTrigger);

export default function PersonalStory() {
  const sectionRef = useRef(null);
  const { personalStory } = siteContent;

  useGSAP(() => {
    // Label reveal
    gsap.fromTo('.personal-story__label',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, ease: 'none',
        scrollTrigger: { trigger: '.personal-story__header', start: 'top 88%', end: 'top 68%', scrub: true }
      }
    );

    // Title reveal with clip-path
    gsap.fromTo('.personal-story__title',
      { opacity: 0, y: 50, clipPath: 'inset(100% 0 0 0)' },
      { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', ease: 'none',
        scrollTrigger: { trigger: '.personal-story__header', start: 'top 82%', end: 'top 58%', scrub: true }
      }
    );

    // Background image parallax
    gsap.fromTo('.personal-story__bg-image',
      { y: -40, scale: 1.1 },
      { y: 40, scale: 1, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      }
    );

    // Paragraph reveals — staggered via individual triggers
    const paragraphs = gsap.utils.toArray('.personal-story__paragraph');
    paragraphs.forEach((p, i) => {
      gsap.fromTo(p,
        { opacity: 0, y: 35, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', ease: 'none',
          scrollTrigger: { trigger: p, start: 'top 90%', end: 'top 65%', scrub: true }
        }
      );
    });

    // Blog preview card reveal
    gsap.fromTo('.personal-story__blog-card',
      { opacity: 0, y: 60, rotateX: 8, scale: 0.95 },
      { opacity: 1, y: 0, rotateX: 0, scale: 1, ease: 'none',
        scrollTrigger: { trigger: '.personal-story__blog-card', start: 'top 90%', end: 'top 60%', scrub: true }
      }
    );

    // CTA reveal
    gsap.fromTo('.personal-story__cta',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, ease: 'none',
        scrollTrigger: { trigger: '.personal-story__cta', start: 'top 92%', end: 'top 72%', scrub: true }
      }
    );

    // Decorative heart float
    gsap.fromTo('.personal-story__heart-deco',
      { y: 20, rotation: -10, opacity: 0 },
      { y: -20, rotation: 10, opacity: 0.15, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      }
    );

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="personal-story section section--alt" id="personal-story">
      <div className="grain-overlay" />

      {/* Background image */}
      <div className="personal-story__bg-wrapper">
        <img
          src="/images/sanctuary.png"
          alt=""
          className="personal-story__bg-image"
          loading="lazy"
          aria-hidden="true"
        />
        <div className="personal-story__bg-overlay" />
      </div>

      <div className="container container--narrow personal-story__container">
        {/* Header */}
        <div className="personal-story__header">
          <span className="personal-story__label label">
            {personalStory.label} 💛
          </span>
          <h2 className="personal-story__title">{personalStory.title}</h2>
          <hr className="divider divider--center" />
        </div>

        {/* Two-column layout */}
        <div className="personal-story__body">
          {/* Text column */}
          <div className="personal-story__text">
            {personalStory.paragraphs.map((text, i) => (
              <p
                key={i}
                className={`personal-story__paragraph ${
                  i >= personalStory.paragraphs.length - 2
                    ? 'personal-story__paragraph--emphasis'
                    : ''
                }`}
                style={{ willChange: 'transform, opacity, filter' }}
              >
                {text}
              </p>
            ))}
          </div>

          {/* Blog preview card */}
          <div className="personal-story__blog-card" style={{ willChange: 'transform, opacity' }}>
            <div className="personal-story__blog-inner">
              <span className="personal-story__blog-tag">FROM THE BLOG</span>
              <h4 className="personal-story__blog-title">{personalStory.blogTitle}</h4>
              <div className="personal-story__blog-line" />
              <p className="personal-story__blog-excerpt">
                A personal story about identity, compassion, and the moment everything almost ended — but didn't.
              </p>
              <a href="#blog" className="personal-story__cta btn btn--outline" style={{ willChange: 'transform, opacity' }}>
                {personalStory.cta} →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative hearts */}
      <div className="personal-story__heart-deco personal-story__heart-deco--1" style={{ willChange: 'transform' }}>
        <HeartSVG size={40} color="var(--soft-pink)" />
      </div>
      <div className="personal-story__heart-deco personal-story__heart-deco--2" style={{ willChange: 'transform' }}>
        <LeafSVG size={34} color="var(--sage)" />
      </div>

      {/* Organic wave divider */}
      <div className="section-wave section-wave--bottom">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,60 C240,20 480,90 720,40 C960,0 1200,70 1440,30 L1440,100 L0,100Z" fill="var(--cream)" />
        </svg>
      </div>
    </section>
  );
}
