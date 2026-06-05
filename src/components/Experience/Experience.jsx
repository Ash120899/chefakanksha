import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'motion/react';
import { siteContent } from '../../data/content';
import { icons, LeafSVG } from '../../assets/svg/Icons';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const { experience } = siteContent;
  const descriptionParagraphs = experience.description.split('\n\n');

  useGSAP(() => {
    // Header label
    gsap.fromTo(
      '.experience__label',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.experience__header',
          start: 'top 85%',
          end: 'top 60%',
          scrub: true,
        },
      }
    );

    // Header title
    gsap.fromTo(
      '.experience__title',
      { opacity: 0, y: 50, clipPath: 'inset(100% 0 0 0)' },
      {
        opacity: 1,
        y: 0,
        clipPath: 'inset(0% 0 0 0)',
        duration: 1,
        scrollTrigger: {
          trigger: '.experience__header',
          start: 'top 82%',
          end: 'top 55%',
          scrub: true,
        },
      }
    );

    // Description paragraphs
    gsap.fromTo(
      '.experience__description p',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1,
        scrollTrigger: {
          trigger: '.experience__description',
          start: 'top 88%',
          end: 'top 65%',
          scrub: true,
        },
      }
    );

    // Cards stagger reveal
    gsap.fromTo(
      '.experience__card',
      { opacity: 0, y: 80, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.12,
        duration: 1,
        scrollTrigger: {
          trigger: '.experience__grid',
          start: 'top 88%',
          end: 'top 45%',
          scrub: true,
        },
      }
    );

    // Card icon circles subtle rotation parallax
    gsap.fromTo(
      '.experience__card-icon',
      { rotation: -10 },
      {
        rotation: 0,
        stagger: 0.05,
        scrollTrigger: {
          trigger: '.experience__grid',
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="experience" id="experience">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      <div className="container">
        {/* Centered header */}
        <div className="experience__header">
          <span className="experience__label label">
            <LeafSVG size={14} color="var(--olive-green)" /> {experience.label}
          </span>
          <h2 className="experience__title section-title">{experience.title}</h2>
          <div className="experience__description">
            {descriptionParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {/* 2×2 card grid */}
        <div className="experience__grid">
          {experience.cards.map((card, i) => (
            <motion.div
              key={i}
              className="experience__card"
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              style={{ willChange: 'transform' }}
            >
              {/* Colored top accent bar */}
              <div
                className="experience__card-accent"
                style={{ backgroundColor: card.color }}
              />

              {/* Icon circle */}
              <motion.div
                className="experience__card-icon"
                style={{ backgroundColor: card.color }}
                whileHover={{ scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <img src={card.Image} alt="" />
              </motion.div>

              {/* Content */}
              <h3 className="experience__card-title">{card.title}</h3>
              <p className="experience__card-desc">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Organic bottom wave */}
      <div className="experience__wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,40 C360,110 720,10 1080,70 C1260,100 1380,30 1440,60 L1440,120 L0,120Z"
            fill="var(--warm-beige)"
          />
        </svg>
      </div>
    </section>
  );
}
