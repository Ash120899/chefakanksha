"use client";

import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import './AmbientAnimals.css';

// ========================================
// PAWS/CLAWS GRIPPING OVERLAY COMPONENT
// ========================================

const Paws = ({ placement, color, type }) => {
  if (type === 'fish' || type === 'elephant') return null;

  const isBirdOrOwl = type === 'bird' || type === 'owl';
  const strokeColor = "#2C3E50";
  const strokeWidth = "2.5";

  // Birds and Owls get cute orange talons clutching the card border
  if (isBirdOrOwl) {
    const clawColor = "#FF8F00";
    switch (placement) {
      case 'left':
        return (
          <g className="animal-claws">
            <path d="M54 22 L58 22 M54 24 L59 25 L54 26 M54 28 L58 28" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <path d="M54 32 L58 32 M54 34 L59 35 L54 36 M54 38 L58 38" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          </g>
        );
      case 'right':
        return (
          <g className="animal-claws">
            <path d="M6 22 L2 22 M6 24 L1 25 L6 26 M6 28 L2 28" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <path d="M6 32 L2 32 M6 34 L1 35 L6 36 M6 38 L2 38" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          </g>
        );
      case 'bottom-hanging':
        return (
          <g className="animal-claws">
            <path d="M22 6 L22 2 M24 6 L25 1 L26 6 M28 6 L28 2" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <path d="M32 6 L32 2 M34 6 L35 1 L36 6 M38 6 L38 2" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          </g>
        );
      case 'top':
        return (
          <g className="animal-claws">
            <path d="M22 54 L22 58 M24 54 L25 59 L26 54 M28 54 L28 58" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <path d="M32 54 L32 58 M34 54 L35 59 L36 54 M38 54 L38 58" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          </g>
        );
      default:
        return null;
    }
  }

  // Mammals and Reptiles get rounded clutching paws matching their color
  switch (placement) {
    case 'left':
      return (
        <g className="animal-paws">
          <circle cx="57" cy="23" r="4.5" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
          <circle cx="57" cy="37" r="4.5" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
        </g>
      );
    case 'right':
      return (
        <g className="animal-paws">
          <circle cx="3" cy="23" r="4.5" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
          <circle cx="3" cy="37" r="4.5" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
        </g>
      );
    case 'bottom-hanging':
      return (
        <g className="animal-paws">
          <circle cx="23" cy="3" r="4.5" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
          <circle cx="37" cy="3" r="4.5" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
        </g>
      );
    case 'top':
      return (
        <g className="animal-paws">
          <circle cx="23" cy="57" r="4.5" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
          <circle cx="37" cy="57" r="4.5" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
        </g>
      );
    default:
      return null;
  }
};

// ========================================
// ANIMAL SVG SHAPE COMPONENTS
// ========================================

