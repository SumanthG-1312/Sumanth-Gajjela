interface HeroImageProps {
  className?: string;
  isLarge?: boolean;
}

export default function HeroImage({ className = '', isLarge = true }: HeroImageProps) {
  // Direct static path to the project asset in public/
  const base = import.meta.env.BASE_URL || '/';
  const photoSrc = `${base.replace(/\/$/, '')}/professinal%20pic-800kb.jpeg`;

  return (
    <div
      className={`relative w-full h-full flex items-end justify-center overflow-hidden select-none pointer-events-none ${className}`}
    >
      {/* Pure black studio backdrop */}
      <div className="absolute inset-0 bg-black pointer-events-none" />

      {/* Hero Photo Container */}
      <div
        className={`relative z-10 w-full h-full flex items-end justify-center pointer-events-none animate-fade-in-scale animation-delay-200 transition-all duration-500 ${
          isLarge ? 'max-w-[780px] lg:max-w-[860px]' : 'max-w-[620px]'
        }`}
      >
        <img
          src={photoSrc}
          alt="Sumanth Gajjela"
          loading="eager"
          decoding="async"
          className={`w-full h-auto object-contain object-bottom filter contrast-[1.02] brightness-[1.01] origin-bottom transition-all duration-500 ${
            isLarge
              ? 'max-h-[96vh] scale-[1.08] lg:scale-[1.16]'
              : 'max-h-[92vh] scale-100'
          }`}
          style={{
            maskImage:
              'linear-gradient(to top, black 85%, transparent 100%), linear-gradient(to right, black 85%, transparent 100%)',
          }}
        />
      </div>

      {/* Subtle bottom edge gradient for smooth transition */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black via-black/80 to-transparent z-15 pointer-events-none" />
    </div>
  );
}
