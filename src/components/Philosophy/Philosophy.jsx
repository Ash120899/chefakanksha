import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { siteContent } from '../../data/content';
import { PawPrintSVG, LeafSVG } from '../../assets/svg/Icons';
import './Philosophy.css';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Smooth scrub-based reveals
    gsap.fromTo('.philosophy__image-frame',
      { clipPath: 'inset(100% 0 0 0)', scale: 1.15 },
      { clipPath: 'inset(0% 0 0 0)', scale: 1, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', end: 'center 60%', scrub: true }
      }
    );

    gsap.fromTo('.philosophy__title',
      { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' },
      { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', ease: 'none',
        scrollTrigger: { trigger: '.philosophy__content', start: 'top 85%', end: 'top 55%', scrub: true }
      }
    );

    gsap.fromTo('.philosophy__text',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, ease: 'none',
        scrollTrigger: { trigger: '.philosophy__text', start: 'top 90%', end: 'top 65%', scrub: true }
      }
    );

    gsap.fromTo('.philosophy__cta',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, ease: 'none',
        scrollTrigger: { trigger: '.philosophy__cta', start: 'top 92%', end: 'top 72%', scrub: true }
      }
    );

    // Image parallax
    gsap.to('.philosophy__image-inner', {
      y: -50, ease: 'none',
      scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
    });

    // Quote reveal
    gsap.fromTo('.philosophy__quote',
      { opacity: 0, scale: 0.8, rotation: 0 },
      { opacity: 0.3, scale: 1, rotation: -8, ease: 'none',
        scrollTrigger: { trigger: '.philosophy__quote', start: 'top 90%', end: 'top 50%', scrub: true }
      }
    );
  }, { scope: sectionRef });

  const { philosophy } = siteContent;

  return (
    <section ref={sectionRef} className="philosophy section" id="philosophy">
      <div className="grain-overlay" />
      <div className="container philosophy__container">
        <div className="philosophy__image">
          <div className="philosophy__image-frame">
            <div className="philosophy__image-inner">
              <img src="/images/food-spread.png" alt="Vegan food spread" className="philosophy__img" loading="lazy" />
            </div>
          </div>
          <div className="philosophy__image-deco">
            <LeafSVG size={30} color="var(--leaf-green)" />
          </div>
        </div>
        <div className="philosophy__content">
          <span className="philosophy__label label">{philosophy.label} 🌿</span>
          <h2 className="philosophy__title">{philosophy.title}</h2>
          <p className="philosophy__text">{philosophy.content}</p>
          <a href="#food-philosophy" className="philosophy__cta">{philosophy.cta} →</a>
          <div className="philosophy__quote handwritten">{philosophy.quote}</div>
        </div>
      </div>
      <div className="philosophy__paws">
        {[...Array(5)].map((_, i) => (
          <PawPrintSVG key={i} size={14 + i * 2} color="var(--tan)" style={{ left: `${10 + i * 18}%`, top: `${80 + Math.sin(i) * 10}%`, position: 'absolute', opacity: 0.1 }} />
        ))}
      </div>

      {/* Organic wave transition to next section */}
      <div className="section-wave section-wave--bottom">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,40 C360,100 720,0 1080,50 C1260,75 1380,30 1440,45 L1440,100 L0,100Z" fill="var(--warm-beige)" />
        </svg>
      </div>
    </section>
  );
}
