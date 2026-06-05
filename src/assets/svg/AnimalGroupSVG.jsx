// Detailed SVG line-art illustration of grouped animals
// Used in LoadingScreen Variant 5 — draws itself with CSS animation

export default function AnimalGroupSVG({ className = '', showText = true }) {
  return (
    <svg
      className={className}
      viewBox={showText ? "0 0 440 520" : "0 0 440 395"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ═══ COW — top center ═══ */}
      <g className="animal-group animal-group--cow">
        {/* Horns */}
        <path className="draw-path draw-delay-1" d="M175 110 Q165 80 155 60 Q150 48 158 42 Q166 38 172 48 Q178 58 180 75" stroke="var(--earth-brown)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path className="draw-path draw-delay-1" d="M265 110 Q275 80 285 60 Q290 48 282 42 Q274 38 268 48 Q262 58 260 75" stroke="var(--earth-brown)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Ears */}
        <path className="draw-path draw-delay-2" d="M162 105 Q140 95 130 100 Q120 108 128 118 Q135 125 155 120" stroke="var(--earth-brown)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path className="draw-path draw-delay-2" d="M278 105 Q300 95 310 100 Q320 108 312 118 Q305 125 285 120" stroke="var(--earth-brown)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Head */}
        <path className="draw-path draw-delay-3" d="M160 110 Q160 90 180 82 Q200 75 220 75 Q240 75 260 82 Q280 90 280 110 Q282 130 275 145 Q268 155 255 162 Q240 168 220 168 Q200 168 185 162 Q172 155 165 145 Q158 130 160 110Z" stroke="var(--earth-brown)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Eyes */}
        <ellipse className="draw-path draw-delay-4" cx="195" cy="115" rx="6" ry="7" stroke="var(--earth-brown)" strokeWidth="2" />
        <circle className="draw-path draw-delay-4 fill-dot" cx="195" cy="115" r="3" fill="var(--earth-brown)" stroke="none" />
        <ellipse className="draw-path draw-delay-4" cx="245" cy="115" rx="6" ry="7" stroke="var(--earth-brown)" strokeWidth="2" />
        <circle className="draw-path draw-delay-4 fill-dot" cx="245" cy="115" r="3" fill="var(--earth-brown)" stroke="none" />
        {/* Nose/Muzzle */}
        <path className="draw-path draw-delay-5" d="M200 135 Q200 142 210 148 Q215 150 220 150 Q225 150 230 148 Q240 142 240 135 Q240 128 230 125 Q225 123 220 123 Q215 123 210 125 Q200 128 200 135Z" stroke="var(--earth-brown)" strokeWidth="2" strokeLinecap="round" />
        <ellipse className="draw-path draw-delay-5" cx="212" cy="138" rx="3" ry="4" stroke="var(--earth-brown)" strokeWidth="1.5" />
        <ellipse className="draw-path draw-delay-5" cx="228" cy="138" rx="3" ry="4" stroke="var(--earth-brown)" strokeWidth="1.5" />
        {/* Spots */}
        <path className="draw-path draw-delay-6" d="M175 95 Q180 88 190 90 Q195 95 190 100 Q183 102 175 95Z" stroke="var(--earth-brown)" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        <path className="draw-path draw-delay-6" d="M248 92 Q255 86 262 90 Q265 96 258 100 Q250 100 248 92Z" stroke="var(--earth-brown)" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      </g>

      {/* ═══ DOG — center front (largest) ═══ */}
      <g className="animal-group animal-group--dog">
        {/* Ears */}
        <path className="draw-path draw-delay-6" d="M145 220 Q125 195 118 210 Q110 230 120 250 Q128 260 140 255" stroke="var(--earth-brown)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path className="draw-path draw-delay-6" d="M295 220 Q315 195 322 210 Q330 230 320 250 Q312 260 300 255" stroke="var(--earth-brown)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Head */}
        <path className="draw-path draw-delay-7" d="M145 230 Q142 200 155 185 Q170 170 195 168 Q210 167 220 167 Q230 167 245 168 Q270 170 285 185 Q298 200 295 230 Q295 255 285 270 Q275 282 260 290 Q245 296 220 298 Q195 296 180 290 Q165 282 155 270 Q145 255 145 230Z" stroke="var(--earth-brown)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        {/* Eyes */}
        <ellipse className="draw-path draw-delay-8" cx="190" cy="225" rx="8" ry="9" stroke="var(--earth-brown)" strokeWidth="2" />
        <circle className="draw-path draw-delay-8 fill-dot" cx="192" cy="224" r="4.5" fill="var(--earth-brown)" stroke="none" />
        <circle className="draw-path draw-delay-8" cx="194" cy="222" r="1.5" fill="var(--cream)" stroke="none" />
        <ellipse className="draw-path draw-delay-8" cx="250" cy="225" rx="8" ry="9" stroke="var(--earth-brown)" strokeWidth="2" />
        <circle className="draw-path draw-delay-8 fill-dot" cx="248" cy="224" r="4.5" fill="var(--earth-brown)" stroke="none" />
        <circle className="draw-path draw-delay-8" cx="246" cy="222" r="1.5" fill="var(--cream)" stroke="none" />
        {/* Eyebrows */}
        <path className="draw-path draw-delay-8" d="M178 212 Q185 207 198 210" stroke="var(--earth-brown)" strokeWidth="1.5" strokeLinecap="round" />
        <path className="draw-path draw-delay-8" d="M262 212 Q255 207 242 210" stroke="var(--earth-brown)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Nose */}
        <path className="draw-path draw-delay-9" d="M212 248 Q215 242 220 240 Q225 242 228 248 Q228 254 220 258 Q212 254 212 248Z" stroke="var(--earth-brown)" strokeWidth="2" strokeLinecap="round" fill="var(--earth-brown)" />
        {/* Mouth — happy smile */}
        <path className="draw-path draw-delay-10" d="M220 258 L220 268" stroke="var(--earth-brown)" strokeWidth="2" strokeLinecap="round" />
        <path className="draw-path draw-delay-10" d="M200 268 Q210 280 220 278 Q230 280 240 268" stroke="var(--earth-brown)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Tongue */}
        <path className="draw-path draw-delay-11" d="M215 278 Q212 288 215 295 Q220 300 225 295 Q228 288 225 278" stroke="var(--earth-brown)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Collar */}
        <path className="draw-path draw-delay-12" d="M165 290 Q180 305 220 308 Q260 305 275 290" stroke="var(--earth-brown)" strokeWidth="3" strokeLinecap="round" />
        <circle className="draw-path draw-delay-12" cx="220" cy="308" r="5" stroke="var(--earth-brown)" strokeWidth="2" />
      </g>

      {/* ═══ CAT — left side ═══ */}
      <g className="animal-group animal-group--cat">
        {/* Ears (pointy) */}
        <path className="draw-path draw-delay-8" d="M92 175 L78 135 L108 160Z" stroke="var(--earth-brown)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path className="draw-path draw-delay-8" d="M85 147 L92 158" stroke="var(--earth-brown)" strokeWidth="1.2" strokeLinecap="round" />
        <path className="draw-path draw-delay-8" d="M128 170 L130 128 L150 158Z" stroke="var(--earth-brown)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path className="draw-path draw-delay-8" d="M133 140 L138 152" stroke="var(--earth-brown)" strokeWidth="1.2" strokeLinecap="round" />
        {/* Head */}
        <path className="draw-path draw-delay-9" d="M75 195 Q72 175 82 165 Q95 155 110 155 Q125 155 138 165 Q148 175 145 195 Q145 210 138 220 Q130 228 120 232 Q110 235 100 232 Q85 228 78 218 Q75 210 75 195Z" stroke="var(--earth-brown)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Eyes (almond) */}
        <path className="draw-path draw-delay-10" d="M88 190 Q93 183 100 190 Q93 197 88 190Z" stroke="var(--earth-brown)" strokeWidth="1.8" strokeLinecap="round" />
        <circle className="draw-path draw-delay-10 fill-dot" cx="94" cy="190" r="2.5" fill="var(--earth-brown)" stroke="none" />
        <path className="draw-path draw-delay-10" d="M118 190 Q123 183 130 190 Q123 197 118 190Z" stroke="var(--earth-brown)" strokeWidth="1.8" strokeLinecap="round" />
        <circle className="draw-path draw-delay-10 fill-dot" cx="124" cy="190" r="2.5" fill="var(--earth-brown)" stroke="none" />
        {/* Nose */}
        <path className="draw-path draw-delay-11" d="M106 202 Q110 199 114 202 Q112 206 110 208 Q108 206 106 202Z" stroke="var(--earth-brown)" strokeWidth="1.5" fill="var(--earth-brown)" />
        {/* Mouth */}
        <path className="draw-path draw-delay-11" d="M110 208 L110 212 Q105 216 100 214" stroke="var(--earth-brown)" strokeWidth="1.3" strokeLinecap="round" />
        <path className="draw-path draw-delay-11" d="M110 212 Q115 216 120 214" stroke="var(--earth-brown)" strokeWidth="1.3" strokeLinecap="round" />
        {/* Whiskers */}
        <path className="draw-path draw-delay-12" d="M98 205 L68 200" stroke="var(--earth-brown)" strokeWidth="1" strokeLinecap="round" />
        <path className="draw-path draw-delay-12" d="M96 210 L65 212" stroke="var(--earth-brown)" strokeWidth="1" strokeLinecap="round" />
        <path className="draw-path draw-delay-12" d="M122 205 L152 200" stroke="var(--earth-brown)" strokeWidth="1" strokeLinecap="round" />
        <path className="draw-path draw-delay-12" d="M124 210 L155 212" stroke="var(--earth-brown)" strokeWidth="1" strokeLinecap="round" />
      </g>

      {/* ═══ PIG — lower left ═══ */}
      <g className="animal-group animal-group--pig">
        {/* Ears */}
        <path className="draw-path draw-delay-10" d="M90 285 Q78 270 72 278 Q68 290 78 300" stroke="var(--earth-brown)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path className="draw-path draw-delay-10" d="M140 280 Q148 265 155 272 Q160 282 150 295" stroke="var(--earth-brown)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Head */}
        <path className="draw-path draw-delay-11" d="M78 310 Q72 290 80 280 Q90 270 110 268 Q130 270 140 280 Q148 290 142 310 Q140 325 132 335 Q125 342 110 344 Q95 342 88 335 Q80 325 78 310Z" stroke="var(--earth-brown)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Eyes */}
        <circle className="draw-path draw-delay-12 fill-dot" cx="95" cy="300" r="3.5" fill="var(--earth-brown)" stroke="none" />
        <circle className="draw-path draw-delay-12 fill-dot" cx="125" cy="300" r="3.5" fill="var(--earth-brown)" stroke="none" />
        {/* Snout */}
        <ellipse className="draw-path draw-delay-13" cx="110" cy="320" rx="15" ry="10" stroke="var(--earth-brown)" strokeWidth="2" />
        <ellipse className="draw-path draw-delay-13" cx="105" cy="320" rx="3" ry="4" stroke="var(--earth-brown)" strokeWidth="1.5" />
        <ellipse className="draw-path draw-delay-13" cx="115" cy="320" rx="3" ry="4" stroke="var(--earth-brown)" strokeWidth="1.5" />
        {/* Smile */}
        <path className="draw-path draw-delay-14" d="M100 335 Q110 342 120 335" stroke="var(--earth-brown)" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* ═══ RABBIT — upper left ═══ */}
      <g className="animal-group animal-group--rabbit">
        {/* Long ears */}
        <path className="draw-path draw-delay-4" d="M150 165 Q142 120 138 90 Q136 70 142 60 Q150 55 155 65 Q158 80 158 120 Q158 145 155 165" stroke="var(--earth-brown)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path className="draw-path draw-delay-4" d="M145 100 Q148 85 150 100" stroke="var(--earth-brown)" strokeWidth="1" strokeLinecap="round" />
        {/* Head */}
        <path className="draw-path draw-delay-5" d="M135 185 Q132 172 138 165 Q145 158 155 160 Q165 158 172 165 Q178 172 175 185 Q175 195 170 200 Q165 205 155 206 Q145 205 140 200 Q135 195 135 185Z" stroke="var(--earth-brown)" strokeWidth="1.8" strokeLinecap="round" />
        {/* Eyes */}
        <circle className="draw-path draw-delay-6 fill-dot" cx="147" cy="182" r="2.5" fill="var(--earth-brown)" stroke="none" />
        <circle className="draw-path draw-delay-6 fill-dot" cx="163" cy="182" r="2.5" fill="var(--earth-brown)" stroke="none" />
        {/* Nose */}
        <path className="draw-path draw-delay-6" d="M153 192 Q155 190 157 192 Q155 195 153 192Z" stroke="var(--earth-brown)" strokeWidth="1.2" fill="var(--earth-brown)" />
        {/* Whiskers */}
        <path className="draw-path draw-delay-7" d="M150 194 L135 192" stroke="var(--earth-brown)" strokeWidth="0.8" strokeLinecap="round" />
        <path className="draw-path draw-delay-7" d="M160 194 L175 192" stroke="var(--earth-brown)" strokeWidth="0.8" strokeLinecap="round" />
      </g>

      {/* ═══ DUCK — right side ═══ */}
      <g className="animal-group animal-group--duck">
        {/* Head */}
        <path className="draw-path draw-delay-7" d="M310 170 Q305 158 310 150 Q318 142 328 142 Q338 142 345 150 Q350 158 345 170 Q345 180 338 188 Q330 192 320 190 Q312 188 310 180Z" stroke="var(--earth-brown)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        {/* Eye */}
        <circle className="draw-path draw-delay-8 fill-dot" cx="330" cy="160" r="3" fill="var(--earth-brown)" stroke="none" />
        <circle className="draw-path draw-delay-8" cx="331" cy="159" r="1" fill="var(--cream)" stroke="none" />
        {/* Beak */}
        <path className="draw-path draw-delay-9" d="M340 172 Q355 170 360 175 Q358 180 345 178" stroke="var(--earth-brown)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        {/* Neck */}
        <path className="draw-path draw-delay-10" d="M315 190 Q310 205 312 220" stroke="var(--earth-brown)" strokeWidth="1.5" strokeLinecap="round" />
        <path className="draw-path draw-delay-10" d="M330 190 Q335 205 332 220" stroke="var(--earth-brown)" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* ═══ HORSE — upper right ═══ */}
      <g className="animal-group animal-group--horse">
        {/* Ear */}
        <path className="draw-path draw-delay-3" d="M322 105 L328 80 L338 100" stroke="var(--earth-brown)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        {/* Head */}
        <path className="draw-path draw-delay-4" d="M310 130 Q308 112 315 100 Q325 90 340 92 Q355 95 360 108 Q365 120 362 140 Q360 155 355 168 Q348 178 340 182 Q330 185 322 180 Q315 175 312 165 Q308 150 310 130Z" stroke="var(--earth-brown)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Eye */}
        <circle className="draw-path draw-delay-5 fill-dot" cx="335" cy="118" r="3.5" fill="var(--earth-brown)" stroke="none" />
        <circle className="draw-path draw-delay-5" cx="336" cy="117" r="1.2" fill="var(--cream)" stroke="none" />
        {/* Nostril */}
        <ellipse className="draw-path draw-delay-6" cx="338" cy="165" rx="4" ry="3" stroke="var(--earth-brown)" strokeWidth="1.5" />
        {/* Mouth */}
        <path className="draw-path draw-delay-6" d="M330 172 Q335 176 342 174" stroke="var(--earth-brown)" strokeWidth="1.2" strokeLinecap="round" />
        {/* Mane */}
        <path className="draw-path draw-delay-5" d="M315 95 Q305 88 308 100 Q300 95 305 108 Q298 105 302 118" stroke="var(--earth-brown)" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* ═══ CHICKEN — right, behind dog ═══ */}
      <g className="animal-group animal-group--chicken">
        {/* Comb */}
        <path className="draw-path draw-delay-11" d="M335 225 Q338 218 342 222 Q345 216 350 222 Q354 218 356 225" stroke="var(--earth-brown)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Head */}
        <path className="draw-path draw-delay-12" d="M330 240 Q328 228 335 225 Q342 222 350 225 Q358 228 356 240 Q355 250 348 255 Q342 258 338 255 Q332 250 330 240Z" stroke="var(--earth-brown)" strokeWidth="1.8" strokeLinecap="round" />
        {/* Eye */}
        <circle className="draw-path draw-delay-13 fill-dot" cx="343" cy="235" r="2" fill="var(--earth-brown)" stroke="none" />
        {/* Beak */}
        <path className="draw-path draw-delay-13" d="M350 242 L362 240 L352 247Z" stroke="var(--earth-brown)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Wing */}
        <path className="draw-path draw-delay-14" d="M332 258 Q325 270 328 285 Q340 290 350 282 Q355 272 348 260" stroke="var(--earth-brown)" strokeWidth="1.5" strokeLinecap="round" />
        <path className="draw-path draw-delay-14" d="M335 270 Q342 272 348 268" stroke="var(--earth-brown)" strokeWidth="1" strokeLinecap="round" />
      </g>

      {/* ═══ TURTLE — bottom right ═══ */}
      <g className="animal-group animal-group--turtle">
        {/* Head */}
        <path className="draw-path draw-delay-14" d="M310 345 Q308 335 312 328 Q318 322 325 325 Q330 330 328 340 Q325 348 318 350 Q312 350 310 345Z" stroke="var(--earth-brown)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Eye */}
        <circle className="draw-path draw-delay-15 fill-dot" cx="320" cy="334" r="1.5" fill="var(--earth-brown)" stroke="none" />
        {/* Shell */}
        <path className="draw-path draw-delay-15" d="M325 345 Q335 330 355 330 Q375 332 380 348 Q382 360 375 370 Q365 378 350 378 Q335 378 328 370 Q322 362 325 345Z" stroke="var(--earth-brown)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Shell pattern */}
        <path className="draw-path draw-delay-16" d="M340 338 Q350 332 360 338" stroke="var(--earth-brown)" strokeWidth="1" strokeLinecap="round" />
        <path className="draw-path draw-delay-16" d="M335 355 Q350 345 365 355" stroke="var(--earth-brown)" strokeWidth="1" strokeLinecap="round" />
        <path className="draw-path draw-delay-16" d="M350 335 L350 370" stroke="var(--earth-brown)" strokeWidth="1" strokeLinecap="round" />
        {/* Legs */}
        <path className="draw-path draw-delay-16" d="M332 372 Q328 382 332 385" stroke="var(--earth-brown)" strokeWidth="1.2" strokeLinecap="round" />
        <path className="draw-path draw-delay-16" d="M368 372 Q372 382 368 385" stroke="var(--earth-brown)" strokeWidth="1.2" strokeLinecap="round" />
      </g>

      {/* ═══ CHICK — small, bottom right ═══ */}
      <g className="animal-group animal-group--chick">
        <path className="draw-path draw-delay-15" d="M290 330 Q288 320 292 315 Q298 310 305 312 Q310 316 308 325 Q308 332 302 336 Q296 338 290 330Z" stroke="var(--earth-brown)" strokeWidth="1.3" strokeLinecap="round" />
        <circle className="draw-path draw-delay-15 fill-dot" cx="298" cy="322" r="1.5" fill="var(--earth-brown)" stroke="none" />
        <path className="draw-path draw-delay-16" d="M304 324 L310 322 L305 327" stroke="var(--earth-brown)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        {/* Body */}
        <path className="draw-path draw-delay-16" d="M292 336 Q285 345 290 355 Q298 362 308 358 Q315 350 312 338" stroke="var(--earth-brown)" strokeWidth="1.3" strokeLinecap="round" />
        {/* Feet */}
        <path className="draw-path draw-delay-16" d="M295 355 L292 365 M295 365 L288 365 M295 365 L300 365" stroke="var(--earth-brown)" strokeWidth="1" strokeLinecap="round" />
      </g>

      {/* ═══ SHEEP — center, peeking between cow and dog ═══ */}
      <g className="animal-group animal-group--sheep">
        {/* Fluffy head (wool curls) */}
        <path className="draw-path draw-delay-5" d="M200 180 Q195 172 200 168 Q208 165 212 170 Q218 165 225 168 Q230 172 228 178 Q232 182 228 188 Q225 192 218 192 Q212 195 208 192 Q202 190 200 185Z" stroke="var(--earth-brown)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Face */}
        <path className="draw-path draw-delay-6" d="M205 182 Q205 177 210 175 Q215 174 220 175 Q225 177 225 182 Q225 188 220 192 Q215 194 210 192 Q205 188 205 182Z" stroke="var(--earth-brown)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Eyes */}
        <circle className="draw-path draw-delay-7 fill-dot" cx="212" cy="182" r="1.5" fill="var(--earth-brown)" stroke="none" />
        <circle className="draw-path draw-delay-7 fill-dot" cx="222" cy="182" r="1.5" fill="var(--earth-brown)" stroke="none" />
        {/* Nose */}
        <path className="draw-path draw-delay-7" d="M215 188 Q217 190 219 188" stroke="var(--earth-brown)" strokeWidth="1" strokeLinecap="round" />
      </g>

      {/* ═══ CHEF AKANKSHA TEXT ═══ */}
      {showText && (
        <g className="chef-text-group">
          <text className="draw-text" x="220" y="440" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="38" fontWeight="600" fontStyle="italic" fill="none" stroke="var(--dark-brown)" strokeWidth="1">Chef Akanksha</text>
          <text className="draw-text-fill" x="220" y="440" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="38" fontWeight="600" fontStyle="italic" fill="var(--dark-brown)" stroke="none">Chef Akanksha</text>
          {/* Leaf accent */}
          <path className="draw-accent" d="M290 430 Q298 420 305 425 Q300 432 290 430Z" stroke="var(--olive-green)" strokeWidth="1.2" fill="var(--olive-green)" opacity="0.6" />
          <text className="draw-tagline" x="220" y="465" textAnchor="middle" fontFamily="'Caveat', cursive" fontSize="16" fill="var(--earth-brown)">Good for you. Kind for them.</text>
        </g>
      )}
    </svg>
  );
}
