"use client";

// ========================================
// JOURNEY SECTION — Chef Akanksha
// ========================================
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { siteContent } from '../../data/content';
import { PawPrintSVG, KittenPawSVG } from '../../assets/svg/Icons';
import PeekingAnimal from '../PeekingAnimal/PeekingAnimal';
import './Journey.css';

gsap.registerPlugin(ScrollTrigger);

const Journey = () => {
  const sectionRef = useRef(null);
  const { journey } = siteContent;

  // Paragraphs that should get emphasis styling
  const emphasisTexts = [
    'They became my speciality.',
    'And that challenge became my craft.',
  ];

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    // --- Header entrance (scrub-tied) ---
    gsap.fromTo(
      section.querySelector('.journey__label'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section.querySelector('.journey__header'),
          start: 'top 90%',
          end: 'top 60%',
          scrub: true,
        },
      }
    );

    const titleLines = section.querySelectorAll('.journey__title-line');
    titleLines.forEach((line, i) => {
      gsap.fromTo(
        line,
        { opacity: 0, x: i === 0 ? -40 : 40 },
        {
          opacity: 1,
          x: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section.querySelector('.journey__header'),
            start: 'top 85%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );
    });

    // --- Paragraph reveals (each tied to its own scroll position) ---
    const paragraphs = section.querySelectorAll('.journey__paragraph');
    paragraphs.forEach((para) => {
      gsap.fromTo(
        para,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: para,
            start: 'top 88%',
            end: 'top 60%',
            scrub: true,
          },
        }
      );
    });

    // --- Highlight quote reveal ---
    const quoteEl = section.querySelector('.journey__quote');
    if (quoteEl) {
      gsap.fromTo(
        quoteEl,
        { opacity: 0, scale: 0.92, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: quoteEl,
            start: 'top 90%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );
    }

    // --- Sanctuary image reveal ---
    const imageEl = section.querySelector('.journey__image-wrapper');
    if (imageEl) {
      gsap.fromTo(
        imageEl,
        { opacity: 0, y: 50, clipPath: 'inset(10% 10% 10% 10%)' },
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: {
            trigger: imageEl,
            start: 'top 90%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );

      // Subtle scroll-tied parallax drift on the image
      gsap.fromTo(
        imageEl,
        { y: 0 },
        {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: imageEl,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }

    // --- Paw print decorations fade in ---
    const paws = section.querySelectorAll('.journey__paw');
    paws.forEach((paw) => {
      gsap.fromTo(
        paw,
        { opacity: 0, scale: 0.5, rotation: -15 },
        {
          opacity: parseFloat(paw.dataset.targetOpacity || 0.15),
          scale: 1,
          rotation: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: paw,
            start: 'top 95%',
            end: 'top 70%',
            scrub: true,
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section className="journey section" id="journey" ref={sectionRef}>
      <div className="grain-overlay" />

      {/* Peeking Animal mini-game */}
      <PeekingAnimal type="bunny" position="bottom" />
      <div className="journey__paw journey__paw--1" data-target-opacity="0.12">
        <PawPrintSVG size={50} color="var(--soft-pink)" />
      </div>
      <div className="journey__paw journey__paw--2" data-target-opacity="0.08">
        <KittenPawSVG size={30} color="var(--tan)" />
      </div>
      <div className="journey__paw journey__paw--3" data-target-opacity="0.1">
        <PawPrintSVG size={36} color="var(--sage)" />
      </div>
      <div className="journey__paw journey__paw--4" data-target-opacity="0.07">
        <KittenPawSVG size={24} color="var(--soft-pink)" />
      </div>

      <div className="container journey__container">
        {/* Header */}
        <div className="journey__header">
          <span className="journey__label label">{journey.label}</span>
          <h2 className="journey__title">
            <span className="journey__title-line" style={{ willChange: 'transform, opacity' }}>
              {journey.title}
            </span>
            <span className="journey__title-line journey__title-line--accent" style={{ willChange: 'transform, opacity' }}>
              {journey.titleLine2}
            </span>
          </h2>
        </div>

        {/* Main body: text + image side-by-side */}
        <div className="journey__body">
          <div className="journey__text">
            {journey.paragraphs.map((para, i) => {
              const isHighlight = para === journey.highlight;
              const isEmphasis = emphasisTexts.includes(para);

              if (isHighlight) {
                return (
                  <div key={i} className="journey__quote-wrapper">
                    {/* Barking Dog GIF placed above the quote box */}
                    <div className="journey__dog-wrapper">
                      <img
                        src="/images/dogs-barking.gif"
                        alt="Dogs Barking"
                        className="journey__dog-gif"
                      />
                    </div>
                    <blockquote
                      className="journey__quote journey__paragraph"
                      style={{ willChange: 'transform, opacity' }}
                    >
                      <p className="journey__quote-text">{para}</p>
                    </blockquote>
                  </div>
                );
              }

              return (
                <p
                  key={i}
                  className={`journey__paragraph ${isEmphasis ? 'journey__paragraph--emphasis' : ''}`}
                  style={{ willChange: 'transform, opacity' }}
                >
                  {para}
                </p>
              );
            })}
          </div>

          {/* Side image */}
          <div className="journey__aside" style={{ position: 'relative' }}>
            <div className="journey__image-wrapper" style={{ willChange: 'transform, opacity, clip-path' }}>
              <img
                src="/images/sec-image.png"
                alt="A moment of connection — the values behind the craft"
                className="journey__image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Organic SVG wave divider */}
      <div className="journey__wave-divider">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C240,100 480,0 720,50 C960,100 1200,10 1440,40 L1440,100 L0,100 Z"
            fill="var(--warm-beige)"
          />
          <path
            d="M0,60 C300,90 600,20 900,60 C1100,85 1300,45 1440,60 L1440,100 L0,100 Z"
            fill="var(--warm-beige)"
            opacity="0.6"
          />
        </svg>
      </div>
    </section>
  );
};

export default Journey;
