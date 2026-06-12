"use client";

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { siteContent } from '../../data/content';
import { StarSVG, PawPrintSVG } from '../../assets/svg/Icons';
import PeekingAnimal from '../PeekingAnimal/PeekingAnimal';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { testimonials } = siteContent;

  useGSAP(() => {
    gsap.fromTo('.test__header > *',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
    );
  }, { scope: sectionRef });

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.reviews.length, isPaused]);

  return (
    <section ref={sectionRef} className="test section section--alt" id="testimonials"
      onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>

      {/* Peeking Animal mini-game */}
      <PeekingAnimal type="bird" position="top" />

      <div className="container">
        <div className="test__header text-center">
          <span className="label">{testimonials.label} 🐾💚</span>
          <h2>{testimonials.title}</h2>
        </div>
        <div className="test__carousel">
          <div className="test__track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {testimonials.reviews.map((review, i) => (
              <div key={i} className="test__slide">
                <div className="test__card card">
                  <div className="test__stars">
                    {[...Array(review.rating)].map((_, j) => <StarSVG key={j} size={18} />)}
                  </div>
                  <p className="test__quote">"{review.text}"</p>
                  <div className="test__author">
                    <div className="test__avatar">{review.avatar}</div>
                    <div>
                      <strong className="test__name">{review.author}</strong>
                      <span className="test__role">{review.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="test__nav">
            <button className="test__arrow" onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.reviews.length) % testimonials.reviews.length)}>←</button>
            <div className="test__dots">
              {testimonials.reviews.map((_, i) => (
                <button key={i} className={`test__dot ${i === activeIndex ? 'test__dot--active' : ''}`} onClick={() => setActiveIndex(i)} />
              ))}
            </div>
            <button className="test__arrow" onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.reviews.length)}>→</button>
          </div>
        </div>
      </div>
      {[...Array(8)].map((_, i) => (
        <PawPrintSVG key={i} size={16 + i * 3} color="var(--tan)" style={{ position: 'absolute', left: `${5 + i * 12}%`, top: `${15 + Math.sin(i * 1.5) * 30}%`, opacity: 0.06, transform: `rotate(${i * 25}deg)` }} />
      ))}
    </section>
  );
}