const ElephantSVG = ({ placement }) => {
  const strokeColor = "#2C3E50";
  const strokeWidth = "2.5";
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      {/* Tree Trunk / Branch */}
      {placement === 'left' && (
        <g>
          <path d="M56 0 L56 60" stroke="#795548" strokeWidth="6" strokeLinecap="round" />
          <circle cx="56" cy="18" r="3.5" fill="#81C784" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="56" cy="42" r="3.5" fill="#81C784" stroke={strokeColor} strokeWidth="1.5" />
        </g>
      )}
      {placement === 'right' && (
        <g>
          <path d="M4 0 L4 60" stroke="#795548" strokeWidth="6" strokeLinecap="round" />
          <circle cx="4" cy="18" r="3.5" fill="#81C784" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="4" cy="42" r="3.5" fill="#81C784" stroke={strokeColor} strokeWidth="1.5" />
        </g>
      )}
      {placement === 'bottom-hanging' && (
        <g>
          <path d="M0 4 L60 4" stroke="#795548" strokeWidth="6" strokeLinecap="round" />
          <circle cx="18" cy="4" r="3.5" fill="#81C784" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="42" cy="4" r="3.5" fill="#81C784" stroke={strokeColor} strokeWidth="1.5" />
        </g>
      )}
      {placement === 'top' && (
        <g>
          <path d="M0 56 L60 56" stroke="#795548" strokeWidth="6" strokeLinecap="round" />
          <circle cx="18" cy="56" r="3.5" fill="#81C784" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="42" cy="56" r="3.5" fill="#81C784" stroke={strokeColor} strokeWidth="1.5" />
        </g>
      )}

      {/* Head */}
      <circle cx="30" cy="32" r="15.5" fill="#B0BEC5" stroke={strokeColor} strokeWidth={strokeWidth} />
      {/* Ears */}
      <ellipse cx="14" cy="28" rx="8.5" ry="11" fill="#B0BEC5" stroke={strokeColor} strokeWidth={strokeWidth} />
      <ellipse cx="14" cy="28" rx="4.5" ry="6.5" fill="#FFCDD2" />
      <ellipse cx="46" cy="28" rx="8.5" ry="11" fill="#B0BEC5" stroke={strokeColor} strokeWidth={strokeWidth} />
      <ellipse cx="46" cy="28" rx="4.5" ry="6.5" fill="#FFCDD2" />
      
      {/* Eyes */}
      <circle className="ambient-eye" cx="24" cy="27" r="3" fill={strokeColor} />
      <circle cx="23" cy="26" r="0.8" fill="#FFF" />
      <circle className="ambient-eye" cx="36" cy="27" r="3" fill={strokeColor} />
      <circle cx="35" cy="26" r="0.8" fill="#FFF" />
      {/* Cheeks */}
      <circle cx="19" cy="33" r="3" fill="#FF8A80" opacity="0.85" />
      <circle cx="41" cy="33" r="3" fill="#FF8A80" opacity="0.85" />

      {/* Trunk wrapping branch */}
      {placement === 'left' ? (
        <path className="elephant-trunk" d="M30 35 Q 48 37 56 30" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" fill="none" />
      ) : placement === 'right' ? (
        <path className="elephant-trunk" d="M30 35 Q 12 37 4 30" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" fill="none" />
      ) : placement === 'bottom-hanging' ? (
        <path className="elephant-trunk" d="M30 35 Q 30 18 30 4" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" fill="none" />
      ) : (
        <path className="elephant-trunk" d="M30 35 Q 30 48 30 56" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" fill="none" />
      )}

      {/* Inner trunk color */}
      {placement === 'left' ? (
        <path className="elephant-trunk" d="M30 35 Q 48 37 56 30" stroke="#B0BEC5" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      ) : placement === 'right' ? (
        <path className="elephant-trunk" d="M30 35 Q 12 37 4 30" stroke="#B0BEC5" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      ) : placement === 'bottom-hanging' ? (
        <path className="elephant-trunk" d="M30 35 Q 30 18 30 4" stroke="#B0BEC5" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      ) : (
        <path className="elephant-trunk" d="M30 35 Q 30 48 30 56" stroke="#B0BEC5" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      )}
    </svg>
  );
};

const HorseSVG = ({ placement }) => {
  const strokeColor = "#2C3E50";
  const strokeWidth = "2.5";
  const fillColor = "#BCAAA4";
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <ellipse cx="30" cy="30" rx="14" ry="16" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
      <polygon points="21,16 17,4 26,10" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <polygon points="39,16 43,4 34,10" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path d="M26 14 C20 8 16 0 16 0" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M34 14 C40 8 44 0 44 0" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" />
      <circle className="ambient-eye" cx="23" cy="25" r="3" fill={strokeColor} />
      <circle cx="22" cy="24" r="0.8" fill="#FFF" />
      <circle className="ambient-eye" cx="37" cy="25" r="3" fill={strokeColor} />
      <circle cx="36" cy="24" r="0.8" fill="#FFF" />
      <ellipse cx="30" cy="38" rx="8.5" ry="5.5" fill="#D7CCC8" stroke={strokeColor} strokeWidth={strokeWidth} />
      <circle cx="27" cy="38" r="1.2" fill={strokeColor} />
      <circle cx="33" cy="38" r="1.2" fill={strokeColor} />
      <circle cx="19" cy="31" r="3" fill="#FF8A80" opacity="0.85" />
      <circle cx="41" cy="31" r="3" fill="#FF8A80" opacity="0.85" />
      <Paws placement={placement} color={fillColor} type="horse" />
    </svg>
  );
};

