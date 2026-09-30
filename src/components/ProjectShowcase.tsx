import { useState } from 'react';
import { Sparkles, Database, Bot, Compass, CheckCircle2, ArrowUpRight } from 'lucide-react';
import ProjectCard, { Project } from './ProjectCard';

interface ProjectShowcaseProps {
  theme?: 'dark' | 'light';
}

export default function ProjectShowcase({ theme = 'dark' }: ProjectShowcaseProps) {
  const [selectedTag, setSelectedTag] = useState<'all' | 'genai' | 'rag' | 'agents'>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const isDark = theme === 'dark';

  const projects: Project[] = [
    {
      id: 'ipl-copilot',
      title: 'IPL Copilot – AI-Powered Cricket Assistant',
      category: 'Generative AI & Data Engineering',
      filterTag: 'genai',
      timeline: 'Aug 2026 – Present',
      description:
        'A high-performance conversational analytics assistant implementing natural-language Q&A across complete 2008–2024 Indian Premier League (IPL) data covering matches, players, team dynamics, ball-by-ball events, and statistics.',
      highlights: [
        'Processed structured match data into metadata-rich documents for semantic retrieval and grounded LLM responses.',
        'Integrated LangChain + Ollama with query caching and prompt engineering for low-latency responses.',
        'Vector embeddings stored in ChromaDB with hybrid retrieval for accurate cricket stats.',
      ],
      techStack: ['Python', 'LangChain', 'Ollama', 'ChromaDB', 'FastAPI', 'Pandas'],
      githubUrl: 'https://github.com/SumanthG-1312',
      icon: Sparkles,
      featured: true,
    },
    {
      id: 'ai-travel-planner',
      title: 'AI Travel Planning Assistant',
      category: 'Generative AI & RAG Application',
      filterTag: 'rag',
      timeline: '2026',
      description:
        'An intelligent trip planner that synthesizes comprehensive, personalized travel itineraries based on destination preferences, duration, budgetary parameters, and specific traveler styles using RAG architecture.',
      highlights: [
        'Used RAG to retrieve relevant local travel guidelines, geo-data, and attractions for context-aware suggestions.',
        'Enforced strict Pydantic input and output validation ensuring deterministic JSON schemas for frontend rendering.',
        'Integrated modular AI backend pipelines with streaming response capabilities.',
      ],
      techStack: ['Python', 'Pydantic', 'RAG', 'LangChain', 'LLMs', 'Frontend'],
      githubUrl: 'https://github.com/SumanthG-1312',
      icon: Compass,
      featured: true,
    },
    {
      id: 'agentic-llm-workflow',
      title: 'Agentic AI Application & Multi-Agent Workflow',
      category: 'Agentic AI & Autonomous Systems',
      filterTag: 'agents',
      timeline: 'Feb 2025 – Jun 2026',
      description:
        'An end-to-end Agentic AI architecture developed with Innomatics Research Labs featuring autonomous decision-making loops, tool execution, and dynamic context routing for complex multi-turn workflows.',
      highlights: [
        'Engineered LLM workflows with context window management and advanced prompt strategies.',
        'Created custom agent reasoning chains that decompose user goals into verifiable discrete tasks.',
        'Exposed AI pipelines as secure, asynchronous RESTful APIs using FastAPI with background worker execution.',
      ],
      techStack: ['Python', 'LangChain', 'LangGraph', 'FastAPI', 'NLP', 'Docker'],
      githubUrl: 'https://github.com/SumanthG-1312',
      icon: Bot,
    },
    {
      id: 'hybrid-rag-engine',
      title: 'Enterprise Multi-Model RAG & Vector Search',
      category: 'Information Retrieval & Vector DBs',
      filterTag: 'rag',
      timeline: '2026',
      description:
        'A scalable retrieval-augmented generation framework benchmarking local and cloud models (Ollama, Gemini, Hugging Face) using dense vector search and semantic chunking.',
      highlights: [
        'Benchmarked ChromaDB and FAISS indexes for sub-50ms vector query execution over dense technical manuals.',
        'Implemented cross-encoder re-ranking to filter false-positive chunks before final model synthesis.',
        'Integrated multi-provider LLM fallbacks supporting both open-weights and proprietary API models.',
      ],
      techStack: ['ChromaDB', 'FAISS', 'Gemini API', 'Hugging Face', 'Transformers', 'Python'],
      githubUrl: 'https://github.com/SumanthG-1312',
      icon: Database,
    },
  ];

  const filteredProjects =
    selectedTag === 'all'
      ? projects
      : projects.filter((p) => p.filterTag === selectedTag);

  return (
    <section
      id="portfolio"
      className={`relative w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-16 transition-colors duration-500 ${
        isDark
          ? 'bg-black text-white border-t border-neutral-900'
          : 'bg-slate-50 text-neutral-900 border-t border-slate-200'
      }`}
    >
      {/* Background ambient lighting */}
      {isDark ? (
        <>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-neutral-800/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neutral-800/15 rounded-full blur-3xl pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-slate-200/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-200/40 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-white' : 'bg-neutral-900'}`} />
              <span
                className={`text-xs uppercase tracking-widest font-bold ${
                  isDark ? 'text-neutral-400' : 'text-neutral-600'
                }`}
              >
                PROJECT SHOWCASE
              </span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
                isDark ? 'text-white' : 'text-neutral-900'
              }`}
            >
              Featured Work &amp; AI Engineering
            </h2>
            <p
              className={`mt-3 text-sm sm:text-base leading-relaxed ${
                isDark ? 'text-neutral-400' : 'text-neutral-600'
              }`}
            >
              Explore key projects spanning LLM-powered applications, RAG pipelines, retrieval systems, and agentic workflows.
            </p>
          </div>

          {/* Filter Pills */}
          <div
            className={`flex flex-wrap items-center gap-2 self-start md:self-auto p-1.5 rounded-full border transition-colors ${
              isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            {(
              [
                { id: 'all', label: 'All Projects' },
                { id: 'genai', label: 'Generative AI' },
                { id: 'rag', label: 'RAG Systems' },
                { id: 'agents', label: 'Agentic AI' },
              ] as const
            ).map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedTag(filter.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  selectedTag === filter.id
                    ? isDark
                      ? 'bg-white text-black shadow-sm'
                      : 'bg-neutral-900 text-white shadow-sm'
                    : isDark
                    ? 'text-neutral-400 hover:text-white'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid with Intersection Observer Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isDark={isDark}
              onOpenDetails={(p) => setActiveModalProject(p)}
            />
          ))}
        </div>

        {/* Bottom GitHub Profile Callout */}
        <div
          className={`mt-14 p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 border transition-colors ${
            isDark
              ? 'bg-neutral-950 border-neutral-800'
              : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                isDark
                  ? 'bg-neutral-900 border-neutral-800'
                  : 'bg-slate-100 border-slate-200'
              }`}
            >
              <svg
                className={`w-6 h-6 ${isDark ? 'fill-white' : 'fill-black'}`}
                viewBox="0 0 24 24"
              >
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </div>
            <div>
              <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                More Repositories on GitHub
              </h4>
              <p className={`text-xs sm:text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Explore notebooks, model evaluation benchmarks, and open-source generative AI scripts.
              </p>
            </div>
          </div>

          <a
            href="https://github.com/SumanthG-1312"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-2 ${
              isDark
                ? 'bg-neutral-800 hover:bg-neutral-700 text-white'
                : 'bg-neutral-900 hover:bg-neutral-800 text-white'
            }`}
          >
            <span>Visit @SumanthG-1312</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Architecture Detail Modal */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-700 rounded-2xl p-6 sm:p-8 shadow-2xl text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
              <div>
                <span className="text-xs uppercase tracking-wider font-mono text-neutral-400">
                  {activeModalProject.category}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {activeModalProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6 text-sm text-neutral-300">
              <p className="leading-relaxed">
                {activeModalProject.description}
              </p>

              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-400 mb-2">
                  Technical Architecture &amp; Implementation
                </h4>
                <ul className="space-y-2">
                  {activeModalProject.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-400 mb-2">
                  Libraries &amp; Technologies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalProject.techStack.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono bg-neutral-800 text-neutral-200 px-3 py-1 rounded-md border border-neutral-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
              <button
                onClick={() => setActiveModalProject(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Close
              </button>
              <a
                href={activeModalProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-white text-black hover:bg-neutral-200 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>View on GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
