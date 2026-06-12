"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { siteContent } from '../../data/content';
import { LeafBranchSVG } from '../../assets/svg/Icons';
import PeekingAnimal from '../PeekingAnimal/PeekingAnimal';
import './Collaborate.css';

gsap.registerPlugin(ScrollTrigger);

export default function Collaborate() {
  const sectionRef = useRef(null);
  const { collaborate } = siteContent;

  useGSAP(() => {
    // Label
    gsap.fromTo('.collaborate__label',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, ease: 'none',
        scrollTrigger: { trigger: '.collaborate__header', start: 'top 88%', end: 'top 70%', scrub: true }
      }
    );

    // Title
    gsap.fromTo('.collaborate__title',
      { opacity: 0, y: 50, clipPath: 'inset(100% 0 0 0)' },
      {
        opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', ease: 'none',
        scrollTrigger: { trigger: '.collaborate__header', start: 'top 84%', end: 'top 60%', scrub: true }
      }
    );

    // Description
    gsap.fromTo('.collaborate__description',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, ease: 'none',
        scrollTrigger: { trigger: '.collaborate__description', start: 'top 90%', end: 'top 68%', scrub: true }
      }
    );

    // Branch divider
    gsap.fromTo('.collaborate__branch',
      { opacity: 0, scaleX: 0 },
      {
        opacity: 1, scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: '.collaborate__branch', start: 'top 90%', end: 'top 72%', scrub: true }
      }
    );

    // Service cards — staggered reveal
    const cards = gsap.utils.toArray('.collaborate__service');
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1, ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: `top ${92 - i * 1}%`,
            end: `top ${65 - i * 1}%`,
            scrub: true,
          }
        }
      );
    });

    // Emoji bounce on card hover (non-scroll, just CSS transition handled)
  }, { scope: sectionRef });

  // Split description by \n\n
  const descParts = collaborate.description.split('\n\n');

  return (
    <section ref={sectionRef} className="collaborate section" id="collaborate">
      <div className="grain-overlay" />

      {/* Peeking Animal mini-game */}
      <PeekingAnimal type="raccoon" position="bottom" />

      <div className="container collaborate__container">
        {/* Header */}
        <div className="collaborate__header text-center">
          <span className="collaborate__label label">
            {collaborate.label} 🤝
          </span>
          <h2 className="collaborate__title">{collaborate.title}</h2>
          <hr className="divider divider--center" />
          <div className="collaborate__description" style={{ willChange: 'transform, opacity' }}>
            {descParts.map((part, i) => (
              <p key={i}>{part}</p>
            ))}
          </div>
          <div className="collaborate__branch" style={{ willChange: 'transform, opacity' }}>
            <LeafBranchSVG width={180} color="var(--olive-green)" />
          </div>
        </div>

        {/* 3×2 Services Grid */}
        <div className="collaborate__grid">
          {collaborate.services.map((service, i) => (
            <div
              key={i}
              className="collaborate__service"
              style={{ willChange: 'transform, opacity' }}
            >
              <img src={service.Image} className="collaborate__service-emoji" />
              <h5 className="collaborate__service-title">{service.title}</h5>
              <div className="collaborate__service-line" />
            </div>
          ))}
        </div>
      </div>

      {/* Organic wave divider */}
      <div className="section-wave section-wave--bottom">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,50 C180,80 360,10 540,45 C720,80 900,20 1080,55 C1260,80 1380,30 1440,40 L1440,100 L0,100Z" fill="var(--warm-beige)" />
        </svg>
      </div>
    </section>
  );
}
