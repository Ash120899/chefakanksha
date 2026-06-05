// ========================================
// SVG ICON COMPONENTS
// ========================================
import React from 'react';

// --- Paw Print SVG ---
export const PawPrintSVG = ({ size = 24, color = 'currentColor', className = '', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill={color} className={className} style={style}>
    <ellipse cx="22" cy="14" rx="7" ry="9" />
    <ellipse cx="42" cy="14" rx="7" ry="9" />
    <ellipse cx="12" cy="30" rx="6" ry="8" />
    <ellipse cx="52" cy="30" rx="6" ry="8" />
    <path d="M32 28c-8 0-16 6-18 14-2 8 2 14 10 16 4 1 6-2 8-2s4 3 8 2c8-2 12-8 10-16-2-8-10-14-18-14z" />
  </svg>
);

// --- Kitten Paw Print ---
export const KittenPawSVG = ({ size = 18, color = 'currentColor', className = '', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill={color} className={className} style={style}>
    <ellipse cx="16" cy="10" rx="5" ry="6" />
    <ellipse cx="32" cy="10" rx="5" ry="6" />
    <ellipse cx="9" cy="22" rx="4" ry="5.5" />
    <ellipse cx="39" cy="22" rx="4" ry="5.5" />
    <path d="M24 22c-6 0-12 4.5-13.5 10.5-1.5 6 1.5 10.5 7.5 12 3 .75 4.5-1.5 6-1.5s3 2.25 6 1.5c6-1.5 9-6 7.5-12C36 26.5 30 22 24 22z" />
  </svg>
);

// --- Cow Hoof Print ---
export const HoofPrintSVG = ({ size = 24, color = 'currentColor', className = '', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill={color} className={className} style={style}>
    <path d="M12 8c0 0 2 16 4 20s8 8 8 8-4-4-4-16S12 8 12 8z" />
    <path d="M36 8c0 0-2 16-4 20s-8 8-8 8 4-4 4-16S36 8 36 8z" />
  </svg>
);
// --- Goat Hoof Print ---
export const GoatPrintSVG = ({ size = 24, color = 'currentColor', className = '', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className} style={style}>
    <path d="M10.5 4c-.5 0-2 2-2.5 5.5s.2 8.5 2 9.5c.3-1.5 0-5.5.5-9s1.5-5 0-6z" />
    <path d="M13.5 4c.5 0 2 2 2.5 5.5s-.2 8.5-2 9.5c-.3-1.5 0-5.5-.5-9s-1.5-5 0-6z" />
  </svg>
);

// --- Horse Hoof Print ---
export const HorsePrintSVG = ({ size = 24, color = 'currentColor', className = '', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className} style={style}>
    <path d="M12 2C6.5 2 3.5 5.5 3.5 11c0 4.5 2.5 8 5.5 9 1 0 1.5-1 1.5-2.5 0-1-.5-2.5-.5-3.5 0-1.5 1-2.5 2-2.5s2 1 2 2.5c0 1-.5 2.5-.5 3.5 0 1.5.5 2.5 1.5 2.5 3-1 5.5-4.5 5.5-9 0-5.5-3-9-8.5-9z" />
  </svg>
);

// --- Duck Foot Print ---
export const DuckPrintSVG = ({ size = 24, color = 'currentColor', className = '', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className} style={style}>
    <path d="M12 21c-.8 0-1.5-.8-2-2.5C8 13.5 5 11.5 2.5 10c2.5.5 5.5 2 7.5 4 .5-3 1-7.5 2-9 1 1.5 1.5 6 2 9 2-2 5-3.5 7.5-4-2.5 1.5-5.5 3.5-7.5 8.5-.5 1.7-1.2 2.5-2 2.5z" />
  </svg>
);

// --- Leaf SVG ---
export const LeafSVG = ({ size = 32, color = 'currentColor', className = '', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2" className={className} style={style}>
    <path d="M32 56C32 56 8 40 8 24C8 8 32 4 32 4C32 4 56 8 56 24C56 40 32 56 32 56Z" fill={color} opacity="0.2" />
    <path d="M32 56V4" strokeLinecap="round" />
    <path d="M32 20C26 16 20 16 16 18" strokeLinecap="round" />
    <path d="M32 28C38 24 44 24 48 26" strokeLinecap="round" />
    <path d="M32 36C26 32 18 33 14 36" strokeLinecap="round" />
    <path d="M32 44C38 40 46 41 50 44" strokeLinecap="round" />
  </svg>
);

// --- Heart SVG ---
export const HeartSVG = ({ size = 24, color = 'currentColor', filled = false, className = '', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth="2" className={className} style={style}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// --- Star SVG ---
export const StarSVG = ({ size = 20, color = '#D4AF37', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

// --- Leaf Branch Divider ---
export const LeafBranchSVG = ({ width = 200, color = 'currentColor', className = '' }) => (
  <svg width={width} height="32" viewBox="0 0 200 32" fill="none" stroke={color} strokeWidth="1.5" className={className}>
    <path d="M0 16 Q50 16 100 16 Q150 16 200 16" strokeLinecap="round" />
    <path d="M70 16 Q60 8 50 6" strokeLinecap="round" />
    <path d="M75 16 Q65 8 55 5" strokeLinecap="round" fill={color} opacity="0.3" />
    <path d="M90 16 Q80 24 70 26" strokeLinecap="round" />
    <path d="M95 16 Q85 24 75 27" strokeLinecap="round" fill={color} opacity="0.3" />
    <path d="M120 16 Q110 8 100 5" strokeLinecap="round" />
    <path d="M125 16 Q115 8 105 4" strokeLinecap="round" fill={color} opacity="0.3" />
    <path d="M140 16 Q130 24 120 27" strokeLinecap="round" />
    <path d="M145 16 Q135 24 125 28" strokeLinecap="round" fill={color} opacity="0.3" />
    <circle cx="100" cy="16" r="3" fill={color} opacity="0.4" />
  </svg>
);

// --- Vegan Badge SVG ---
export const VeganBadgeSVG = ({ size = 80, className = '', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} style={style}>
    <circle cx="50" cy="50" r="46" fill="#A3B899" opacity="0.15" stroke="#6B7F5E" strokeWidth="2" />
    <circle cx="50" cy="50" r="38" fill="none" stroke="#6B7F5E" strokeWidth="1" strokeDasharray="4 3" />
    <text x="50" y="38" textAnchor="middle" fill="#5C4A32" fontFamily="'Playfair Display', serif" fontSize="14" fontWeight="600">100%</text>
    <text x="50" y="56" textAnchor="middle" fill="#6B7F5E" fontFamily="'Lato', sans-serif" fontSize="11" fontWeight="700" letterSpacing="2">VEGAN</text>
    <path d="M42 66 Q46 62 50 66 Q54 62 58 66" fill="none" stroke="#7A9E6D" strokeWidth="1.5" strokeLinecap="round" />
    <ellipse cx="50" cy="70" rx="3" ry="2" fill="#7A9E6D" opacity="0.5" />
  </svg>
);

// --- UI Icons ---
export const icons = {
  heart: (size = 20) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
  ),
  leaf: (size = 20) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8-2.5 5-5.5 7.5-10 10z" /><path d="M2 21c0-3 1.5-5.5 4-8.5" /></svg>
  ),
  sparkles: (size = 20) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" /><path d="M19 15l.5 2 2 .5-2 .5-.5 2-.5-2-2-.5 2-.5.5-2z" /></svg>
  ),
  globe: (size = 20) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
  ),
  mail: (size = 20) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 6L2 7" /></svg>
  ),
  phone: (size = 20) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
  ),
  location: (size = 20) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
  ),
  calendar: (size = 20) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
  ),
  recycle: (size = 20) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" /><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" /><path d="M14 16l3 3 3-3" /><path d="M8.293 13.596L4.875 9.5l3.418-4.096" /><path d="M15.707 13.596L19.125 9.5l-3.418-4.096" /><path d="M12 2l3.5 6.042" /><path d="M12 2L8.5 8.042" /></svg>
  ),
  fire: (size = 20) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>
  ),
  utensils: (size = 20) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" /></svg>
  ),
  lotus: (size = 20) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20c-4-4-8-6-8-10a4 4 0 0 1 8 0" /><path d="M12 20c4-4 8-6 8-10a4 4 0 0 0-8 0" /><path d="M12 20c-2-2-4-4-4-8a4 4 0 0 1 4-4" /><path d="M12 20c2-2 4-4 4-8a4 4 0 0 0-4-4" /></svg>
  ),
  plate: (size = 20) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
  ),
  cloud: (size = 20) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /></svg>
  ),
  droplet: (size = 20) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>
  ),
  arrow: (size = 20) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
  ),
  menu: (size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
  ),
  close: (size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
  ),
  instagram: (size = 20) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
  ),
  facebook: (size = 20) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-6a4 4 0 0 0-4 4v4H4v6h4v8h4v-8h4l2-6h-6V6a2 2 0 0 1 2-2h2z" /></svg>
  ),
  linkedin: (size = 20) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /></svg>
  ),
  youtube: (size = 20) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
  ),
  twitter: (size = 20) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768M13.232 10.232L20 4" /></svg>
  ),
  send: (size = 20) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
  ),
  chevronDown: (size = 20) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
  ),
};

