import { ExternalLink, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export interface Project {
  id: string;
  title: string;
  category: string;
  filterTag: 'genai' | 'rag' | 'agents';
  timeline: string;
  description: string;
  highlights: string[];
  techStack: string[];
  githubUrl: string;
  icon: React.ComponentType<{ className?: string }>;
  featured?: boolean;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isDark: boolean;
  onOpenDetails: (project: Project) => void;
}

export default function ProjectCard({
  project,
  index,
  isDark,
  onOpenDetails,
}: ProjectCardProps) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true,
  });

  const Icon = project.icon;

  // Staggered delay based on index % 2 for smooth column waterfall
  const delayStyle = {
    animationDelay: `${(index % 2) * 120}ms`,
  };

  return (
    <div
      ref={ref}
      style={delayStyle}
      className={`group relative flex flex-col justify-between rounded-2xl p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden ${
        isVisible
          ? 'animate-fade-in-up'
          : 'opacity-0 translate-y-6'
      } ${
        isDark
          ? 'bg-neutral-950 border border-neutral-800/90 hover:border-neutral-500/80 hover:shadow-[0_12px_30px_rgba(0,0,0,0.8)]'
          : 'bg-white border border-slate-200/90 hover:border-slate-400 hover:shadow-xl'
      }`}
    >
      {/* Subtle Hover Gradient Glow */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
          isDark
            ? 'bg-gradient-to-br from-white/[0.04] to-transparent'
            : 'bg-gradient-to-br from-black/[0.02] to-transparent'
        }`}
      />

      {/* Top Row: Category & Icon */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span
            className={`text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full border ${
              isDark
                ? 'text-neutral-400 bg-neutral-900 border-neutral-800'
                : 'text-neutral-700 bg-slate-100 border-slate-200'
            }`}
          >
            {project.category}
          </span>

          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
              isDark
                ? 'bg-neutral-900 border border-neutral-800 text-white group-hover:bg-white group-hover:text-black'
                : 'bg-slate-100 border border-slate-200 text-neutral-800 group-hover:bg-neutral-900 group-hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4" />
          </div>
        </div>

        {/* Title & Timeline */}
        <div className="mb-3">
          <h3
            className={`text-xl sm:text-2xl font-bold transition-colors leading-snug ${
              isDark
                ? 'text-white group-hover:text-neutral-100'
                : 'text-neutral-900 group-hover:text-black'
            }`}
          >
            {project.title}
          </h3>
          <p className="text-xs text-neutral-500 font-mono mt-1">
            {project.timeline}
          </p>
        </div>

        {/* Description */}
        <p
          className={`text-xs sm:text-sm leading-relaxed mb-6 font-normal ${
            isDark ? 'text-neutral-300' : 'text-neutral-600'
          }`}
        >
          {project.description}
        </p>

        {/* Key Architecture Highlights */}
        <div className="space-y-2 mb-6">
          {project.highlights.map((highlight, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2 text-xs ${
                isDark ? 'text-neutral-400' : 'text-neutral-600'
              }`}
            >
              <CheckCircle2
                className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                  isDark ? 'text-neutral-500' : 'text-slate-400'
                }`}
              />
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row: Tech Stack & Action Links */}
      <div
        className={`pt-6 border-t ${
          isDark ? 'border-neutral-800/80' : 'border-slate-100'
        }`}
      >
        {/* Tech stack chips */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className={`text-[11px] font-mono px-2.5 py-1 rounded-md border transition-colors ${
                isDark
                  ? 'text-neutral-300 bg-neutral-900 border-neutral-800 group-hover:border-neutral-700'
                  : 'text-neutral-700 bg-slate-100 border-slate-200 group-hover:border-slate-300'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wide uppercase transition-all shadow-sm cursor-pointer group/btn ${
              isDark
                ? 'bg-white text-black hover:bg-neutral-200'
                : 'bg-neutral-900 text-white hover:bg-neutral-800'
            }`}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span>View Code</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </a>

          <button
            onClick={() => onOpenDetails(project)}
            className={`inline-flex items-center gap-1.5 text-xs transition-colors cursor-pointer py-2 px-3 ${
              isDark
                ? 'text-neutral-400 hover:text-white'
                : 'text-neutral-500 hover:text-black'
            }`}
          >
            <span>Architecture Details</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
