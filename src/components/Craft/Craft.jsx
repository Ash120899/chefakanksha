"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'motion/react';
import { siteContent } from '../../data/content';
import { LeafSVG } from '../../assets/svg/Icons';
import PeekingAnimal from '../PeekingAnimal/PeekingAnimal';
import './Craft.css';

gsap.registerPlugin(ScrollTrigger);

export default function Craft() {
  const sectionRef = useRef(null);
  const { craft } = siteContent;
  const descriptionParagraphs = craft.description.split('\n\n');

  useGSAP(() => {
    // Header reveal
    gsap.fromTo(
      '.craft__label',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.craft__header',
          start: 'top 85%',
          end: 'top 55%',
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      '.craft__title',
      { opacity: 0, y: 50, clipPath: 'inset(100% 0 0 0)' },
      {
        opacity: 1,
        y: 0,
        clipPath: 'inset(0% 0 0 0)',
        duration: 1,
        scrollTrigger: {
          trigger: '.craft__header',
          start: 'top 82%',
          end: 'top 50%',
          scrub: true,
        },
      }
    );

    // Description paragraphs
    gsap.fromTo(
      '.craft__description p',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1,
        scrollTrigger: {
          trigger: '.craft__description',
          start: 'top 85%',
          end: 'top 55%',
          scrub: true,
        },
      }
    );

    // Background accent image
    gsap.fromTo(
      '.craft__bg-accent',
      { opacity: 0, scale: 1.15 },
      {
        opacity: 0.12,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: '.craft__body',
          start: 'top 80%',
          end: 'top 40%',
          scrub: true,
        },
      }
    );

    // Speciality cards stagger reveal
    gsap.fromTo(
      '.craft__speciality-card',
      { opacity: 0, y: 60, scale: 0.85 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.1,
        duration: 1,
        scrollTrigger: {
          trigger: '.craft__grid',
          start: 'top 85%',
          end: 'top 45%',
          scrub: true,
        },
      }
    );

    // Quote block reveal
    gsap.fromTo(
      '.craft__quote',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.craft__quote',
          start: 'top 90%',
          end: 'top 65%',
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      '.craft__quote-highlight',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.craft__quote-highlight',
          start: 'top 92%',
          end: 'top 70%',
          scrub: true,
        },
      }
    );

    // Parallax on background accent
    gsap.fromTo(
      '.craft__bg-accent',
      { y: -40 },
      {
        y: 40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="craft" id="craft">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Peeking Animal mini-game */}
      <PeekingAnimal type="fox" position="right" />

      {/* Background accent image */}
      <div className="craft__bg-accent" style={{ willChange: 'transform' }}>
        <img
          src="/images/hand-rolled-pasta.jpg"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
      </div>

      <div className="container">
        {/* Header */}
        <div className="craft__header">
          <span className="craft__label label">
            <LeafSVG size={14} color="var(--olive-green)" /> {craft.label}
          </span>
          <h2 className="craft__title section-title">{craft.title}</h2>
        </div>

        {/* Body — split layout */}
        <div className="craft__body">
          {/* Left: description text */}
          <div className="craft__text">
            <div className="craft__description">
              {descriptionParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Right: specialities 2x3 grid */}
          <div className="craft__grid">
            {craft.specialities.map((item, i) => (
              <motion.div
                key={i}
                className="craft__speciality-card"
                whileHover={{ y: -8, scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{ willChange: 'transform', position: 'relative' }}
              >
                <img src={item.Image} alt={item.title} className="craft__speciality-image" />
                <span className="craft__speciality-title">{item.title}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Full-width quote */}
        <div className="craft__quote-block">
          <blockquote className="craft__quote">
            <p>{craft.quote}</p>
            <p className="craft__quote-highlight handwritten">
              {craft.quoteHighlight}
            </p>
          </blockquote>
        </div>
      </div>

      {/* Organic bottom wave */}
      <div className="craft__wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,80 C180,20 360,100 540,60 C720,20 900,100 1080,60 C1260,20 1380,80 1440,50 L1440,120 L0,120Z"
            fill="var(--cream)"
          />
        </svg>
      </div>
    </section>
  );
}
