import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { siteContent } from '../../data/content';
import { icons, LeafSVG } from '../../assets/svg/Icons';
import './ImpactCounter.css';

gsap.registerPlugin(ScrollTrigger);

export default function ImpactCounter() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.ic__header > *',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
    );
    gsap.utils.toArray('.ic__counter').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: i * 0.1, ease: 'back.out(1.3)',
          scrollTrigger: { trigger: el, start: 'top 85%' }
        }
      );
    });
  }, { scope: sectionRef });

  const { impact } = siteContent;
  const iconMap = { plate: icons.plate, heart: icons.heart, cloud: icons.cloud, droplet: icons.droplet };

  return (
    <section ref={sectionRef} className="ic section" id="impact">
      <div className="container">
        <div className="ic__header text-center">
          <span className="label" style={{ color: 'var(--cream)' }}>{impact.label} 🌍</span>
          <h2 style={{ color: 'var(--cream)' }}>{impact.title}</h2>
        </div>
        <div className="ic__grid">
          {impact.counters.map((counter, i) => (
            <div key={i} className="ic__counter">
              <div className="ic__counter-icon">{iconMap[counter.icon]?.(28)}</div>
              <ImpactCount target={counter.target} suffix={counter.suffix} />
              <span className="ic__counter-label">{counter.label}</span>
            </div>
          ))}
        </div>
      </div>
      {[...Array(6)].map((_, i) => (
        <div key={i} className="ic__leaf" style={{ left: `${10 + i * 16}%`, animationDelay: `${i * 0.5}s`, top: `${20 + Math.sin(i) * 30}%` }}>
          <LeafSVG size={20 + i * 4} color="rgba(255,255,255,0.08)" />
        </div>
      ))}
    </section>
  );
}

function ImpactCount({ target, suffix }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        const duration = 2500;
        const startTime = performance.now();
        const animate = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          setCount(Math.floor(target * eased));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, hasAnimated]);

  return (
    <span ref={ref} className="ic__counter-number">
      {count.toLocaleString()}{suffix && <span className="ic__counter-suffix">{suffix}</span>}
    </span>
  );
}
