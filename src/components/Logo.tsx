interface LogoProps {
  theme?: 'dark' | 'light' | 'auto';
  className?: string;
  showText?: boolean;
  onClick?: () => void;
}

export default function Logo({
  theme = 'dark',
  className = '',
  showText = false,
  onClick,
}: LogoProps) {
  // theme === 'light' means the logo itself should be light (white) for rendering on a dark background.
  // theme === 'dark' means the logo should be dark (#111827) for rendering on a light/gray background.
  const strokeColor = theme === 'light' ? '#FFFFFF' : '#111827';
  const textColor = theme === 'light' ? 'text-white' : 'text-neutral-900';
  const subtextColor = theme === 'light' ? 'text-neutral-400' : 'text-neutral-500';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none group cursor-pointer ${className}`}
      title="Sumanth Gajjela - Home"
      role="banner"
      aria-label="Sumanth Gajjela Logo"
    >
      {/* Geometric SG Monogram Icon matching Tomasz Gajda's precision style */}
      <div className="relative flex items-center justify-center">
        <svg
          className="w-10 h-10 md:w-11 md:h-11 transition-all duration-300 group-hover:scale-105 group-hover:rotate-1"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Outer geometric shield / angular frame */}
          <path
            d="M 20 28 L 50 12 L 80 28 L 80 72 L 50 88 L 20 72 Z"
            stroke={strokeColor}
            strokeWidth="7"
            strokeLinejoin="round"
          />

          {/* Inner geometric 'S' & 'G' interlocking lines */}
          {/* Top bar and spine of S */}
          <path
            d="M 68 32 L 35 32 L 35 48 L 65 52 L 65 68 L 32 68"
            stroke={strokeColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Accent notch for G */}
          <path
            d="M 52 68 L 52 56 L 65 56"
            stroke={strokeColor}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`font-bold tracking-tight text-sm uppercase ${textColor}`}>
            Sumanth Gajjela
          </span>
          <span className={`text-[10px] font-mono tracking-widest uppercase ${subtextColor}`}>
            Portfolio
          </span>
        </div>
      )}
    </div>
  );
}
