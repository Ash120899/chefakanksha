import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { siteContent } from '../../data/content';
import { LeafBranchSVG } from '../../assets/svg/Icons';
import './FarmToTable.css';

gsap.registerPlugin(ScrollTrigger);

export default function FarmToTable() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Scrub-based smooth reveals
    gsap.fromTo('.ftable__content > *',
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, stagger: 0.05, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', end: 'top 40%', scrub: true }
      }
    );

    gsap.fromTo('.ftable__image-frame',
      { clipPath: 'inset(0 100% 0 0)', scale: 1.1 },
      { clipPath: 'inset(0 0% 0 0)', scale: 1, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', end: 'center 55%', scrub: true }
      }
    );

    // Parallax
    gsap.to('.ftable__image-inner', { y: -40, ease: 'none',
      scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  }, { scope: sectionRef });

  const { farmToTable } = siteContent;

  return (
    <section ref={sectionRef} className="ftable section section--alt" id="farm-to-table">
      <div className="grain-overlay" />
      <div className="container ftable__container">
        <div className="ftable__content">
          <span className="label">{farmToTable.label} 🌾</span>
          <h2 className="ftable__title">{farmToTable.title}</h2>
          <p className="ftable__text">{farmToTable.content}</p>
          <a href="#food-philosophy" className="ftable__cta">{farmToTable.cta} →</a>
        </div>
        <div className="ftable__visual">
          <div className="ftable__image-frame">
            <div className="ftable__image-inner">
              <img src="/images/sanctuary.png" alt="Animal sanctuary" className="ftable__img" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
      <div className="ftable__divider"><LeafBranchSVG width={240} color="var(--sage)" /></div>

      <div className="section-wave section-wave--bottom">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,30 C480,100 960,0 1440,50 L1440,100 L0,100Z" fill="var(--cream)" />
        </svg>
      </div>
    </section>
  );
}
