/* Ilustraciones de línea fina, dibujadas a mano en SVG para no depender de imágenes. */

interface SvgProps {
  className?: string
}

export function OliveBranch({ className = '' }: SvgProps) {
  return (
    <svg viewBox="0 0 220 60" fill="none" aria-hidden className={className}>
      <path d="M6 44C60 30 120 24 214 30" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {[28, 58, 88, 118, 148, 178].map((x, i) => (
        <g key={x}>
          <path
            d={`M${x} ${40 - i * 1.6}c6-12 18-16 26-14-4 9-14 15-26 14z`}
            fill="currentColor"
            opacity={0.55}
          />
          <path
            d={`M${x + 10} ${38 - i * 1.4}c10 2 18 10 20 18-10 0-18-6-20-18z`}
            fill="currentColor"
            opacity={0.35}
          />
        </g>
      ))}
    </svg>
  )
}

export function DiaperIllustration({ className = '' }: SvgProps) {
  return (
    <svg viewBox="0 0 160 120" fill="none" aria-hidden className={className}>
      <ellipse cx="80" cy="108" rx="54" ry="6" fill="#3B2A22" opacity=".08" />
      <path
        d="M18 30h124c4 0 7 3 6 7-4 30-22 58-50 64l-2 1H64l-2-1C34 95 16 67 12 37c-1-4 2-7 6-7z"
        fill="#FBF6EF"
        stroke="#6B4A3A"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M12 38c16 4 36 6 68 6s52-2 68-6" stroke="#6B4A3A" strokeWidth="2" strokeLinecap="round" />
      <rect x="10" y="26" width="26" height="16" rx="5" fill="#D4A5A0" stroke="#6B4A3A" strokeWidth="2" />
      <rect x="124" y="26" width="26" height="16" rx="5" fill="#D4A5A0" stroke="#6B4A3A" strokeWidth="2" />
      <path d="M56 62c6 26 14 34 24 34s18-8 24-34" stroke="#C4A484" strokeWidth="2" strokeDasharray="3 5" strokeLinecap="round" />
      <path d="M80 66c-5-6-14-2-10 5l10 9 10-9c4-7-5-11-10-5z" fill="#D4A5A0" />
    </svg>
  )
}

export function WipesIllustration({ className = '' }: SvgProps) {
  return (
    <svg viewBox="0 0 160 120" fill="none" aria-hidden className={className}>
      <ellipse cx="80" cy="110" rx="58" ry="6" fill="#3B2A22" opacity=".08" />
      <rect x="18" y="38" width="124" height="68" rx="20" fill="#FBF6EF" stroke="#6B4A3A" strokeWidth="2.5" />
      <rect x="50" y="30" width="60" height="26" rx="10" fill="#9DB0BD" stroke="#6B4A3A" strokeWidth="2.5" />
      <path d="M58 44c8-24 30-30 44-18" stroke="#6B4A3A" strokeWidth="2" strokeLinecap="round" />
      <path d="M68 40c6-12 20-18 30-14l-6 14" fill="#fff" stroke="#6B4A3A" strokeWidth="2" strokeLinejoin="round" />
      <path d="M34 78h92M34 90h60" stroke="#C4A484" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 6" />
      <circle cx="120" cy="88" r="7" fill="#9DB0BD" opacity=".6" />
      <circle cx="42" cy="62" r="4" fill="#7D8461" opacity=".5" />
    </svg>
  )
}

export function WaxSeal({ className = '' }: SvgProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className}>
      <defs>
        <radialGradient id="seal" cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#CB7A52" />
          <stop offset="1" stopColor="#8F4A2A" />
        </radialGradient>
      </defs>
      <path
        d="M50 4c8 0 10 6 17 8s13-1 17 6-1 12 1 19 9 10 7 18-9 8-12 15-1 13-8 17-12-2-19 0-11 9-19 7-8-9-15-12-13 0-17-7 1-12-1-19-9-10-7-18 9-8 12-15 1-13 8-17 12 2 19 0S42 4 50 4z"
        fill="url(#seal)"
      />
      <circle cx="50" cy="50" r="28" fill="none" stroke="#F3E9DA" strokeOpacity=".45" strokeWidth="1.5" />
      <text x="50" y="62" textAnchor="middle" fontFamily="Cormorant Garamond, Georgia, serif" fontStyle="italic" fontSize="36" fill="#F7F1E8">
        ?
      </text>
    </svg>
  )
}
