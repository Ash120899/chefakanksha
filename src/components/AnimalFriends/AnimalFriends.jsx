import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'motion/react';
import { siteContent } from '../../data/content';
import { PawPrintSVG, HeartSVG } from '../../assets/svg/Icons';
import './AnimalFriends.css';

gsap.registerPlugin(ScrollTrigger);

export default function AnimalFriends() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.af__header > *',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
    );
    // Stagger cards on scroll
    gsap.utils.toArray('.af__card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: i * 0.1, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: card, start: 'top 85%' }
        }
      );
    });
  }, { scope: sectionRef });

  const { animalFriends } = siteContent;

  return (
    <section ref={sectionRef} className="af section" id="animal-friends">
      <div className="container">
        <div className="af__header text-center">
          <span className="label">{animalFriends.label} 🐾</span>
          <h2>{animalFriends.title}</h2>
          <p className="af__subtitle">{animalFriends.subtitle}</p>
        </div>
        <div className="af__grid">
          {animalFriends.animals.map((animal, i) => (
            <AnimalCard key={i} animal={animal} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimalCard({ animal, index }) {
  const cardRef = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -15, y: x * 15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setFlipped(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="af__card"
      style={{ background: animal.color, perspective: '800px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setFlipped(!flipped)}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(92,74,50,0.15)' }}
    >
      <div className={`af__card-inner ${flipped ? 'af__card-inner--flipped' : ''}`}>
        <div className="af__card-front">
          <span className="af__card-emoji">{animal.emoji}</span>
          <h4 className="af__card-name">{animal.name}</h4>
          <p className="af__card-desc">{animal.description}</p>
          <span className="af__card-hint">Tap for fun fact 💡</span>
        </div>
        <div className="af__card-back">
          <HeartSVG size={24} color="var(--soft-pink)" filled />
          <p className="af__card-fact">{animal.fact}</p>
          <PawPrintSVG size={20} color="var(--tan)" />
        </div>
      </div>
    </motion.div>
  );
}
