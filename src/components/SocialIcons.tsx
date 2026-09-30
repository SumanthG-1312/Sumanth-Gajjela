import { useState } from 'react';
import { Check } from 'lucide-react';

interface SocialIconsProps {
  onOpenContact?: () => void;
  darkBackground?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function SocialIcons({
  onOpenContact,
  darkBackground = false,
  className = '',
  size = 'md',
}: SocialIconsProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleEmailClick = (e: React.MouseEvent) => {
    // If alt/option or meta key is held, copy email directly to clipboard with visual feedback
    if (e.altKey || e.metaKey) {
      e.preventDefault();
      navigator.clipboard.writeText('sumanthgajjela@gmail.com').then(() => {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      });
      return;
    }

    // Default: trigger contact modal if provided
    if (onOpenContact) {
      e.preventDefault();
      onOpenContact();
    }
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 md:w-11 md:h-11 text-sm',
    lg: 'w-12 h-12 text-base',
  }[size];

  const socials = [
    {
      name: 'Email',
      href: 'mailto:sumanthgajjela@gmail.com',
      onClick: handleEmailClick,
      icon: copiedEmail ? (
        <Check className="w-4 h-4 text-emerald-400 animate-in zoom-in-75" />
      ) : (
        <span className="font-bold text-lg leading-none font-mono">@</span>
      ),
      label: copiedEmail ? 'Copied to clipboard!' : 'Email: sumanthgajjela@gmail.com',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/SumanthG-1312',
      icon: (
        <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      ),
      label: 'GitHub: @SumanthG-1312',
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sumanth-gajjela/',
      icon: (
        <span className="font-bold text-sm tracking-tight leading-none">in</span>
      ),
      label: 'LinkedIn: /in/sumanth-gajjela',
    },
    {
      name: 'X',
      href: 'https://x.com/SumanthG1312',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      label: 'X: @SumanthG1312',
    },
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target={social.href.startsWith('mailto:') ? '_self' : '_blank'}
          rel="noopener noreferrer"
          onClick={social.onClick}
          title={social.label}
          aria-label={social.label}
          className={`${sizeClasses} rounded-sm flex items-center justify-center cursor-pointer transition-all duration-200 select-none group relative ${
            darkBackground
              ? 'tactile-tile-dark text-neutral-300 hover:text-white'
              : 'tactile-tile text-neutral-800 hover:text-black'
          }`}
        >
          {social.icon}

          {/* Micro Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 bg-neutral-900 text-white text-[10px] font-mono px-2 py-0.5 rounded shadow-lg whitespace-nowrap z-30">
            {social.name}
          </span>
        </a>
      ))}
    </div>
  );
}
