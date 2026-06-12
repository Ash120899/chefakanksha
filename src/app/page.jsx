"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import LoadingScreen from '../components/LoadingScreen/LoadingScreen';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import Journey from '../components/Journey/Journey';
import Craft from '../components/Craft/Craft';
import Experience from '../components/Experience/Experience';
import Milestones from '../components/Milestones/Milestones';
import VeganPiatto from '../components/VeganPiatto/VeganPiatto';
import PersonalStory from '../components/PersonalStory/PersonalStory';
import BlogPreview from '../components/BlogPreview/BlogPreview';
import Testimonials from '../components/Testimonials/Testimonials';
import Collaborate from '../components/Collaborate/Collaborate';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import CustomCursor from '../components/CustomCursor/CustomCursor';
import FootprintTrail from '../components/FootprintTrail/FootprintTrail';


gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef(null);
  const appRef = useRef(null);

  // Initialize Lenis smooth scrolling AFTER loading completes
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;
    lenis.on('scroll', (e) => {
      ScrollTrigger.update(e);
      if (typeof window !== 'undefined' && window.spawnFootprints) {
        window.spawnFootprints(e.scroll);
      }
    });

    const tickCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickCallback);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after DOM paints
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });

    return () => {
      gsap.ticker.remove(tickCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isLoading]);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="app" ref={appRef}>
      <CustomCursor />
      
      {isLoading && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {!isLoading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <Journey />
            <Craft />
            <Experience />
            <Milestones />
            <VeganPiatto />
            <PersonalStory />
            <BlogPreview />
            <Testimonials />
            <Collaborate />
            <Contact />
          </main>
          <Footer />
          {!isLoading && <FootprintTrail />}

        </>
      )}
    </div>
  );
}
