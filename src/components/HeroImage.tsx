import { useState, useEffect, useRef } from 'react';
import { Camera, Upload, RotateCcw } from 'lucide-react';

interface HeroImageProps {
  className?: string;
  isFlipped?: boolean;
  isLarge?: boolean;
}

export default function HeroImage({ className = '', isFlipped = false, isLarge = false }: HeroImageProps) {
  const base = import.meta.env.BASE_URL || './';
  const defaultPortrait = `${base.replace(/\/$/, '')}/default-portrait.svg`;
  const [photoSrc, setPhotoSrc] = useState<string>(defaultPortrait);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [hasCustomPhoto, setHasCustomPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check localStorage and standard paths on mount
  useEffect(() => {
    const saved = localStorage.getItem('sumanth_portfolio_photo');
    if (saved) {
      setPhotoSrc(saved);
      setHasCustomPhoto(true);
      return;
    }

    // Try checking if professinal pic.png or sumanth.png exists in public
    const imgTest = new Image();
    imgTest.src = `${base.replace(/\/$/, '')}/professinal%20pic.png`;
    imgTest.onload = () => {
      setPhotoSrc(`${base.replace(/\/$/, '')}/professinal%20pic.png`);
      setHasCustomPhoto(true);
    };
    imgTest.onerror = () => {
      const imgTest2 = new Image();
      imgTest2.src = `${base.replace(/\/$/, '')}/sumanth.png`;
      imgTest2.onload = () => {
        setPhotoSrc(`${base.replace(/\/$/, '')}/sumanth.png`);
        setHasCustomPhoto(true);
      };
      imgTest2.onerror = () => {
        // Fallback to default SVG likeness
        setPhotoSrc(defaultPortrait);
      };
    };
  }, [base, defaultPortrait]);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setPhotoSrc(result);
        setHasCustomPhoto(true);
        try {
          localStorage.setItem('sumanth_portfolio_photo', result);
        } catch {
          // localStorage quota exceeded for very large images
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.removeItem('sumanth_portfolio_photo');
    setPhotoSrc(defaultPortrait);
    setHasCustomPhoto(false);
  };

  return (
    <div
      className={`relative w-full h-full flex items-end justify-center overflow-hidden group select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      {/* Black studio backdrop with subtle radial depth */}
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

      {/* Hidden file input for photo upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0]);
          }
        }}
      />

      {/* Drag & Drop overlay */}
      {isDragOver && (
        <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-xs flex flex-col items-center justify-center border-2 border-dashed border-white/60 p-6 text-center text-white">
          <Upload className="w-12 h-12 mb-3 animate-bounce text-white" />
          <p className="text-lg font-bold">Drop your photo here</p>
          <p className="text-sm text-neutral-400 mt-1">Accepts PNG, JPG, WebP</p>
        </div>
      )}

      {/* Discreet Photo Controls Tooltip/Pill (appears on hover) */}
      <div
        className={`absolute bottom-6 right-6 z-20 transition-all duration-300 pointer-events-auto ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2 bg-neutral-900/90 backdrop-blur-md border border-neutral-700/70 shadow-2xl rounded-full px-3.5 py-1.5 text-xs text-neutral-300">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer py-1"
            title="Upload or replace photo with professinal pic.png"
          >
            <Camera className="w-3.5 h-3.5 text-neutral-400" />
            <span>{hasCustomPhoto ? 'Replace Photo' : 'Upload Your Photo'}</span>
          </button>

          {hasCustomPhoto && (
            <>
              <span className="text-neutral-600">|</span>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 hover:text-red-400 transition-colors cursor-pointer p-1"
                title="Reset to default portrait"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
