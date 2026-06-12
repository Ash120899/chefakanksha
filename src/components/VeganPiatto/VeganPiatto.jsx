"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { siteContent } from '../../data/content';
import { icons, LeafSVG } from '../../assets/svg/Icons';
import PeekingAnimal from '../PeekingAnimal/PeekingAnimal';
import './VeganPiatto.css';

gsap.registerPlugin(ScrollTrigger);

export default function VeganPiatto() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // --- Label reveal ---
    gsap.fromTo('.vp__label',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, ease: 'none',
        scrollTrigger: { trigger: '.vp__header', start: 'top 85%', end: 'top 70%', scrub: true },
      }
    );

    // --- Big title reveal ---
    gsap.fromTo('.vp__title',
      { opacity: 0, y: 80, scale: 0.92 },
      {
        opacity: 1, y: 0, scale: 1, ease: 'none',
        scrollTrigger: { trigger: '.vp__header', start: 'top 80%', end: 'top 50%', scrub: true },
      }
    );

    // --- Decorative image reveal ---
    gsap.fromTo('.vp__image-wrapper',
      { opacity: 0, scale: 0.85, clipPath: 'circle(0% at 50% 50%)' },
      {
        opacity: 1, scale: 1, clipPath: 'circle(50% at 50% 50%)', ease: 'none',
        scrollTrigger: { trigger: '.vp__image-wrapper', start: 'top 85%', end: 'top 45%', scrub: true },
      }
    );

    // --- Image parallax ---
    gsap.fromTo('.vp__image-wrapper',
      { y: 0 },
      {
        y: -40, ease: 'none',
        scrollTrigger: { trigger: '.vp__body', start: 'top bottom', end: 'bottom top', scrub: true },
      }
    );

    // --- Paragraphs reveal one by one ---
    const paragraphs = gsap.utils.toArray('.vp__paragraph');
    paragraphs.forEach((para, i) => {
      gsap.fromTo(para,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, ease: 'none',
          scrollTrigger: {
            trigger: para,
            start: 'top 88%',
            end: 'top 65%',
            scrub: true,
          },
        }
      );
    });

    // --- Highlight quote reveal ---
    gsap.fromTo('.vp__highlight',
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1, ease: 'none',
        scrollTrigger: { trigger: '.vp__highlight', start: 'top 88%', end: 'top 62%', scrub: true },
      }
    );

    // --- Highlight accent line ---
    gsap.fromTo('.vp__highlight-line',
      { scaleY: 0 },
      {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: '.vp__highlight', start: 'top 85%', end: 'top 60%', scrub: true },
      }
    );

    // --- Offers grid cards ---
    const offerCards = gsap.utils.toArray('.vp__offer-card');
    offerCards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1, ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 68%',
            scrub: true,
          },
        }
      );
    });

    // --- Offers heading ---
    gsap.fromTo('.vp__offers-heading',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, ease: 'none',
        scrollTrigger: { trigger: '.vp__offers-heading', start: 'top 88%', end: 'top 70%', scrub: true },
      }
    );

  }, { scope: sectionRef });

  const { veganPiatto } = siteContent;

  return (
    <section ref={sectionRef} className="vp section" id="vegan-piatto">
      <div className="grain-overlay" />

      {/* Peeking Animal mini-game */}
      <PeekingAnimal type="cow" position="bottom" />

      {/* Decorative leaves */}
      <div className="vp__leaf vp__leaf--1">
        <LeafSVG size={50} color="var(--sage)" />
      </div>
      <div className="vp__leaf vp__leaf--2">
        <LeafSVG size={34} color="var(--sage)" />
      </div>

      <div className="container">
        {/* Header */}
        <div className="vp__header text-center">
          <span className="vp__label label">{veganPiatto.label} 🌱</span>
          <h2 className="vp__title">{veganPiatto.title}</h2>
        </div>

        {/* Body: paragraphs + image */}
        <div className="vp__body">
          <div className="vp__content">
            {veganPiatto.paragraphs.map((para, i) => (
              <p key={i} className="vp__paragraph" style={{ willChange: 'transform' }}>
                {para}
              </p>
            ))}
          </div>

          <div className="vp__image-side" style={{ position: 'relative' }}>
            <div className="vp__image-wrapper" style={{ willChange: 'transform' }}>
              <img
                src="/images/pasta-shot.png"
                alt="Vegan Piatto dish"
                className="vp__image"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Highlight quote */}
        <div className="vp__highlight" style={{ willChange: 'transform' }}>
          <div className="vp__highlight-line" />
          <blockquote className="vp__highlight-text handwritten">
            "{veganPiatto.highlight}"
          </blockquote>
        </div>

        {/* Offers grid */}
        <div className="vp__offers">
          <h3 className="vp__offers-heading text-center" style={{ willChange: 'transform' }}>
            What Vegan Piatto Offers
          </h3>
          <div className="vp__offers-grid">
            {veganPiatto.offers.map((offer, i) => (
              <div key={i} className="vp__offer-card" style={{ willChange: 'transform' }}>

                <img
                  src={offer.image}
                  alt={offer.title}
                  className="vp__offer-image"
                  loading="lazy"
                />
                <span className="vp__offer-text">{offer.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Organic wave at bottom */}
      <div className="section-wave section-wave--bottom">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,50 C320,100 640,0 960,50 C1120,75 1320,25 1440,40 L1440,100 L0,100Z" fill="var(--warm-beige)" />
        </svg>
      </div>
    </section>
  );
}
