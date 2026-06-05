import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { siteContent } from '../../data/content';
import { icons } from '../../assets/svg/Icons';
import './FoodPhilosophy.css';

gsap.registerPlugin(ScrollTrigger);

export default function FoodPhilosophy() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const progressRef = useRef(null);

  useGSAP(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const cards = scrollContainer.querySelectorAll('.fp__card');
    const totalWidth = scrollContainer.scrollWidth - window.innerWidth;

    if (totalWidth <= 0) return;

    const scrollTween = gsap.to(scrollContainer, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.width = `${self.progress * 100}%`;
          }
        },
      },
    });
  }, { scope: containerRef });

  const { foodPhilosophy } = siteContent;
  const iconMap = { calendar: icons.calendar, recycle: icons.recycle, fire: icons.fire, utensils: icons.utensils, lotus: icons.lotus };

  return (
    <section ref={containerRef} className="fp" id="food-philosophy">
      <div className="fp__header-bar">
        <span className="label">{foodPhilosophy.label} 🍽️</span>
        <h2 className="fp__title">{foodPhilosophy.title}</h2>
      </div>

      <div ref={scrollRef} className="fp__scroll">
        {foodPhilosophy.items.map((item, i) => (
          <div key={i} className={`fp__card ${i % 2 === 0 ? 'fp__card--cream' : 'fp__card--beige'}`}>
            <div className="fp__card-number">0{i + 1}</div>
            <div className="fp__card-icon">{iconMap[item.icon]?.(36)}</div>
            <h3 className="fp__card-title">{item.title}</h3>
            <p className="fp__card-desc">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="fp__progress">
        <div className="fp__progress-track">
          <div ref={progressRef} className="fp__progress-fill" />
        </div>
        <span className="fp__progress-text">Scroll →</span>
      </div>
    </section>
  );
}