const CatSVG = ({ placement }) => {
  const strokeColor = "#2C3E50";
  const strokeWidth = "2.5";
  const fillColor = "#FFB74D";
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="30" r="15.5" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
      <polygon points="18,17 12,5 24,13" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <polygon points="42,17 48,5 36,13" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <line x1="16" y1="31" x2="6" y2="29" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="34" x2="5" y2="35" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="44" y1="31" x2="54" y2="29" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="44" y1="34" x2="55" y2="35" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
      <circle className="ambient-eye" cx="23" cy="25" r="3" fill={strokeColor} />
      <circle cx="22" cy="24" r="0.8" fill="#FFF" />
      <circle className="ambient-eye" cx="37" cy="25" r="3" fill={strokeColor} />
      <circle cx="36" cy="24" r="0.8" fill="#FFF" />
      <polygon points="29,28 31,28 30,29.2" fill="#E8C4B8" />
      <path d="M28.5 31 Q30 32.5 31.5 31" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="19" cy="30.5" r="3.2" fill="#FF8A80" opacity="0.85" />
      <circle cx="41" cy="30.5" r="3.2" fill="#FF8A80" opacity="0.85" />
      <Paws placement={placement} color={fillColor} type="cat" />
    </svg>
  );
};

const DogSVG = ({ placement }) => {
  const strokeColor = "#2C3E50";
  const strokeWidth = "2.5";
  const fillColor = "#FFD54F";
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="30" r="15.5" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
      <path d="M16 17 C12 21 11 31 16 33 C18 34 20 30 19 26" fill="#D84315" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M44 17 C48 21 49 31 44 33 C42 34 40 30 41 26" fill="#D84315" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
      <circle className="ambient-eye" cx="23" cy="25" r="3" fill={strokeColor} />
      <circle cx="22" cy="24" r="0.8" fill="#FFF" />
      <circle className="ambient-eye" cx="37" cy="25" r="3" fill={strokeColor} />
      <circle cx="36" cy="24" r="0.8" fill="#FFF" />
      <ellipse cx="30" cy="33.5" rx="6" ry="4" fill="#FFF" stroke={strokeColor} strokeWidth={strokeWidth} />
      <circle cx="30" cy="31.5" r="1.8" fill={strokeColor} />
      <path d="M28.5 34.5 Q30 36 31.5 34.5" stroke={strokeColor} strokeWidth="1.2" fill="none" />
      <circle cx="19" cy="30" r="3" fill="#FF8A80" opacity="0.85" />
      <circle cx="41" cy="30" r="3" fill="#FF8A80" opacity="0.85" />
      <Paws placement={placement} color={fillColor} type="dog" />
    </svg>
  );
};

const CowSVG = ({ placement }) => {
  const strokeColor = "#2C3E50";
  const strokeWidth = "2.5";
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <rect x="15" y="15" width="30" height="30" rx="10" fill="#FFF" stroke={strokeColor} strokeWidth={strokeWidth} />
      <path d="M15 22 C15 18 20 18 19 25 Z" fill={strokeColor} />
      <path d="M45 28 C45 24 40 25 41 32 Z" fill={strokeColor} />
      <path d="M18 15 Q13 10 9 13" stroke="#CFD8DC" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M42 15 Q47 10 51 13" stroke="#CFD8DC" strokeWidth="3" strokeLinecap="round" fill="none" />
      <rect x="18" y="30" width="24" height="12" rx="6" fill="#FFCDD2" stroke={strokeColor} strokeWidth={strokeWidth} />
      <circle cx="25" cy="36" r="1.5" fill={strokeColor} />
      <circle cx="35" cy="36" r="1.5" fill={strokeColor} />
      <circle className="ambient-eye" cx="22" cy="24" r="3" fill={strokeColor} />
      <circle cx="21" cy="23" r="0.8" fill="#FFF" />
      <circle className="ambient-eye" cx="38" cy="24" r="3" fill={strokeColor} />
      <circle cx="37" cy="23" r="0.8" fill="#FFF" />
      <circle cx="17" cy="29" r="3" fill="#FF8A80" opacity="0.85" />
      <circle cx="43" cy="29" r="3" fill="#FF8A80" opacity="0.85" />
      <Paws placement={placement} color="#FFF" type="cow" />
    </svg>
  );
};

