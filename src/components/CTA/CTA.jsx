import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'motion/react';
import { siteContent } from '../../data/content';
import { PawPrintSVG, LeafSVG, HeartSVG } from '../../assets/svg/Icons';
import './CTA.css';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.cta__content > *',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
    );
  }, { scope: sectionRef });

  const { cta } = siteContent;

  return (
    <section ref={sectionRef} className="cta section" id="cta">
      <div className="container cta__content text-center">
        <h2 className="cta__title">{cta.title}</h2>
        <p className="cta__subtitle">{cta.subtitle}</p>
        <div className="cta__buttons">
          <motion.a href="#contact" className="btn btn--primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            {cta.primaryCta} 🌿
          </motion.a>
          <motion.a href="#food-philosophy" className="btn btn--outline" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            {cta.secondaryCta}
          </motion.a>
        </div>
      </div>
      {[...Array(10)].map((_, i) => (
        <div key={i} className="cta__float" style={{ left: `${Math.random() * 90}%`, top: `${Math.random() * 80}%`, animationDelay: `${i * 0.7}s`, animationDuration: `${4 + Math.random() * 4}s` }}>
          {i % 3 === 0 ? <PawPrintSVG size={14} color="var(--tan)" /> : i % 3 === 1 ? <LeafSVG size={16} color="var(--sage)" /> : <HeartSVG size={12} color="var(--soft-pink)" />}
        </div>
      ))}
    </section>
  );
}
