"use client";

import { useEffect, useState, useRef } from 'react';
import './PeekingAnimal.css';

// 8 distinct peeking edges/offsets to jump between in each card/section
const PEEK_SPOTS = [
  { position: 'bottom', offset: 20 },
  { position: 'bottom', offset: 80 },
  { position: 'top', offset: 20 },
  { position: 'top', offset: 80 },
  { position: 'left', offset: 25 },
  { position: 'left', offset: 75 },
  { position: 'right', offset: 25 },
  { position: 'right', offset: 75 }
];

const GREETINGS = {
  puppy: ["Woof! 🐶", "Let's play! 🐾", "Hi! 👋", "Sniff sniff..."],
  cow: ["Moo~ 🐮", "Grass is tasty! 🌿", "Hello friend!", "Moooo!"],
  bunny: ["Hop! 🐰", "Got carrots? 🥕", "Psst...", "Boing!"],
  fox: ["Sneaky! 🦊", "Hi! 🍁", "Ring-ding-ding!", "Caught ya!"],
  squirrel: ["Squeak! 🐿️", "Acorn time? 🥜", "Up here!", "Hello!"],
  kitten: ["Meow~ 🐱", "Purrr... 🐾", "Play time!", "Rawr!"],
  crocodile: ["Chomp! 🐊", "Gator smile! 😄", "Snap snap! 🐾", "Tick-tock..."],
  bird: ["Tweet! 🐦", "Chirp chirp! 🎵", "Sing along! ✨", "Flying high!"],
  raccoon: ["Psst... 🦝", "Trash panda! 🗑️", "Sneaking in!", "Hi! ✨"],
  bear: ["Roar! 🐻", "Honey please! 🍯", "Big hugs! 🤗", "Gruff gruff..."]
};

const ESCAPE_PHRASES = [
  "Oops!",
  "Too slow! 💨",
  "Whoosh!",
  "Missed me! 😜",
  "Over here! 👇",
  "Catch me! 🐾"
];

const WIN_PHRASES = [
  "You got me! 🎉",
  "Hehehe, you're fast! 💖",
  "Wheee! 🐾",
  "Best friends! 🤝"
];

const ESCAPE_EMOJIS = {
  puppy: ["🐾", "⭐", "✨"],
  cow: ["🌿", "🌸", "✨"],
  bunny: ["🥕", "⭐", "✨"],
  fox: ["🍁", "✨", "🔥"],
  squirrel: ["🥜", "🌰", "✨"],
  kitten: ["🐟", "🐾", "✨"],
  crocodile: ["🐊", "💧", "✨"],
  bird: ["🪶", "✨", "🎵"],
  raccoon: ["🍎", "🗝️", "✨"],
  bear: ["🍯", "🐾", "🐻"]
};