const GoatSVG = ({ placement }) => {
  const strokeColor = "#2C3E50";
  const strokeWidth = "2.5";
  const fillColor = "#ECEFF1";
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <path d="M26 34 L34 34 L30 46 Z" fill="#CFD8DC" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path d="M18 18 C18 12 42 12 42 18 L38 34 L22 34 Z" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
      <path d="M22 13 C19 5 15 7 14 11" stroke="#90A4AE" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M38 13 C41 5 45 7 46 11" stroke="#90A4AE" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle className="ambient-eye" cx="25" cy="22" r="3" fill={strokeColor} />
      <circle cx="24" cy="21" r="0.8" fill="#FFF" />
      <circle className="ambient-eye" cx="35" cy="22" r="3" fill={strokeColor} />
      <circle cx="34" cy="21" r="0.8" fill="#FFF" />
      <ellipse cx="30" cy="30" rx="4.5" ry="3" fill="#FFCDD2" stroke={strokeColor} strokeWidth={strokeWidth} />
      <circle cx="21" cy="27" r="2.5" fill="#FF8A80" opacity="0.85" />
      <circle cx="39" cy="27" r="2.5" fill="#FF8A80" opacity="0.85" />
      <Paws placement={placement} color={fillColor} type="goat" />
    </svg>
  );
};

const SheepSVG = ({ placement }) => {
  const strokeColor = "#2C3E50";
  const strokeWidth = "2.5";
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <ellipse cx="30" cy="18" rx="14" ry="8" fill="#FFF" stroke={strokeColor} strokeWidth={strokeWidth} />
      <ellipse cx="22" cy="18" rx="8" ry="6" fill="#FFF" stroke={strokeColor} strokeWidth={strokeWidth} />
      <ellipse cx="38" cy="18" rx="8" ry="6" fill="#FFF" stroke={strokeColor} strokeWidth={strokeWidth} />
      <circle cx="30" cy="32" r="13" fill="#455A64" stroke={strokeColor} strokeWidth={strokeWidth} />
      <circle className="ambient-eye" cx="26" cy="30" r="3" fill="#FFF" />
      <circle cx="26" cy="30" r="1.2" fill={strokeColor} />
      <circle className="ambient-eye" cx="34" cy="30" r="3" fill="#FFF" />
      <circle cx="34" cy="30" r="1.2" fill={strokeColor} />
      <circle cx="21" cy="34" r="2.5" fill="#FF8A80" opacity="0.85" />
      <circle cx="39" cy="34" r="2.5" fill="#FF8A80" opacity="0.85" />
      <path d="M28.5 35 Q30 36.5 31.5 35" stroke="#FFF" strokeWidth="1.2" fill="none" />
      <Paws placement={placement} color="#FFF" type="sheep" />
    </svg>
  );
};

const MouseSVG = ({ placement }) => {
  const strokeColor = "#2C3E50";
  const strokeWidth = "2.5";
  const fillColor = "#B0BEC5";
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <g transform="translate(5, 5)">
        <path className="mouse-tail" d="M12 36 Q6 32 8 25 Q10 18 4 14" stroke="#FFA4A4" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <ellipse cx="28" cy="30" rx="13" ry="11" fill="#B0BEC5" />
        <ellipse cx="28" cy="30" rx="9" ry="7.5" fill="#CFD8DC" />
        <ellipse cx="36" cy="24" rx="9.5" ry="8" fill="#B0BEC5" />
        <circle cx="31" cy="15" r="7.2" fill="#B0BEC5" />
        <circle cx="31" cy="15" r="4.2" fill="#FFCDD2" />
        <circle cx="43" cy="18" r="7.2" fill="#B0BEC5" />
        <circle cx="43" cy="18" r="4.2" fill="#FFCDD2" />
        <circle cx="42.5" cy="25" r="1.8" fill="#FF8A80" />
        <circle className="ambient-eye" cx="35" cy="21" r="1.8" fill="#37474F" />
        <circle cx="34.5" cy="20.3" r="0.6" fill="#FFF" />
        <line x1="41" y1="26" x2="48" y2="28" stroke="#78909C" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="42" y1="27.2" x2="47" y2="31" stroke="#78909C" strokeWidth="1.2" strokeLinecap="round" />
      </g>
      <Paws placement={placement} color={fillColor} type="mouse" />
    </svg>
  );
};

