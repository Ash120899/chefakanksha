"use client";

import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Don't show custom cursor on touch devices
    if ('ontouchstart' in window) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Detect hoverable elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.btn') ||
        target.closest('.card') ||
        target.closest('[data-cursor="pointer"]')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.btn') ||
        target.closest('.card') ||
        target.closest('[data-cursor="pointer"]')
      ) {
        setIsHovering(false);
      }
    };

    // Smooth cursor animation loop
    let rafId;
    const animate = () => {
      const { x: tx, y: ty } = targetRef.current;
      const { x: cx, y: cy } = posRef.current;

      // Lerp for smooth following
      posRef.current = {
        x: cx + (tx - cx) * 0.15,
        y: cy + (ty - cy) * 0.15,
      };

      if (cursor) {
        cursor.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    rafId = requestAnimationFrame(animate);

    // Add cursor-none to body
    document.body.classList.add('has-custom-cursor');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(rafId);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor-wrapper ${isHovering ? 'custom-cursor-wrapper--hover' : ''} ${isClicking ? 'custom-cursor-wrapper--click' : ''}`}
    >
      {/* Inner dot - paw shape */}
      <svg className="custom-cursor__paw" width="20" height="20" viewBox="0 0 64 64" fill="var(--olive-green)">
        <ellipse cx="22" cy="16" rx="5" ry="6.5" opacity="0.9" />
        <ellipse cx="42" cy="16" rx="5" ry="6.5" opacity="0.9" />
        <ellipse cx="14" cy="28" rx="4.5" ry="6" opacity="0.9" />
        <ellipse cx="50" cy="28" rx="4.5" ry="6" opacity="0.9" />
        <path d="M32 28c-6 0-12 4.5-13.5 10.5-1.5 6 1.5 10.5 7.5 12 3 .75 4.5-1.5 6-1.5s3 2.25 6 1.5c6-1.5 9-6 7.5-12C44 32.5 38 28 32 28z" opacity="0.9" />
      </svg>
    </div>
  );
}
