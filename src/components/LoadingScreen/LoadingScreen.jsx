import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { PawPrintSVG, KittenPawSVG, HoofPrintSVG, GoatPrintSVG, DuckPrintSVG, HorsePrintSVG } from '../../assets/svg/Icons';
import './LoadingScreen.css';

// Seed set once at module load to maintain purity during render
const baseSeed = Math.floor(Math.random() * 100000);

export default function LoadingScreen({ onComplete }) {
  const [exiting, setExiting] = useState(false);

  const handleDone = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => onComplete?.(), 800);
  }, [onComplete, exiting]);

  // CRITICAL: Failsafe timeout — loading ALWAYS completes after 7 seconds max
  useEffect(() => {
    const failsafe = setTimeout(() => {
      onComplete?.();
    }, 7000);
    return () => clearTimeout(failsafe);
  }, [onComplete]);

  return (
    <div className={`loading-screen ${exiting ? 'loading-screen--exit' : ''}`}>
      <Variant2 onDone={handleDone} />
    </div>
  );
}

/* ═══ VARIANT 2: Paw Print Trail ═══ */
function Variant2({ onDone }) {
  const ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(onDone, 3800); // adjusted duration for more paws & trails
    return () => clearTimeout(timer);
  }, [onDone]);

  useGSAP(() => {
    const paws = ref.current?.querySelectorAll('.v2-paw');
    if (!paws?.length) return;

    gsap.set(paws, { opacity: 0, scale: 0 });
    gsap.set('.v2-logo', { opacity: 0, scale: 0.7, y: 20 });
    gsap.set('.v2-logo-line', { scaleX: 0 });

    const tl = gsap.timeline();
    
    // Animate each paw according to its specific delay
    paws.forEach((paw) => {
      const delay = parseFloat(paw.getAttribute('data-delay') || '0');
      tl.to(paw, { 
        opacity: 0.8, 
        scale: 1, 
        duration: 0.25, 
        ease: 'back.out(2)' 
      }, delay);
    });

    // Animate the logo container
    tl.to('.v2-logo', { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      duration: 0.7, 
      ease: 'back.out(1.5)' 
    }, 1.8);

    // Scale the horizontal lines
    tl.to('.v2-logo-line', {
      scaleX: 1,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.1
    }, 2.0);
  }, { scope: ref });

  const pawData = useMemo(() => {
    let seed = baseSeed;
    const random = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    const components = [
      { Comp: PawPrintSVG, name: 'dog', sizeRange: [18, 24] },
      { Comp: KittenPawSVG, name: 'kitten', sizeRange: [12, 16] },
      { Comp: HoofPrintSVG, name: 'cow', sizeRange: [22, 28] },
      { Comp: GoatPrintSVG, name: 'goat', sizeRange: [16, 20] },
      { Comp: DuckPrintSVG, name: 'duck', sizeRange: [18, 22] },
      { Comp: HorsePrintSVG, name: 'horse', sizeRange: [20, 26] },
    ];
    
    // We want 8 separate walking sequences (trails)
    // To ensure cows and horses are highly represented, we explicitly allocate 2 cow and 2 horse trails,
    // and choose the remaining 4 trails randomly from all components.
    const animalIndices = [
      2, // Cow
      5, // Horse
      2, // Cow
      5, // Horse
      Math.floor(random() * components.length),
      Math.floor(random() * components.length),
      Math.floor(random() * components.length),
      Math.floor(random() * components.length),
    ];
    
    // Shuffle the animal index assignments using the local PRNG
    for (let i = animalIndices.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      const temp = animalIndices[i];
      animalIndices[i] = animalIndices[j];
      animalIndices[j] = temp;
    }
    
    const trails = [
      { isAbove: true, ltr: true, delay: 0.0, animalIndex: animalIndices[0] },
      { isAbove: false, ltr: true, delay: 0.15, animalIndex: animalIndices[1] },
      { isAbove: true, ltr: false, delay: 0.35, animalIndex: animalIndices[2] },
      { isAbove: false, ltr: false, delay: 0.5, animalIndex: animalIndices[3] },
      { isAbove: true, ltr: true, delay: 0.7, animalIndex: animalIndices[4] },
      { isAbove: false, ltr: true, delay: 0.85, animalIndex: animalIndices[5] },
      { isAbove: true, ltr: false, delay: 1.05, animalIndex: animalIndices[6] },
      { isAbove: false, ltr: false, delay: 1.2, animalIndex: animalIndices[7] },
    ];
    
    const result = [];
    let globalIndex = 0;
    
    trails.forEach((trail) => {
      const animal = components[trail.animalIndex];
      // Generate 11 to 14 steps per trail
      const stepCount = 11 + Math.floor(random() * 4);
      
      // Determine centerline Y for the trail
      // Above the logo (y = 14% to 26%)
      // Below the logo (y = 74% to 86%)
      const baseVal = trail.isAbove ? (14 + random() * 12) : (74 + random() * 12);
      
      const stepStagger = 0.08 + random() * 0.04; // stagger between steps
      
      for (let s = 0; s < stepCount; s++) {
        const progress = s / (stepCount - 1);
        const baseX = trail.ltr ? (4 + 92 * progress) : (96 - 92 * progress);
        
        // Alternating side offset for left/right steps
        const sideOffset = (s % 2 === 0 ? 1 : -1) * (1.5 + random() * 1.5);
        const y = baseVal + sideOffset;
        const x = baseX + (random() - 0.5) * 1.2;
        
        // Set rotation facing the direction of travel with outward angling
        // Left foot (even steps) angles outward differently from Right foot (odd steps)
        let rotate = trail.ltr ? 90 : -90;
        const footAngleOffset = s % 2 === 0 ? -12 : 12;
        rotate += footAngleOffset + Math.floor((random() - 0.5) * 8);
        
        // Calculate size
        const size = animal.Comp === KittenPawSVG 
          ? 12 + Math.floor(random() * 4) 
          : animal.sizeRange[0] + Math.floor(random() * (animal.sizeRange[1] - animal.sizeRange[0]));
          
        const delay = trail.delay + s * stepStagger;
        
        result.push({
          id: globalIndex++,
          Comp: animal.Comp,
          size,
          x,
          y,
          rotate,
          delay
        });
      }
    });
    
    return result;
  }, []);

  return (
    <div className="loading-v2" ref={ref}>
      {pawData.map(({ Comp, size, x, y, rotate, delay, id }) => (
        <div
          key={id}
          className="v2-paw"
          data-delay={delay}
          style={{
            left: `${x}%`,
            top: `${y}%`,
            transform: `rotate(${rotate}deg)`,
          }}
        >
          <Comp size={size} color="var(--earth-brown)" />
        </div>
      ))}
      <div className="v2-logo loading-v2__logo">
        <div className="v2-logo-line v2-logo-line--top"></div>
        <span className="loading-v2__logo-text">Chef Akanksha</span>
        <span className="loading-v2__logo-sub">🌿 Plant-Based Goodness</span>
        <div className="v2-logo-line v2-logo-line--bottom"></div>
      </div>
    </div>
  );
}