const FishSVG = () => {
  const strokeColor = "#2C3E50";
  const strokeWidth = "2.5";
  const fillColor = "#FF7043";
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <g transform="translate(2.5, 2.5)">
        <path className="fish-tail" d="M38 30 C 45 22 52 16 54 22 C 56 28 48 32 52 38 Z" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
        <ellipse cx="24" cy="30" rx="15" ry="11" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        <circle cx="16" cy="27" r="3.5" fill="#FFF" stroke={strokeColor} strokeWidth="1.5" />
        <circle className="ambient-eye" cx="15.5" cy="27" r="2" fill={strokeColor} />
        <circle cx="15" cy="26" r="0.6" fill="#FFF" />
        <circle cx="14" cy="33" r="2.5" fill="#FF8A80" opacity="0.85" />
      </g>
    </svg>
  );
};

const BirdSVG = ({ placement }) => {
  const strokeColor = "#2C3E50";
  const strokeWidth = "2.5";
  const fillColor = "#FFEB3B";
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <g transform="translate(2.5, 2.5)">
        <circle cx="30" cy="30" r="14.5" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        <polygon points="41,26 48,30 41,34" fill="#FF9800" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
        <path className="bird-wing" d="M22 30 C16 24 14 18 20 20 Z" fill="#F57F17" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
        <circle cx="34" cy="25" r="3.2" fill="#FFF" stroke={strokeColor} strokeWidth="1.5" />
        <circle className="ambient-eye" cx="34.5" cy="25" r="1.8" fill={strokeColor} />
        <circle cx="34" cy="24.2" r="0.6" fill="#FFF" />
        <circle cx="31" cy="30" r="2.5" fill="#FF8A80" opacity="0.85" />
      </g>
      <Paws placement={placement} color="#FFEB3B" type="bird" />
    </svg>
  );
};

const CrocodileSVG = ({ placement }) => {
  const strokeColor = "#2C3E50";
  const strokeWidth = "2.5";
  const fillColor = "#4CAF50";
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <g transform="scale(0.9) translate(1.5, 1.5)">
        <circle cx="20" cy="18" r="4.5" fill="#2E7D32" stroke={strokeColor} strokeWidth={strokeWidth} />
        <circle cx="32" cy="18" r="4.5" fill="#2E7D32" stroke={strokeColor} strokeWidth={strokeWidth} />
        <ellipse cx="30" cy="32" rx="14.5" ry="12.5" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        <g className="crocodile-snout">
          <path d="M28 29 L54 29 C56 29 56 37 50 37 L28 37 Z" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
          <polygon points="36,33 38,36 40,33" fill="#FFF" />
          <polygon points="44,33 46,36 48,33" fill="#FFF" />
        </g>
        <circle cx="22" cy="22" r="4.5" fill="#FFF" stroke={strokeColor} strokeWidth={strokeWidth} />
        <circle className="ambient-eye" cx="22" cy="22" r="2.2" fill={strokeColor} />
        <circle cx="21.2" cy="21.2" r="0.8" fill="#FFF" />
        <circle cx="19" cy="30" r="3" fill="#FF8A80" opacity="0.85" />
      </g>
      <Paws placement={placement} color={fillColor} type="crocodile" />
    </svg>
  );
};

const LionSVG = ({ placement }) => {
  const strokeColor = "#2C3E50";
  const strokeWidth = "2.5";
  const fillColor = "#FFCA28";
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <g transform="scale(0.9) translate(1.5, 1.5)">
        <path d="M12 24 C 6 20 6 12 12 10 C 18 4 28 4 36 6 C 44 4 54 10 52 18 C 54 26 48 34 42 36 C 36 40 28 40 20 38 C 12 36 10 28 10 24 Z" fill="#E65100" stroke={strokeColor} strokeWidth={strokeWidth} />
        <circle cx="30" cy="28" r="17" fill="#E65100" />
        <circle cx="30" cy="28" r="12.5" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        <circle cx="20" cy="18" r="3.5" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        <circle cx="40" cy="18" r="3.5" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        <circle className="ambient-eye" cx="25" cy="25" r="3" fill={strokeColor} />
        <circle cx="24" cy="24" r="0.8" fill="#FFF" />
        <circle className="ambient-eye" cx="35" cy="25" r="3" fill={strokeColor} />
        <circle cx="34" cy="24" r="0.8" fill="#FFF" />
        <ellipse cx="30" cy="30.5" rx="3.5" ry="2.2" fill="#FFF" stroke={strokeColor} strokeWidth="1" />
        <polygon points="29,29 31,29 30,30.2" fill={strokeColor} />
        <circle cx="19" cy="28" r="2.5" fill="#FF8A80" opacity="0.85" />
        <circle cx="41" cy="28" r="2.5" fill="#FF8A80" opacity="0.85" />
      </g>
      <Paws placement={placement} color={fillColor} type="lion" />
    </svg>
  );
};

