import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { siteContent } from '../../data/content';
import { LeafSVG } from '../../assets/svg/Icons';
import './Milestones.css';

gsap.registerPlugin(ScrollTrigger);

const typeBadgeColors = {
  training: { bg: 'rgba(122, 158, 109, 0.25)', text: 'var(--leaf-green)', border: 'rgba(122, 158, 109, 0.4)' },
  event: { bg: 'rgba(232, 196, 184, 0.3)', text: 'var(--soft-pink)', border: 'rgba(232, 196, 184, 0.5)' },
  venture: { bg: 'rgba(212, 175, 55, 0.2)', text: '#D4AF37', border: 'rgba(212, 175, 55, 0.4)' },
};

export default function Milestones() {
  const sectionRef = useRef(null);
  const timelineLineRef = useRef(null);

  useGSAP(() => {
    // --- Draw the vertical timeline line via stroke-dashoffset ---
    const line = timelineLineRef.current;
    if (line) {
      const length = line.getTotalLength();
      gsap.fromTo(line,
        { strokeDasharray: length, strokeDashoffset: length },
        {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.milestones__timeline',
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: true,
          },
        }
      );
    }

    // --- Section header reveal ---
    gsap.fromTo('.milestones__label',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, ease: 'none',
        scrollTrigger: { trigger: '.milestones__header', start: 'top 85%', end: 'top 65%', scrub: true },
      }
    );

    gsap.fromTo('.milestones__title',
      { opacity: 0, y: 50, clipPath: 'inset(100% 0 0 0)' },
      {
        opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', ease: 'none',
        scrollTrigger: { trigger: '.milestones__header', start: 'top 80%', end: 'top 55%', scrub: true },
      }
    );

    // --- Each milestone card reveals ---
    const cards = gsap.utils.toArray('.milestones__card');
    cards.forEach((card, i) => {
      const isLeft = i % 2 === 0;
      gsap.fromTo(card,
        { opacity: 0, x: isLeft ? -80 : 80, scale: 0.9 },
        {
          opacity: 1, x: 0, scale: 1, ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );
    });

    // --- Timeline dot pulses ---
    const dots = gsap.utils.toArray('.milestones__dot');
    dots.forEach((dot) => {
      gsap.fromTo(dot,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, ease: 'none',
          scrollTrigger: {
            trigger: dot,
            start: 'top 80%',
            end: 'top 65%',
            scrub: true,
          },
        }
      );
    });

  }, { scope: sectionRef });

  const { milestones } = siteContent;

  return (
    <section ref={sectionRef} className="milestones section section--dark" id="milestones">
      <div className="grain-overlay" />

      {/* Decorative floating leaves */}
      <div className="milestones__deco milestones__deco--1">
        <LeafSVG size={40} color="rgba(163, 184, 153, 0.12)" />
      </div>
      <div className="milestones__deco milestones__deco--2">
        <LeafSVG size={28} color="rgba(163, 184, 153, 0.08)" />
      </div>

      <div className="container">
        {/* Header */}
        <div className="milestones__header text-center">
          <span className="milestones__label label">{milestones.label} ✦</span>
          <h2 className="milestones__title">{milestones.title}</h2>
        </div>

        {/* Timeline */}
        <div className="milestones__timeline">
          {/* SVG vertical line */}
          <div className="milestones__line-container">
            <svg className="milestones__line-svg" viewBox="0 0 4 600" preserveAspectRatio="none">
              <line
                ref={timelineLineRef}
                x1="2" y1="0" x2="2" y2="600"
                stroke="var(--sage)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {milestones.items.map((item, index) => {
            const isLeft = index % 2 === 0;
            const badge = typeBadgeColors[item.type] || typeBadgeColors.training;

            return (
              <div
                key={index}
                className={`milestones__item milestones__item--${isLeft ? 'left' : 'right'}`}
              >
                {/* Timeline dot */}
                <div className="milestones__dot" style={{ willChange: 'transform' }}>
                  <div className="milestones__dot-inner" />
                  <div className="milestones__dot-ring" />
                </div>

                {/* Card */}
                <div className="milestones__card" style={{ willChange: 'transform' }}>
                  <div className="milestones__card-glow" />
                  <span
                    className="milestones__badge"
                    style={{
                      background: badge.bg,
                      color: badge.text,
                      borderColor: badge.border,
                    }}
                  >
                    {item.type}
                  </span>
                  <span className="milestones__org">{item.org}</span>
                  <h3 className="milestones__card-title">{item.title}</h3>
                  <p className="milestones__card-desc">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Organic wave at bottom */}
      <div className="section-wave section-wave--bottom">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,20 1440,70 L1440,120 L0,120Z" fill="var(--cream)" />
        </svg>
      </div>
    </section>
  );
}