// Synthesize sound effects dynamically using Web Audio API to avoid network loading delays
let audioCtx = null;
const playSynthesizedSound = (type) => {
  try {
    if (typeof window === 'undefined') return;
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    switch (type) {
      case 'bird':
      case 'chirp':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(850, now);
        osc.frequency.exponentialRampToValueAtTime(1600, now + 0.08);
        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.exponentialRampToValueAtTime(0.005, now + 0.09);
        osc.start(now);
        osc.stop(now + 0.09);

        setTimeout(() => {
          try {
            const osc2 = audioCtx.createOscillator();
            const gain2 = audioCtx.createGain();
            osc2.connect(gain2);
            gain2.connect(audioCtx.destination);
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(1000, audioCtx.currentTime);
            osc2.frequency.exponentialRampToValueAtTime(1800, audioCtx.currentTime + 0.08);
            gain2.gain.setValueAtTime(0.06, audioCtx.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.005, audioCtx.currentTime + 0.09);
            osc2.start();
            osc2.stop(audioCtx.currentTime + 0.09);
          } catch (e) {}
        }, 80);
        break;

      case 'crocodile':
      case 'snap':
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.06);
        gainNode.gain.setValueAtTime(0.18, now);
        gainNode.gain.exponentialRampToValueAtTime(0.005, now + 0.07);
        osc.start(now);
        osc.stop(now + 0.07);

        setTimeout(() => {
          try {
            const osc2 = audioCtx.createOscillator();
            const gain2 = audioCtx.createGain();
            osc2.connect(gain2);
            gain2.connect(audioCtx.destination);
            osc2.type = 'triangle';
            osc2.frequency.setValueAtTime(100, audioCtx.currentTime);
            osc2.frequency.exponentialRampToValueAtTime(25, audioCtx.currentTime + 0.06);
            gain2.gain.setValueAtTime(0.15, audioCtx.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.005, audioCtx.currentTime + 0.07);
            osc2.start();
            osc2.stop(audioCtx.currentTime + 0.07);
          } catch (e) {}
        }, 90);
        break;

      case 'puppy':
      case 'woof':
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.12);
        gainNode.gain.setValueAtTime(0.12, now);
        gainNode.gain.exponentialRampToValueAtTime(0.005, now + 0.14);
        osc.start(now);
        osc.stop(now + 0.14);
        break;

      case 'kitten':
      case 'meow':
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.quadraticRampToValueAtTime(650, now + 0.12);
        osc.frequency.quadraticRampToValueAtTime(550, now + 0.28);
        gainNode.gain.setValueAtTime(0.06, now);
        gainNode.gain.linearRampToValueAtTime(0.1, now + 0.08);
        gainNode.gain.exponentialRampToValueAtTime(0.005, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
        break;

      case 'cow':
      case 'moo':
        osc.type = 'sawtooth';
        const lowpass = audioCtx.createBiquadFilter();
        lowpass.type = 'lowpass';
        lowpass.frequency.setValueAtTime(220, now);
        osc.disconnect(gainNode);
        osc.connect(lowpass);
        lowpass.connect(gainNode);
        
        osc.frequency.setValueAtTime(115, now);
        osc.frequency.linearRampToValueAtTime(95, now + 0.55);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.linearRampToValueAtTime(0.12, now + 0.15);
        gainNode.gain.exponentialRampToValueAtTime(0.005, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
        break;

      case 'bunny':
      case 'boing':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.quadraticRampToValueAtTime(580, now + 0.18);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.005, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
        break;

      case 'raccoon':
      case 'bear':
      case 'squirrel':
      case 'fox':
      case 'squeak':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(900, now);
        osc.frequency.setValueAtTime(1200, now + 0.03);
        osc.frequency.setValueAtTime(1050, now + 0.06);
        gainNode.gain.setValueAtTime(0.06, now);
        gainNode.gain.exponentialRampToValueAtTime(0.005, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
        break;

      case 'rustle':
      case 'escape':
        const bufferSize = audioCtx.sampleRate * 0.15;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noiseNode = audioCtx.createBufferSource();
        noiseNode.buffer = buffer;

        const noiseFilter = audioCtx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(900, now);
        noiseFilter.frequency.exponentialRampToValueAtTime(300, now + 0.15);

        noiseNode.connect(noiseFilter);
        noiseFilter.connect(gainNode);

        gainNode.gain.setValueAtTime(0.06, now);
        gainNode.gain.exponentialRampToValueAtTime(0.005, now + 0.15);

        noiseNode.start(now);
        noiseNode.stop(now + 0.15);
        break;

      case 'won':
      case 'success':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        osc.frequency.setValueAtTime(1046.50, now + 0.24);
        
        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.setValueAtTime(0.08, now + 0.24);
        gainNode.gain.exponentialRampToValueAtTime(0.005, now + 0.45);
        
        osc.start(now);
        osc.stop(now + 0.45);
        break;
    }
  } catch (e) {
    console.warn("Audio synthesis not supported or blocked by browser:", e);
  }
};

export default function PeekingAnimal({ type = 'bunny', position = 'bottom' }) {
  const [status, setStatus] = useState('hidden'); // hidden, peeking, scared, won
  const [currentPosition, setCurrentPosition] = useState(position);
  const [offset, setOffset] = useState(50); // percentage offset along edge
  const [escapeCount, setEscapeCount] = useState(0);
  const [bubbleText, setBubbleText] = useState("");
  const [particles, setParticles] = useState([]);

  const containerRef = useRef(null);
  const triggerCooldown = useRef(false);
  const timerRef = useRef(null); // for auto-peek hide timer
  const teleportTimerRef = useRef(null); // for hover escape teleport timer

  // Cleanup teleportation timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (teleportTimerRef.current) clearTimeout(teleportTimerRef.current);
    };
  }, []);

  // Synchronize initial position
  useEffect(() => {
    setCurrentPosition(position);
    setOffset(Math.random() > 0.5 ? 20 : 80);
  }, [position]);

  // Viewport scroll/intersection trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !triggerCooldown.current && status === 'hidden') {
            triggerCooldown.current = true;
            
            // Set random greeting
            const list = GREETINGS[type] || GREETINGS.bunny;
            setBubbleText(list[Math.floor(Math.random() * list.length)]);
            setStatus('peeking');
            playSynthesizedSound(type);

            // Quick peek: hide after 1.8 seconds
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
              setStatus('hidden');
              // Cooldown before it can auto-peek again (6 seconds)
              setTimeout(() => {
                triggerCooldown.current = false;
              }, 6000);
            }, 1800);
          }
        });
      },
      { threshold: 0, rootMargin: '150px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [status, type]);

  // Spawn circular flying particles
  const spawnParticles = (emojiList, count = 8) => {
    const newParticles = [];
    const emoji = emojiList[Math.floor(Math.random() * emojiList.length)];
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * 2 * Math.PI + Math.random() * 0.4;
      const distance = 50 + Math.random() * 50;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      const rot = Math.random() * 360;
      
      newParticles.push({
        id: Math.random().toString(),
        emoji,
        style: {
          '--dx': `${dx}px`,
          '--dy': `${dy}px`,
          '--rot': `${rot}deg`,
          left: '50%',
          top: '50%'
        }
      });
    }

    setParticles(prev => [...prev, ...newParticles]);
    
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 950);
  };

  // Handle click/hover playful escape chase game
  const handleHoverOrClick = () => {
    if (status === 'scared' || status === 'hidden' || status === 'won') return;

    // Increment escape count
    const nextCount = escapeCount + 1;
    setEscapeCount(nextCount);

    if (timerRef.current) clearTimeout(timerRef.current);
    if (teleportTimerRef.current) clearTimeout(teleportTimerRef.current);

    // Escape particles
    spawnParticles(ESCAPE_EMOJIS[type] || ["✨", "⭐"], 6);

    if (nextCount < 4) {
      // Set to scared state (which vanishes immediately via opacity: 0 in CSS)
      setStatus('scared');
      setBubbleText(ESCAPE_PHRASES[Math.floor(Math.random() * ESCAPE_PHRASES.length)]);
      playSynthesizedSound('rustle');

      // Teleport: Move silently while invisible, and pop back out at next spot
      teleportTimerRef.current = setTimeout(() => {
        setStatus('hidden');
        
        // Select a random new position/offset combo from the spots array
        const otherSpots = PEEK_SPOTS.filter(
          s => s.position !== currentPosition || Math.abs(s.offset - offset) > 10
        );
        const nextSpot = otherSpots[Math.floor(Math.random() * otherSpots.length)];

        setCurrentPosition(nextSpot.position);
        setOffset(nextSpot.offset);

        // Pop back out quickly!
        teleportTimerRef.current = setTimeout(() => {
          setStatus('peeking');
          const list = GREETINGS[type] || GREETINGS.bunny;
          setBubbleText(list[Math.floor(Math.random() * list.length)]);
          playSynthesizedSound(type);
        }, 150);
      }, 200); // quick transition to hidden state
    } else {
      // WIN: Player caught the animal!
      setStatus('won');
      const winList = WIN_PHRASES;
      setBubbleText(winList[Math.floor(Math.random() * winList.length)]);
      playSynthesizedSound('won');
      
      // Spawn burst of hearts
      spawnParticles(["💖", "✨", "💝"], 10);

      // Hide after showing off
      teleportTimerRef.current = setTimeout(() => {
        setStatus('hidden');
        // Reset chase game
        setTimeout(() => {
          setEscapeCount(0);
          triggerCooldown.current = false;
        }, 8000);
      }, 2000);
    }
  };

  const renderAnimalSVG = () => {
    const strokeColor = 'var(--dark-brown)';
    const fillColor = 'var(--cream)';

    switch (type) {
      case 'puppy':
        return (
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="animal-svg">
            <path d="M11 20 C7 11, 2 17, 4 25 C6 33, 13 32, 13 24 C13 18, 12 21, 11 20 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="wiggle-ear-left" />
            <path d="M10 19 C8 15, 6 17, 7 22" stroke={strokeColor} strokeWidth="1" />
            <path d="M49 20 C53 11, 58 17, 56 25 C54 33, 47 32, 47 24 C47 18, 48 21, 49 20 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="wiggle-ear-right" />
            <path d="M50 19 C52 15, 54 17, 53 22" stroke={strokeColor} strokeWidth="1" />
            <path d="M13 28 C13 15, 47 15, 47 28 C47 39, 41 45, 30 45 C19 45, 13 39, 13 28 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 26 C22 20, 38 20, 44 26" stroke={strokeColor} strokeWidth="1" />
            <circle cx="23" cy="27" r="3" fill={strokeColor} className="animal-eye" />
            <circle cx="22" cy="26" r="0.8" fill="#FFF" className="animal-eye" />
            <circle cx="37" cy="27" r="3" fill={strokeColor} className="animal-eye" />
            <circle cx="36" cy="26" r="0.8" fill="#FFF" className="animal-eye" />
            <ellipse cx="30" cy="34" rx="4.5" ry="3" fill="#E8C4B8" stroke={strokeColor} strokeWidth="1.8" />
            <path d="M28 34 Q30 36 32 34" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
            <circle cx="30" cy="32.5" r="1.5" fill={strokeColor} />
            <path d="M17 45 C17 41, 24 41, 24 45 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            <line x1="20" y1="41" x2="20" y2="45" stroke={strokeColor} strokeWidth="1.2" />
            <path d="M36 45 C36 41, 43 41, 43 45 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            <line x1="39" y1="41" x2="39" y2="45" stroke={strokeColor} strokeWidth="1.2" />
          </svg>
        );
      case 'cow':
        return (
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="animal-svg">
            <path d="M19 15 Q14 8, 10 10 Q14 13, 19 18 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M41 15 Q46 8, 50 10 Q46 13, 41 18 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M10 21 C5 19, 5 27, 11 25 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            <path d="M50 21 C55 19, 55 27, 49 25 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            <ellipse cx="30" cy="27" rx="18" ry="14" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <path d="M16 22 C18 19, 21 21, 19 25 Z" fill={strokeColor} opacity="0.15" />
            <path d="M40 28 Q43 26, 45 30 Z" fill={strokeColor} opacity="0.15" />
            <circle cx="22" cy="25" r="2.5" fill={strokeColor} className="animal-eye" />
            <circle cx="38" cy="25" r="2.5" fill={strokeColor} className="animal-eye" />
            <ellipse cx="30" cy="35" rx="8.5" ry="5.5" fill="#E8C4B8" stroke={strokeColor} strokeWidth="2.2" />
            <circle cx="27" cy="35" r="1.2" fill={strokeColor} />
            <circle cx="33" cy="35" r="1.2" fill={strokeColor} />
            <path d="M18 41 C18 38, 24 38, 24 41 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            <path d="M36 41 C36 38, 43 38, 43 41 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
          </svg>
        );
      case 'bunny':
        return (
          <svg width="55" height="65" viewBox="0 0 60 70" fill="none" className="animal-svg">
            <path d="M17 21 C17 8, 23 8, 23 21 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" className="wiggle-ear-left" />
            <path d="M19 19 C19 11, 21 11, 21 19 Z" fill="#E8C4B8" />
            <path d="M37 21 C37 8, 43 8, 43 21 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" className="wiggle-ear-right" />
            <path d="M39 19 C39 11, 41 11, 41 19 Z" fill="#E8C4B8" />
            <circle cx="30" cy="40" r="16.5" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <circle cx="23" cy="38" r="2.5" fill={strokeColor} className="animal-eye" />
            <circle cx="22" cy="37" r="0.7" fill="#FFF" className="animal-eye" />
            <circle cx="37" cy="38" r="2.5" fill={strokeColor} className="animal-eye" />
            <circle cx="36" cy="37" r="0.7" fill="#FFF" className="animal-eye" />
            <polygon points="30,43 28,41 32,41" fill="#E8C4B8" stroke={strokeColor} strokeWidth="1.5" />
            <path d="M28 45 Q30 47 32 45" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" />
            <path d="M19 54 C19 50, 25 50, 25 54 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            <path d="M35 54 C35 50, 41 50, 41 54 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
          </svg>
        );
      case 'fox':
        return (
          <svg width="60" height="55" viewBox="0 0 60 55" fill="none" className="animal-svg">
            <path d="M13 19 L5 5 L21 13 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M8 8 L16 14" stroke={strokeColor} strokeWidth="1" />
            <path d="M47 19 L55 5 L39 13 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M52 8 L44 14" stroke={strokeColor} strokeWidth="1" />
            <path d="M9 19 C9 19, 29 36, 29 36 C29 36, 49 19, 49 19 C49 27, 43 36, 29 44 C15 36, 9 27, 9 19 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 19 Q29 23 29 36 Z" fill="#E8C4B8" stroke={strokeColor} strokeWidth="1.8" />
            <path d="M48 19 Q29 23 29 36 Z" fill="#E8C4B8" stroke={strokeColor} strokeWidth="1.8" />
            <circle cx="20" cy="23" r="2.5" fill={strokeColor} className="animal-eye" />
            <circle cx="40" cy="23" r="2.5" fill={strokeColor} className="animal-eye" />
            <circle cx="29" cy="37.5" r="2" fill={strokeColor} />
            <path d="M18 41 C18 38, 23 38, 23 41 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            <path d="M35 41 C35 38, 40 38, 40 41 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
          </svg>
        );
      case 'squirrel':
        return (
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="animal-svg">
            <path d="M18 19 L15 7 Q18 11 20 19 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            <path d="M15 7 C14 5, 12 3, 14 3" stroke={strokeColor} strokeWidth="1.5" />
            <path d="M40 19 L43 7 Q40 11 38 19 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            <path d="M43 7 C44 5, 46 3, 44 3" stroke={strokeColor} strokeWidth="1.5" />
            <circle cx="29" cy="31" r="15" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <circle cx="17.5" cy="35" r="4" fill="#E8C4B8" stroke={strokeColor} strokeWidth="1.2" />
            <circle cx="40.5" cy="35" r="4" fill="#E8C4B8" stroke={strokeColor} strokeWidth="1.2" />
            <circle cx="22.5" cy="28.5" r="3" fill={strokeColor} className="animal-eye" />
            <circle cx="21.5" cy="27.5" r="1" fill="#FFF" className="animal-eye" />
            <circle cx="35.5" cy="28.5" r="3" fill={strokeColor} className="animal-eye" />
            <circle cx="34.5" cy="27.5" r="1" fill="#FFF" className="animal-eye" />
            <circle cx="29" cy="32" r="1.5" fill={strokeColor} />
            <path d="M18 44 C18 41, 23 41, 23 44 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            <path d="M35 44 C35 41, 40 41, 40 44 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
          </svg>
        );
      case 'crocodile':
        return (
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="animal-svg">
            <path d="M18 16 Q20 8 23 15" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" fill="#5E8F5D" />
            <path d="M28 14 Q30 6 33 13" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" fill="#5E8F5D" />
            <path d="M38 16 Q40 8 43 15" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" fill="#5E8F5D" />
            <path d="M14 26 C14 16, 46 16, 46 26 C46 36, 42 42, 30 42 C18 42, 14 36, 14 26 Z" fill="#7AA676" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="18" cy="31" r="2.5" fill="#E8C4B8" />
            <circle cx="42" cy="31" r="2.5" fill="#E8C4B8" />
            <circle cx="23" cy="23" r="3" fill={strokeColor} className="animal-eye" />
            <circle cx="22" cy="22" r="0.8" fill="#FFF" className="animal-eye" />
            <circle cx="37" cy="23" r="3" fill={strokeColor} className="animal-eye" />
            <circle cx="36" cy="22" r="0.8" fill="#FFF" className="animal-eye" />
            <polygon points="21,32 23,35 25,32" fill="#FFF" stroke={strokeColor} strokeWidth="1.2" />
            <polygon points="35,32 37,35 39,32" fill="#FFF" stroke={strokeColor} strokeWidth="1.2" />
            <path d="M19 42 C19 38, 24 38, 24 42 Z" fill="#7AA676" stroke={strokeColor} strokeWidth="2" />
            <path d="M36 42 C36 38, 41 38, 41 42 Z" fill="#7AA676" stroke={strokeColor} strokeWidth="2" />
          </svg>
        );
      case 'bird':
        const birdColor = '#F4A261';
        return (
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="animal-svg">
            <path d="M13 28 C8 24, 6 32, 10 36 Z" fill={birdColor} stroke={strokeColor} strokeWidth="2" className="wiggle-ear-left" />
            <path d="M47 28 C52 24, 54 32, 50 36 Z" fill={birdColor} stroke={strokeColor} strokeWidth="2" className="wiggle-ear-right" />
            <circle cx="30" cy="30" r="16.5" fill={birdColor} stroke={strokeColor} strokeWidth="2.5" />
            <circle cx="20" cy="32" r="2.5" fill="#E8C4B8" />
            <circle cx="40" cy="32" r="2.5" fill="#E8C4B8" />
            <circle cx="23" cy="26" r="2.8" fill={strokeColor} className="animal-eye" />
            <circle cx="22" cy="25" r="0.7" fill="#FFF" className="animal-eye" />
            <circle cx="37" cy="26" r="2.8" fill={strokeColor} className="animal-eye" />
            <circle cx="36" cy="25" r="0.7" fill="#FFF" className="animal-eye" />
            <polygon points="28,30 32,30 30,35" fill="#E76F51" stroke={strokeColor} strokeWidth="1.5" />
            <path d="M28 14 Q30 6 32 14" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M25 46 L23 50" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M25 46 L27 50" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M35 46 L33 50" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M35 46 L37 50" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'raccoon':
        return (
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="animal-svg">
            <path d="M14 22 L6 9 L22 17 Z" fill="#8D99AE" stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M46 22 L54 9 L38 17 Z" fill="#8D99AE" stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx="30" cy="32" r="16" fill="#DDF2F3" stroke={strokeColor} strokeWidth="2.5" />
            <path d="M15 29 C15 29, 20 25, 30 29 C40 25, 45 29, 45 29 C46 33, 42 36, 30 35 C18 36, 14 33, 15 29 Z" fill="#2B2D42" stroke={strokeColor} strokeWidth="1.8" />
            <circle cx="22" cy="29" r="2.5" fill="#FFF" className="animal-eye" />
            <circle cx="22" cy="29" r="1" fill="#000" className="animal-eye" />
            <circle cx="38" cy="29" r="2.5" fill="#FFF" className="animal-eye" />
            <circle cx="38" cy="29" r="1" fill="#000" className="animal-eye" />
            <polygon points="30,36 28,34 32,34" fill="#2B2D42" stroke={strokeColor} strokeWidth="1.5" />
            <circle cx="16" cy="35" r="2" fill="#E8C4B8" />
            <circle cx="44" cy="35" r="2" fill="#E8C4B8" />
            <path d="M18 46 C18 43, 23 43, 23 46 Z" fill="#8D99AE" stroke={strokeColor} strokeWidth="2" />
            <path d="M37 46 C37 43, 42 43, 42 46 Z" fill="#8D99AE" stroke={strokeColor} strokeWidth="2" />
          </svg>
        );
      case 'bear':
        return (
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="animal-svg">
            <circle cx="16" cy="18" r="6.5" fill="#B5838D" stroke={strokeColor} strokeWidth="2.5" />
            <circle cx="44" cy="18" r="6.5" fill="#B5838D" stroke={strokeColor} strokeWidth="2.5" />
            <circle cx="30" cy="32" r="16.5" fill="#E0A96D" stroke={strokeColor} strokeWidth="2.5" />
            <ellipse cx="30" cy="38" rx="6" ry="4" fill="#F4F1DE" stroke={strokeColor} strokeWidth="1.8" />
            <circle cx="30" cy="36.5" r="1.5" fill={strokeColor} />
            <path d="M28 38.5 Q30 40 32 38.5" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="22" cy="28" r="2.8" fill={strokeColor} className="animal-eye" />
            <circle cx="22" cy="27" r="0.8" fill="#FFF" className="animal-eye" />
            <circle cx="38" cy="28" r="2.8" fill={strokeColor} className="animal-eye" />
            <circle cx="38" cy="27" r="0.8" fill="#FFF" className="animal-eye" />
            <circle cx="17.5" cy="35" r="2.5" fill="#E8C4B8" />
            <circle cx="42.5" cy="35" r="2.5" fill="#E8C4B8" />
            <path d="M18 46 C18 42, 23 42, 23 46 Z" fill="#E0A96D" stroke={strokeColor} strokeWidth="2" />
            <path d="M37 46 C37 42, 42 42, 42 46 Z" fill="#E0A96D" stroke={strokeColor} strokeWidth="2" />
          </svg>
        );
      case 'kitten':
      default:
        return (
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="animal-svg">
            <path d="M13 23 L5 9 L21 17 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M9 19 L8 12 L14 16 Z" fill="#E8C4B8" />
            <path d="M45 23 L53 9 L37 17 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M49 19 L50 12 L44 16 Z" fill="#E8C4B8" />
            <circle cx="29" cy="33" r="15.5" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <path d="M13 34 L3 33 M13 37 L1 37 M45 34 L55 33 M45 37 L57 37" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="21" cy="30" r="2.8" fill={strokeColor} className="animal-eye" />
            <circle cx="20" cy="29" r="1" fill="#FFF" className="animal-eye" />
            <circle cx="37" cy="30" r="2.8" fill={strokeColor} className="animal-eye" />
            <circle cx="36" cy="29" r="1" fill="#FFF" className="animal-eye" />
            <polygon points="29,35 27,33 31,33" fill="#E8C4B8" stroke={strokeColor} strokeWidth="1.5" />
            <path d="M27 37 Q29 39 31 37" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" />
            <path d="M17 46 C17 42, 23 42, 23 46 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            <path d="M35 46 C35 42, 41 42, 41 46 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
          </svg>
        );
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`peeking-animal peeking-animal--${currentPosition} peeking-animal--${type} ${status}`}
      style={{ '--offset': `${offset}%` }}
      onMouseEnter={handleHoverOrClick}
      onClick={handleHoverOrClick}
    >
      {/* Speech Bubble */}
      <div className="peeking-animal__bubble">
        {bubbleText}
      </div>

      {/* Flyout Particles */}
      {particles.map((p) => (
        <span key={p.id} className="peeking-particle" style={p.style}>
          {p.emoji}
        </span>
      ))}

      <div className="peeking-animal__wrapper">
        {renderAnimalSVG()}
        <span className="peeking-animal__exclamation">!</span>
      </div>
    </div>
  );
}

