import { useState, useEffect } from 'react';

interface HeroImageProps {
  className?: string;
  isFlipped?: boolean;
  isLarge?: boolean;
}

export default function HeroImage({ className = '', isFlipped = false, isLarge = false }: HeroImageProps) {
  const base = import.meta.env.BASE_URL || './';
  const defaultPortrait = `${base.replace(/\/$/, '')}/default-portrait.svg`;
  const [photoSrc, setPhotoSrc] = useState<string>(defaultPortrait);

  // Automatically check if user's uploaded photo or high-res image is in public
  useEffect(() => {
    // If the user has a saved photo in localStorage, prefer that; otherwise use default likeness
    const saved = localStorage.getItem('sumanth_portfolio_photo');
    if (saved) {
      setPhotoSrc(saved);
      return;
    }

    // Try checking if user placed professinal pic.png or sumanth.png or photo.jpeg in public
    const candidatePaths = [
      `${base.replace(/\/$/, '')}/professinal%20pic-800kb.jpeg`,
      `${base.replace(/\/$/, '')}/professinal%20pic.png`,
      `${base.replace(/\/$/, '')}/professinal-pic.png`,
      `${base.replace(/\/$/, '')}/sumanth.png`,
      `${base.replace(/\/$/, '')}/sumanth.jpg`,
    ];

    let found = false;
    for (const path of candidatePaths) {
      const img = new Image();
      img.src = path;
      img.onload = () => {
        if (!found) {
          found = true;
          setPhotoSrc(path);
        }
      };
    }
  }, [base, defaultPortrait]);

  return (
    <div
      className={`relative w-full h-full flex items-end justify-center overflow-hidden select-none pointer-events-none ${className}`}
    >
      {/* Pure black studio backdrop */}
      <div className="absolute inset-0 bg-black pointer-events-none" />

      {/* Main Hero Photo Container with entrance animation */}
      <div
        className={`relative z-10 w-full h-full flex items-end justify-center pointer-events-none animate-fade-in-scale animation-delay-200 transition-all duration-500 ${
          isLarge ? 'max-w-[780px] lg:max-w-[860px]' : 'max-w-[620px]'
        }`}
      >
        <img
          src={photoSrc}
          alt="Sumanth Gajjela"
          referrerPolicy="no-referrer"
          className={`w-full h-auto object-contain object-bottom filter contrast-[1.02] brightness-[1.01] origin-bottom transition-all duration-500 ${
            isLarge
              ? 'max-h-[96vh] scale-[1.08] lg:scale-[1.16]'
              : 'max-h-[92vh] scale-100'
          } ${isFlipped ? 'scale-x-[-1]' : ''}`}
          style={{
            // Blend seamlessly into black background
            maskImage:
              'linear-gradient(to top, black 85%, transparent 100%), linear-gradient(to right, black 85%, transparent 100%)',
          }}
        />
      </div>

      {/* Subtle bottom edge gradient to ensure 100% black transition at base */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black via-black/80 to-transparent z-15 pointer-events-none" />
    </div>
  );
}
