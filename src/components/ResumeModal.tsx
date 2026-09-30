import { useState } from 'react';
import { X, Download, Check } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const base = import.meta.env.BASE_URL || './';
  const resumePdfPath = `${base.replace(/\/$/, '')}/Sumanth_Gajjela_Resume.pdf`;

  // Direct physical PDF download that works reliably across all browsers & iframes
  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(resumePdfPath);
      if (!response.ok) throw new Error('File download failed');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'Sumanth_Gajjela_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 400);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    } catch {
      // Fallback direct link trigger
      const fallbackLink = document.createElement('a');
      fallbackLink.href = resumePdfPath;
      fallbackLink.download = 'Sumanth_Gajjela_Resume.pdf';
      fallbackLink.target = '_blank';
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      setTimeout(() => document.body.removeChild(fallbackLink), 400);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      {/* Dialog Container */}
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-neutral-900 border border-neutral-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar with Single Download Button */}
        <div className="flex flex-wrap items-center justify-between px-5 sm:px-6 py-4 border-b border-neutral-800 bg-neutral-950/80 shrink-0 gap-3 no-print">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">Curriculum Vitae / Resume</h2>
            <span className="text-xs text-neutral-400 hidden sm:inline">• Sumanth Gajjela</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Single Download Resume Button */}
            <a
              href="/Sumanth_Gajjela_Resume.pdf"
              download="Sumanth_Gajjela_Resume.pdf"
              onClick={handleDownload}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer ${
                downloadSuccess
                  ? 'bg-emerald-500 text-black'
                  : 'bg-white text-black hover:bg-neutral-200'
              }`}
              title="Download Resume PDF file directly"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-black" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resume</span>
                </>
              )}
            </a>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer ml-1"
              aria-label="Close resume viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Resume Document Sheet (Exact 1:1 Match of Provided Resume) */}
        <div className="overflow-y-auto p-4 sm:p-8 md:p-12 bg-neutral-200 text-neutral-900 font-sans print:p-0 print:bg-white select-text">
          <div
            id="printable-resume"
            className="max-w-3xl mx-auto bg-white p-8 sm:p-12 md:p-14 shadow-md border border-neutral-300 print:shadow-none print:border-none print:p-0 text-neutral-900"
            style={{ fontFamily: "'Times New Roman', Times, serif, system-ui, sans-serif" }}
          >
            {/* Header: Sumanth Gajjela */}
            <div className="text-center pb-4">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-normal text-black font-sans">
                Sumanth Gajjela
              </h1>
              <div className="text-xs sm:text-sm text-neutral-800 mt-1.5 font-sans">
                <span>+91 7207556765</span>
                <span className="mx-1.5 text-neutral-400">|</span>
                <a href="mailto:sumanthgajjela13@gmail.com" className="hover:underline text-black">
                  sumanthgajjela13@gmail.com
                </a>
                <span className="mx-1.5 text-neutral-400">|</span>
                <a
                  href="https://www.linkedin.com/in/sumanth-gajjela/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-black"
                >
                  LinkedIn
                </a>
                <span className="mx-1.5 text-neutral-400">|</span>
                <a
                  href="https://github.com/SumanthG-1312"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-black"
                >
                  GitHub
                </a>
              </div>
            </div>

            {/* SUMMARY */}
            <section className="mt-4 font-sans">
              <div className="border-b border-black pb-0.5 mb-2">
                <h2 className="text-sm font-bold tracking-wider text-black uppercase">
                  SUMMARY
                </h2>
              </div>
              <p className="text-[13px] leading-relaxed text-neutral-900 text-justify">
                AI-focused Computer Science student with hands-on experience building LLM-powered applications using Python,
                LangChain, FastAPI, RAG, and NLP. Interested in Generative AI, Agentic AI, LLM applications, and intelligent systems, with
                practical experience integrating AI models, retrieval systems, and APIs.
              </p>
            </section>

            {/* TECHNICAL SKILLS */}
            <section className="mt-5 font-sans">
              <div className="border-b border-black pb-0.5 mb-2">
                <h2 className="text-sm font-bold tracking-wider text-black uppercase">
                  TECHNICAL SKILLS
                </h2>
              </div>
              <div className="space-y-1 text-[13px] text-neutral-900 leading-snug">
                <div>
                  <span className="font-bold">Programming Languages:</span> Python, C++, SQL
                </div>
                <div>
                  <span className="font-bold">Frameworks/Libraries:</span> FastAPI, Pydantic, LangChain, LangGraph, NumPy, Pandas
                </div>
                <div>
                  <span className="font-bold">Generative AI:</span> LLMs, Prompt Engineering, RAG, Embeddings
                </div>
                <div>
                  <span className="font-bold">Machine Learning:</span> NLP, Machine Learning Basics, Transformers
                </div>
                <div>
                  <span className="font-bold">Models &amp; Platforms:</span> Ollama, Hugging Face, Gemini, OpenAI
                </div>
                <div>
                  <span className="font-bold">Databases:</span> MySQL, ChromaDB, FAISS
                </div>
                <div>
                  <span className="font-bold">Tools:</span> Git, GitHub, Docker, Google Colab, Jupyter Notebook, n8n
                </div>
              </div>
            </section>

            {/* PROJECTS */}
            <section className="mt-5 font-sans">
              <div className="border-b border-black pb-0.5 mb-2">
                <h2 className="text-sm font-bold tracking-wider text-black uppercase">
                  PROJECTS
                </h2>
              </div>

              {/* Project 1 */}
              <div className="mb-4">
                <div className="flex flex-row justify-between items-baseline text-[13.5px]">
                  <span className="font-bold text-black">IPL Copilot – AI-Powered Cricket Assistant</span>
                  <span className="text-[12.5px] text-neutral-800 shrink-0">Aug 2026 – Present</span>
                </div>
                <div className="flex flex-row justify-between items-baseline text-[12.5px] text-neutral-900 mb-1">
                  <span>Generative AI &amp; Data Engineering</span>
                  <span className="shrink-0 text-right">Python, Pandas, LangChain, Ollama, ChromaDB, FastAPI</span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-0.5 text-[12.5px] leading-snug text-neutral-900">
                  <li>Implemented natural-language Q&amp;A over 2008–2024 IPL data covering matches, players, teams, statistics, and ball-by-ball events.</li>
                  <li>Processed structured match data into metadata-rich documents for semantic retrieval and grounded LLM responses.</li>
                  <li>Integrated LangChain + Ollama with query caching and prompt engineering for efficient responses.</li>
                </ul>
              </div>

              {/* Project 2 */}
              <div>
                <div className="flex flex-row justify-between items-baseline text-[13.5px]">
                  <span className="font-bold text-black">AI Travel Planning Assistant</span>
                  <span className="text-[12.5px] text-neutral-800 shrink-0">2026</span>
                </div>
                <div className="flex flex-row justify-between items-baseline text-[12.5px] text-neutral-900 mb-1">
                  <span>Generative AI &amp; RAG Application</span>
                  <span className="shrink-0 text-right">Python, Pydantic, RAG, LangChain, LLMs, Frontend</span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-0.5 text-[12.5px] leading-snug text-neutral-900">
                  <li>Built an AI-powered travel planning application that generates personalized trip plans based on destination, duration, budget, and user preferences.</li>
                  <li>Used RAG to retrieve relevant travel information and provide more context-aware recommendations.</li>
                  <li>Used Pydantic for structured input and output validation and connected the AI backend with a simple user interface.</li>
                </ul>
              </div>
            </section>

            {/* EXPERIENCE */}
            <section className="mt-5 font-sans">
              <div className="border-b border-black pb-0.5 mb-2">
                <h2 className="text-sm font-bold tracking-wider text-black uppercase">
                  EXPERIENCE
                </h2>
              </div>

              <div>
                <div className="flex flex-row justify-between items-baseline text-[13.5px]">
                  <span className="font-bold text-black">Agentic AI Intern</span>
                  <span className="text-[12.5px] text-neutral-800 shrink-0">Feb 2025 – Jun 2026</span>
                </div>
                <div className="flex flex-row justify-between items-baseline text-[12.5px] text-neutral-900 mb-1.5">
                  <span className="italic">Innomatics Research Labs</span>
                  <span className="shrink-0 text-right">Hyderabad, India</span>
                </div>
                <div className="space-y-0.5 text-[12.5px] leading-snug text-neutral-900 pl-1">
                  <div>Designed an end-to-end LLM-powered AI application using Python, LangChain, NLP, and FastAPI.</div>
                  <div>Worked with LLM workflows, prompt engineering, and context handling to build AI-powered application features.</div>
                  <div>Integrated AI components with RESTful APIs using FastAPI to connect backend services with AI workflows.</div>
                </div>
              </div>
            </section>

            {/* EDUCATION */}
            <section className="mt-5 font-sans">
              <div className="border-b border-black pb-0.5 mb-2">
                <h2 className="text-sm font-bold tracking-wider text-black uppercase">
                  EDUCATION
                </h2>
              </div>

              <div className="space-y-2 text-[12.5px] text-neutral-900">
                <div>
                  <div className="flex flex-row justify-between items-baseline">
                    <span className="font-bold text-black">Vignan Institute of Technology and Science</span>
                    <span className="shrink-0">Telangana, India</span>
                  </div>
                  <div className="flex flex-row justify-between items-baseline text-neutral-800">
                    <span>B.Tech in Computer Science (Data Science)</span>
                    <span className="shrink-0">2024 – Expected 2027</span>
                  </div>
                </div>

                <div>
                  <div className="flex flex-row justify-between items-baseline">
                    <span className="font-bold text-black">Teegala Krishna Reddy Engineering College</span>
                    <span className="shrink-0">Telangana, India</span>
                  </div>
                  <div className="flex flex-row justify-between items-baseline text-neutral-800">
                    <span>Diploma in Electronics &amp; Communication Engineering</span>
                    <span className="shrink-0">2021 – 2024</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Modal Footer with Single Download Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-3.5 border-t border-neutral-800 bg-neutral-950 text-xs text-neutral-400 shrink-0 no-print">
          <div className="flex items-center gap-2">
            <span>Direct contact:</span>
            <a href="mailto:sumanthgajjela13@gmail.com" className="text-neutral-200 hover:text-white underline">
              sumanthgajjela13@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/Sumanth_Gajjela_Resume.pdf"
              download="Sumanth_Gajjela_Resume.pdf"
              onClick={handleDownload}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                downloadSuccess
                  ? 'bg-emerald-500 text-black'
                  : 'bg-white text-black hover:bg-neutral-200'
              }`}
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-black" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resume</span>
                </>
              )}
            </a>

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-colors cursor-pointer ml-1"
            >
              Close Viewer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