// --- Animal outline SVGs for loading screen line-draw animation ---
export const animalOutlines = {
  dog: "M20 35 Q15 30 12 25 Q10 22 8 20 Q5 17 4 14 Q3 10 5 7 Q7 4 11 4 Q14 4 16 6 Q18 8 19 11 Q20 14 22 16 Q24 14 25 11 Q26 8 28 6 Q30 4 33 4 Q37 4 39 7 Q41 10 40 14 Q39 17 36 20 Q34 22 32 25 Q29 30 24 35 Q22 37 20 35Z M15 15 Q14 14 14 13 Q14 12 15 12 Q16 12 16 13 Q16 14 15 15Z M29 15 Q28 14 28 13 Q28 12 29 12 Q30 12 30 13 Q30 14 29 15Z M19 20 Q20 22 22 22 Q24 22 25 20 M22 22 L22 25 Q20 28 18 27 M22 25 Q24 28 26 27",

  cat: "M12 8 L8 2 L6 8 Q4 12 4 16 Q4 22 8 26 Q12 30 16 32 Q20 34 24 34 Q28 34 32 32 Q36 30 40 26 Q44 22 44 16 Q44 12 42 8 L40 2 L36 8 Q34 6 30 5 Q26 4 22 4 Q18 4 14 5 Q12 6 12 8Z M16 16 Q15 15 15 14 Q15 13 16 13 Q17 13 17 14 Q17 15 16 16Z M32 16 Q31 15 31 14 Q31 13 32 13 Q33 13 33 14 Q33 15 32 16Z M22 20 Q23 21 24 21 Q25 21 26 20 M24 21 L24 23 M20 24 Q22 26 24 26 Q26 26 28 24 M10 26 Q6 28 4 30 M38 26 Q42 28 44 30",

  cow: "M8 18 Q6 14 6 10 Q6 6 10 6 L12 2 L14 8 Q18 6 24 6 Q30 6 34 8 L36 2 L38 6 Q42 6 42 10 Q42 14 40 18 Q42 22 42 26 Q42 32 38 36 Q34 40 28 40 L20 40 Q14 40 10 36 Q6 32 6 26 Q6 22 8 18Z M16 18 Q14 16 14 14 Q14 12 16 12 Q18 12 18 14 Q18 16 16 18Z M32 18 Q30 16 30 14 Q30 12 32 12 Q34 12 34 14 Q34 16 32 18Z M20 24 Q22 26 24 26 Q26 26 28 24 M18 30 Q20 34 24 34 Q28 34 30 30",

  pig: "M14 12 Q10 12 8 14 Q4 16 4 20 Q4 24 6 26 Q8 28 12 30 Q16 32 22 32 Q28 32 32 30 Q36 28 38 26 Q40 24 40 20 Q40 16 36 14 Q34 12 30 12 Q28 10 26 8 Q24 6 22 6 Q20 6 18 8 Q16 10 14 12Z M14 18 Q13 17 13 16 Q13 15 14 15 Q15 15 15 16 Q15 17 14 18Z M30 18 Q29 17 29 16 Q29 15 30 15 Q31 15 31 16 Q31 17 30 18Z M18 22 Q20 24 22 24 Q24 24 26 22 M20 26 Q20 27 21 27 M24 26 Q24 27 23 27 M8 14 L4 10 M36 14 L40 10",

  chicken: "M24 8 Q20 8 18 10 Q16 12 16 16 Q16 20 18 22 Q14 22 12 24 Q10 26 10 30 Q10 34 14 36 Q18 38 24 38 Q30 38 34 36 Q38 34 38 30 Q38 26 36 24 Q34 22 30 22 Q32 20 32 16 Q32 12 30 10 Q28 8 24 8Z M22 14 Q21 13 22 12 Q23 12 23 13 Q23 14 22 14Z M16 14 Q14 12 12 12 Q10 12 10 14 M22 18 Q24 20 26 18 M20 28 L16 38 M28 28 L32 38",
};
