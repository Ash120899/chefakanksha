"use client";

import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import './FootprintTrail.css';

// SVG design matching the custom cursor paw shape perfectly
const PAW_SVG = (size, color, opacity = 0.55) => `
  <svg width="${size}" height="${size}" viewBox="0 0 64 64" fill="${color}" style="opacity: ${opacity}; filter: drop-shadow(0px 1.5px 2.5px rgba(0, 0, 0, 0.2)); display: block;">
    <ellipse cx="22" cy="16" rx="5" ry="6.5" />
    <ellipse cx="42" cy="16" rx="5" ry="6.5" />
    <ellipse cx="14" cy="28" rx="4" ry="6" />
    <ellipse cx="50" cy="28" rx="4.5" ry="6" />
    <path d="M32 28c-6 0-12 4.5-13.5 10.5-1.5 6 1.5 10.5 7.5 12 3 .75 4.5-1.5 6-1.5s3 2.25 6 1.5c6-1.5 9-6 7.5-12C44 32.5 38 28 32 28z" />
  </svg>
`;

export default function FootprintTrail() {
  const containerRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const lastScrollY = useRef(0);
  const lastSpawnTime = useRef(0);
  const footSide = useRef('left');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Set initial mouse position
    mousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    lastScrollY.current = window.scrollY;

    // ONLY track mouse coordinates on movement, do NOT spawn footprints here
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // Spawn footprints exclusively when scrolling
    const handleScroll = (scrollY) => {
      const currentScrollY = typeof scrollY === 'number' ? scrollY : window.scrollY;
      const dy = currentScrollY - lastScrollY.current;

      // Filter out micro-scroll events or static cursor updates
      if (Math.abs(dy) < 2) {
        return;
      }

      const now = Date.now();
      // Throttle spawning to once every 120ms so they appear continuously during scroll
      if (now - lastSpawnTime.current > 120) {
        lastSpawnTime.current = now;
        lastScrollY.current = currentScrollY; // Only update baseline scroll when spawning

        const side = footSide.current;
        footSide.current = side === 'left' ? 'right' : 'left';

        // Stagger left/right very slightly horizontally to form a single line (human-like walk)
        const horizontalOffset = side === 'left' ? -3 : 3;

        // Spawn ABOVE the cursor vertically (fixed distance above the mouse pointer, absolute to page)
        const px = mousePos.current.x + horizontalOffset;
        const py = mousePos.current.y + currentScrollY - 70; // 70px above the cursor on the page

        // Always point straight UPWARDS with a slight angle wiggle
        const rotate = side === 'left' ? -5 : 5;
        const size = 25; // Decent visible paw print size

        // Directly construct DOM footprint step using absolute coordinates (scrolls with the page)
        const stepEl = document.createElement('div');
        stepEl.className = 'footprint-step';
        stepEl.style.position = 'absolute';
        stepEl.style.left = `${px}px`;
        stepEl.style.top = `${py}px`;
        stepEl.style.width = `${size}px`;
        stepEl.style.height = `${size}px`;
        stepEl.style.transform = `translate(-50%, -50%) rotate(${rotate}deg)`;
        stepEl.style.pointerEvents = 'none';
        stepEl.style.zIndex = '99998'; // Render just under the custom cursor

        const innerEl = document.createElement('div');
        innerEl.className = 'footprint-inner';
        innerEl.innerHTML = PAW_SVG(size, '#6B7F5E', 0.55);

        stepEl.appendChild(innerEl);

        const container = containerRef.current || document.querySelector('.footprint-trail-container');
        if (container) {
          container.appendChild(stepEl);
        }

        // Auto remove element after CSS fade animation finishes
        const removeTimer = setTimeout(() => {
          stepEl.remove();
        }, 1800);

        stepEl.addEventListener('animationend', () => {
          clearTimeout(removeTimer);
          stepEl.remove();
        });
      }
    };

    // Global Lenis trigger binder
    window.spawnFootprints = (scrollY) => {
      handleScroll(scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Listen directly to native scrolls for native scroll gestures
    const nativeScroll = () => handleScroll(window.scrollY);
    window.addEventListener('scroll', nativeScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', nativeScroll);
      window.spawnFootprints = null;
    };
  }, [mounted]);

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <div ref={containerRef} className="footprint-trail-container" />,
    document.body
  );
}
