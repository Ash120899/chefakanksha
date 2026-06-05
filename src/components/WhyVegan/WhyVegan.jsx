import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { siteContent } from '../../data/content';
import { icons } from '../../assets/svg/Icons';
import './WhyVegan.css';

gsap.registerPlugin(ScrollTrigger);

export default function WhyVegan() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.wv__header > *',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
    );
    gsap.utils.toArray('.wv__card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%' }
        }
      );
    });
  }, { scope: sectionRef });

  const { whyVegan } = siteContent;

  return (
    <section ref={sectionRef} className="wv section section--dark" id="why-vegan">
      <div className="container">
        <div className="wv__header text-center">
          <span className="label" style={{ color: 'var(--sage)' }}>{whyVegan.label} 💚</span>
          <h2>{whyVegan.title}</h2>
        </div>
        <div className="wv__grid">
          {whyVegan.reasons.map((reason, i) => (
            <div key={i} className="wv__card">
              <div className="wv__card-icon">{icons[reason.icon](28)}</div>
              <h4 className="wv__card-title">{reason.title}</h4>
              <p className="wv__card-desc">{reason.description}</p>
              <div className="wv__card-stat">
                <CountUp target={reason.stat} />
                <span className="wv__card-stat-label">{reason.statLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountUp({ target }) {
  const [count, setCount] = useState(target);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        const numericTarget = parseInt(target.replace(/[^0-9]/g, ''));
        const suffix = target.replace(/[0-9]/g, '');
        const duration = 2000;
        const startTime = performance.now();
        const animate = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          setCount(Math.floor(numericTarget * eased) + suffix);
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, hasAnimated]);

  return <span ref={ref} className="wv__card-stat-number">{count}</span>;
}