const OwlSVG = ({ placement }) => {
  const strokeColor = "#2C3E50";
  const strokeWidth = "2.5";
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <g transform="translate(5, 2.5)">
        <rect x="10" y="18" width="32" height="32" rx="16" fill="#8D6E63" stroke={strokeColor} strokeWidth={strokeWidth} />
        <ellipse cx="30" cy="35" rx="10" ry="11" fill="#D7CCC8" stroke={strokeColor} strokeWidth="1.5" />
        <polygon points="18,17 10,6 22,12" fill="#8D6E63" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
        <polygon points="42,17 50,6 38,12" fill="#8D6E63" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
        <circle cx="22" cy="25" r="6" fill="#FFF" stroke={strokeColor} strokeWidth={strokeWidth} />
        <circle className="ambient-eye" cx="22" cy="25" r="3.5" fill="#FFB300" />
        <circle cx="21" cy="24" r="1.5" fill={strokeColor} />
        <circle cx="22.2" cy="23.2" r="0.5" fill="#FFF" />
        <circle cx="38" cy="25" r="6" fill="#FFF" stroke={strokeColor} strokeWidth={strokeWidth} />
        <circle className="ambient-eye" cx="38" cy="25" r="3.5" fill="#FFB300" />
        <circle cx="37" cy="24" r="1.5" fill={strokeColor} />
        <circle cx="38.2" cy="23.2" r="0.5" fill="#FFF" />
        <polygon points="28.5,27 31.5,27 30,31.5" fill="#FF8F00" stroke={strokeColor} strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="15" cy="30" r="2.5" fill="#FF8A80" opacity="0.85" />
        <circle cx="45" cy="30" r="2.5" fill="#FF8A80" opacity="0.85" />
      </g>
      <Paws placement={placement} color="#FF8F00" type="owl" />
    </svg>
  );
};

const MonkeySVG = ({ placement }) => {
  const strokeColor = "#2C3E50";
  const strokeWidth = "2.5";
  const fillColor = "#8D6E63";
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <g transform="scale(0.85) translate(5, 0)">
        <circle cx="30" cy="30" r="15.5" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        <path d="M22 30 C 22 25 26 23 30 26 C 34 23 38 25 38 30 C 38 35 34 37 30 37 C 26 37 22 35 22 30 Z" fill="#D7CCC8" stroke={strokeColor} strokeWidth="1.5" />
        <circle cx="15" cy="28" r="4.5" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        <circle cx="45" cy="28" r="4.5" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        <circle className="ambient-eye" cx="26" cy="28" r="2.8" fill={strokeColor} />
        <circle cx="25.2" cy="27" r="0.8" fill="#FFF" />
        <circle className="ambient-eye" cx="34" cy="28" r="2.8" fill={strokeColor} />
        <circle cx="33.2" cy="27" r="0.8" fill="#FFF" />
        <path d="M28.5 33 Q30 34.5 31.5 33" stroke={strokeColor} strokeWidth="1.2" fill="none" />
        <circle cx="19" cy="31" r="2.5" fill="#FF8A80" opacity="0.85" />
        <circle cx="41" cy="31" r="2.5" fill="#FF8A80" opacity="0.85" />
      </g>
      <Paws placement={placement} color={fillColor} type="monkey" />
    </svg>
  );
};

// ========================================
// AMBIENT ANIMALS MAIN COMPONENT
// ========================================

const ANIMAL_TYPES = [
  'elephant', 'horse', 'cat', 'dog', 'cow', 
  'goat', 'sheep', 'mouse', 'fish', 'bird', 
  'crocodile', 'lion', 'owl', 'monkey'
];

