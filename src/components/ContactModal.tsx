import { useState } from 'react';
import { X, Mail, Check, Copy, ExternalLink } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState(false);
  const email = 'sumanthgajjela@gmail.com';

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 shadow-2xl text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Get in Touch</span>
          <h2 className="text-2xl font-bold mt-1 text-white">Let's Connect</h2>
          <p className="text-sm text-neutral-400 mt-1">
            Reach out directly for AI Engineering, Generative AI projects, or research collaborations.
          </p>
        </div>

        {/* Email Box */}
        <div className="bg-neutral-950 border border-neutral-800/80 rounded-xl p-4 mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-neutral-300" />
            </div>
            <div className="truncate">
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold">Direct Email</div>
              <div className="text-sm font-mono text-white truncate">{email}</div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleCopyEmail}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title="Copy email to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <a
              href={`mailto:${email}`}
              className="p-2 rounded-lg bg-white text-black hover:bg-neutral-200 transition-colors"
              title="Open email client"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Profiles list */}
        <div className="space-y-2.5 mb-6">
          <a
            href="https://www.linkedin.com/in/sumanth-gajjela/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 transition-colors group"
          >
            <span className="text-sm font-medium text-neutral-300 group-hover:text-white">LinkedIn Profile</span>
            <span className="text-xs text-neutral-500 group-hover:text-neutral-300 flex items-center gap-1">
              /in/sumanth-gajjela <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </a>

          <a
            href="https://github.com/SumanthG-1312"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 transition-colors group"
          >
            <span className="text-sm font-medium text-neutral-300 group-hover:text-white">GitHub Profile</span>
            <span className="text-xs text-neutral-500 group-hover:text-neutral-300 flex items-center gap-1">
              @SumanthG-1312 <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </a>

          <a
            href="https://x.com/SumanthG1312"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 transition-colors group"
          >
            <span className="text-sm font-medium text-neutral-300 group-hover:text-white">X / Twitter</span>
            <span className="text-xs text-neutral-500 group-hover:text-neutral-300 flex items-center gap-1">
              @SumanthG1312 <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </a>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-sm font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}