export default function AmbientAnimals() {
  const [mounted, setMounted] = useState(false);
  const [activeAnimals, setActiveAnimals] = useState([]);
  
  const timeoutsRef = useRef({});
  const [scale, setScale] = useState(1);

  // Select random target, filtering occupied elements and selecting selectors based on type
  const selectRandomTarget = (occupied = [], selectors = []) => {
    if (typeof document === 'undefined') return null;

    const candidates = [];
    selectors.forEach(sel => {
      const els = document.querySelectorAll(sel);
      els.forEach(el => {
        if (occupied.includes(el)) return;

        const rect = el.getBoundingClientRect();
        const inViewport = (
          rect.top < window.innerHeight &&
          rect.bottom > 0 &&
          rect.left < window.innerWidth &&
          rect.right > 0 &&
          rect.width > 20 &&
          rect.height > 20
        );
        if (inViewport) {
          candidates.push({ el, sel });
        }
      });
    });

    if (candidates.length === 0) return null;
    const idx = Math.floor(Math.random() * candidates.length);
    return candidates[idx];
  };

  // Determine placement alignment based on animal type and target element selector
  const getPlacementForType = (type, selector) => {
    if (type === 'elephant') {
      return selector.includes('card')
        ? (Math.random() > 0.5 ? 'right' : 'left')
        : 'bottom-hanging';
    }
    if (type === 'crocodile') {
      return 'bottom-hanging';
    }
    if (type === 'monkey') {
      return 'bottom-hanging';
    }
    if (type === 'owl' || type === 'bird') {
      return 'top';
    }

    const isHeading = ['h2', 'h3'].includes(selector);
    if (isHeading) {
      return 'bottom-hanging';
    }
    return Math.random() > 0.5 ? 'left' : 'right';
  };

  // Trigger retreat animation, then remove animal from state
  const retreatAnimal = (animalId, retreatStatus) => {
    setActiveAnimals((prev) =>
      prev.map((a) => (a.id === animalId ? { ...a, status: retreatStatus } : a))
    );

    setTimeout(() => {
      setActiveAnimals((prev) => prev.filter((a) => a.id !== animalId));
      if (timeoutsRef.current[animalId]) {
        clearTimeout(timeoutsRef.current[animalId]);
        delete timeoutsRef.current[animalId];
      }
    }, 450);
  };

  // Handle startle trigger on hover
  const handleMouseEnter = (animalId) => {
    if (timeoutsRef.current[animalId]) {
      clearTimeout(timeoutsRef.current[animalId]);
      delete timeoutsRef.current[animalId];
    }
    retreatAnimal(animalId, 'startled');
  };

  // Handle happy dance spin on click
  const handleClick = (e, animalId) => {
    e.stopPropagation();
    if (timeoutsRef.current[animalId]) {
      clearTimeout(timeoutsRef.current[animalId]);
      delete timeoutsRef.current[animalId];
    }

    setActiveAnimals((prev) =>
      prev.map((item) => (item.id === animalId ? { ...item, status: 'happy' } : item))
    );

    setTimeout(() => {
      retreatAnimal(animalId, 'hiding');
    }, 600);
  };

  // Periodic spawn checker
  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setScale(window.innerWidth < 768 ? 0.65 : 1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const checkAndSpawn = () => {
      setActiveAnimals((prev) => {
        // CAPPED CONCURRENT ANIMALS AT 3
        if (prev.length >= 3) return prev;

        const occupied = prev.map((a) => a.target);
        const activeTypes = prev.map((a) => a.type);

        const availableTypes = ANIMAL_TYPES.filter((t) => !activeTypes.includes(t));
        if (availableTypes.length === 0) return prev;

        const type = availableTypes[Math.floor(Math.random() * availableTypes.length)];

        let selectors = [];
        if (type === 'fish') {
          selectors = ['.section-wave', '.craft__wave', '.personal-story__wave', '.milestones__wave'];
        } else {
          // TARGET ONLY CARD BOUNDARIES (NOT IMAGES, HEADINGS OR STANDALONE TEXT)
          selectors = [
            ...(type === 'monkey' ? ['h2', 'h3'] : []),
            '.card',
            '.craft__speciality-card',
            '.milestones__card',
            '.test__card',
            '.blog-card'
          ];
        }

        const targetData = selectRandomTarget(occupied, selectors);

        if (targetData) {
          let placement;
          let randomX = 0;

          if (type === 'fish') {
            placement = Math.random() > 0.5 ? 'fish-swim-left' : 'fish-swim-right';
            randomX = 0.15 + Math.random() * 0.7;
          } else {
            placement = getPlacementForType(type, targetData.sel);
          }

          const animalId = Math.random().toString();

          const isLarge = ['elephant', 'crocodile'].includes(type);
          const duration = isLarge
            ? (12000 + Math.random() * 6000)
            : (4000 + Math.random() * 3000);

          const retreatTimeout = setTimeout(() => {
            retreatAnimal(animalId, 'hiding');
          }, duration);

          timeoutsRef.current[animalId] = retreatTimeout;

          return [
            ...prev,
            {
              id: animalId,
              type,
              placement,
              status: 'peeking',
              target: targetData.el,
              randomX
            }
          ];
        }

        return prev;
      });
    };

    const spawnInterval = setInterval(checkAndSpawn, 1500);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(spawnInterval);
      Object.values(timeoutsRef.current).forEach(clearTimeout);
      timeoutsRef.current = {};
    };
  }, []);

  // requestAnimationFrame scroll tracker
  useEffect(() => {
    if (activeAnimals.length === 0) return;

    let animId;
    const updatePositions = () => {
      activeAnimals.forEach((animal) => {
        const animalEl = document.getElementById(`ambient-animal-${animal.id}`);
        const target = animal.target;
        if (target && animalEl) {
          const rect = target.getBoundingClientRect();
          let left = 0;
          let top = 0;

          if (animal.type === 'fish') {
            left = rect.left + animal.randomX * rect.width;
            top = rect.top + 20;
          } else {
            switch (animal.placement) {
              case 'top':
                left = rect.left + rect.width / 2;
                top = rect.top;
                break;
              case 'bottom-hanging':
                left = rect.left + rect.width / 2;
                top = rect.bottom;
                break;
              case 'left':
                left = rect.left;
                top = rect.top + rect.height / 2;
                break;
              case 'right':
                left = rect.right;
                top = rect.top + rect.height / 2;
                break;
              default:
                left = rect.left + rect.width / 2;
                top = rect.top;
            }
          }

          animalEl.style.left = `${left}px`;
          animalEl.style.top = `${top}px`;
        }
      });
      animId = requestAnimationFrame(updatePositions);
    };

    updatePositions();
    return () => cancelAnimationFrame(animId);
  }, [activeAnimals]);

  if (!mounted || typeof document === 'undefined') return null;

  const renderSVG = (type, placement) => {
    switch (type) {
      case 'elephant':
        return <ElephantSVG placement={placement} />;
      case 'horse':
        return <HorseSVG placement={placement} />;
      case 'cat':
        return <CatSVG placement={placement} />;
      case 'dog':
        return <DogSVG placement={placement} />;
      case 'cow':
        return <CowSVG placement={placement} />;
      case 'goat':
        return <GoatSVG placement={placement} />;
      case 'sheep':
        return <SheepSVG placement={placement} />;
      case 'mouse':
        return <MouseSVG placement={placement} />;
      case 'fish':
        return <FishSVG />;
      case 'bird':
        return <BirdSVG placement={placement} />;
      case 'crocodile':
        return <CrocodileSVG placement={placement} />;
      case 'lion':
        return <LionSVG placement={placement} />;
      case 'owl':
        return <OwlSVG placement={placement} />;
      case 'monkey':
        return <MonkeySVG placement={placement} />;
      default:
        return null;
    }
  };

  return createPortal(
    <div className="ambient-animals-container">
      {activeAnimals.map((animal) => {
        const isLarge = ['elephant', 'crocodile'].includes(animal.type);
        // ENHANCED AND SCALED SIZES: 1.6x for small, 2.5x for large
        const animalScale = isLarge ? 2.5 : 1.6;
        return (
          <div
            key={animal.id}
            id={`ambient-animal-${animal.id}`}
            className={`ambient-animal ambient-animal--${animal.type} ambient-animal--${animal.status} ambient-animal--${animal.placement}`}
            onMouseEnter={() => handleMouseEnter(animal.id)}
            onClick={(e) => handleClick(e, animal.id)}
            style={{
              '--scale-factor': scale * animalScale
            }}
          >
            {renderSVG(animal.type, animal.placement)}
          </div>
        );
      })}
    </div>,
    document.body
  );
}
