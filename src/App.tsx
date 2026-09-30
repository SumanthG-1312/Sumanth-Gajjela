import { useState, useEffect } from 'react';
import Logo from './components/Logo';
import Navigation from './components/Navigation';
import SocialIcons from './components/SocialIcons';
import HeroImage from './components/HeroImage';
import ContactModal from './components/ContactModal';
import ResumeModal from './components/ResumeModal';
import ProjectShowcase from './components/ProjectShowcase';
import { FileText, ArrowRight, ChevronDown, FolderGit2, ArrowUp, Sun, Moon } from 'lucide-react';

export default function App() {
  // Support both: Image on Left (user explicit prompt request) & Image on Right (reference composition)
  const [imageOnLeft, setImageOnLeft] = useState<boolean>(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dynamic Theme state (Dark/Light)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track window scroll progress for top progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('sumanth_portfolio_theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const handleThemeChange = (newTheme: 'dark' | 'light') => {
    setTheme(newTheme);
    try {
      localStorage.setItem('sumanth_portfolio_theme', newTheme);
    } catch {
      // quota or localstorage disabled
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const scrollToProjects = () => {
    const el = document.getElementById('portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (sectionName: string) => {
    const lower = sectionName.toLowerCase();
    if (lower === 'resume') {
      setIsResumeOpen(true);
      return;
    }
    if (lower === 'portfolio' || lower === 'projects') {
      scrollToProjects();
      return;
    }
    if (lower === 'skills') {
      setIsResumeOpen(true);
      return;
    }
    showToast(`${sectionName} section will be available in the full release.`);
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`relative w-full min-h-screen overflow-x-hidden transition-colors duration-500 ${
        isDark ? 'bg-black text-white' : 'bg-slate-50 text-neutral-900'
      }`}
    >
      {/* =========================================================================
          ANIMATED TOP SCROLL PROGRESS BAR
          Fills as the user scrolls down to provide immediate visual context
          ========================================================================= */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] z-[999] pointer-events-none bg-transparent"
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page reading progress"
      >
        <div
          className={`h-full transition-all duration-150 ease-out relative ${
            isDark
              ? 'bg-gradient-to-r from-neutral-300 via-white to-amber-200 shadow-[0_0_10px_rgba(255,255,255,0.7)]'
              : 'bg-gradient-to-r from-neutral-900 via-neutral-800 to-black shadow-[0_0_8px_rgba(0,0,0,0.35)]'
          }`}
          style={{ width: `${scrollProgress}%` }}
        >
          {/* Subtle glowing tip on the right edge */}
          <div
            className={`absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full blur-[1px] ${
              isDark ? 'bg-white shadow-[0_0_8px_#ffffff]' : 'bg-black shadow-[0_0_6px_rgba(0,0,0,0.5)]'
            }`}
          />
        </div>
      </div>

      {/* =========================================================================
          HERO LANDING SECTION (Split Screen with Slanted Divider)
          ========================================================================= */}
      <section className="relative w-full h-screen min-h-[660px] overflow-hidden bg-black select-none">
        {/* =======================================================================
            MODE 1: REFERENCE COMPOSITION (Light Gray Left, Black + Photo Right)
            ======================================================================= */}
        {!imageOnLeft && (
          <div className="relative w-full h-full">
            {/* Base Layer: Solid Black Right Side */}
            <div className="absolute inset-0 bg-black" />

            {/* Desktop Right Side Content: Top-Right Nav & Hero Photo */}
            <div className="hidden lg:block absolute inset-0 z-10 pointer-events-none">
              {/* Top Navigation Bar */}
              <header className="absolute top-8 right-10 xl:right-16 pointer-events-auto">
                <Navigation
                  onOpenContact={() => setIsContactOpen(true)}
                  onOpenResume={() => setIsResumeOpen(true)}
                  onItemClick={handleNavClick}
                  isDarkTheme={true}
                />
              </header>

              {/* Photo on the right side (Standard size matching reference) */}
              <div className="absolute right-0 bottom-0 w-[55%] h-full pointer-events-auto flex items-end justify-center xl:justify-end xl:pr-16">
                <HeroImage isLarge={false} />
              </div>
            </div>

            {/* Slanted Light Gray Left Section */}
            <div
              className="relative lg:absolute inset-0 w-full lg:w-full z-20 pointer-events-none clip-slant-right flex flex-col justify-between"
              style={{ backgroundColor: '#DFE2E5' }}
            >
              {/* Left Content Area (Constrained so it stays within the light gray slant) */}
              <div className="w-full lg:w-[44%] xl:w-[43%] h-full flex flex-col justify-between p-6 sm:p-10 md:p-12 lg:p-14 xl:p-18 pointer-events-auto">
                {/* Top-Left: Monogram Logo */}
                <div className="w-full flex items-center justify-between">
                  <Logo />

                  {/* Mobile Navigation Trigger */}
                  <div className="lg:hidden">
                    <Navigation
                      onOpenContact={() => setIsContactOpen(true)}
                      onOpenResume={() => setIsResumeOpen(true)}
                      onItemClick={handleNavClick}
                      isDarkTheme={false}
                    />
                  </div>
                </div>

                {/* Middle: Introduction & Name with Entrance Animation */}
                <div className="my-auto py-8">
                  <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-neutral-800 tracking-tight mb-2 animate-fade-in-up animation-delay-100">
                    Hi, I am
                  </p>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-[68px] font-extrabold text-neutral-900 tracking-tight leading-[1.08] mb-4 animate-fade-in-up animation-delay-200">
                    Sumanth Gajjela
                  </h1>
                  <p className="text-xs sm:text-sm md:text-base font-semibold text-neutral-500 uppercase tracking-widest leading-relaxed mb-6 animate-fade-in-up animation-delay-300">
                    Data Science Student{' '}
                    <span className="text-neutral-400 font-light mx-1">|</span>{' '}
                    Generative AI &amp; AI Engineering
                  </p>

                  {/* Action CTAs: View Resume, Projects & Connect */}
                  <div className="flex flex-wrap items-center gap-3 animate-fade-in-up animation-delay-400">
                    <button
                      onClick={() => setIsResumeOpen(true)}
                      className="flex items-center gap-2 bg-neutral-900 text-white font-semibold text-xs tracking-wider uppercase px-5 py-2.5 rounded-full hover:bg-neutral-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Resume</span>
                    </button>

                    <button
                      onClick={scrollToProjects}
                      className="flex items-center gap-2 bg-white text-black border border-neutral-300 font-semibold text-xs tracking-wider uppercase px-4 py-2.5 rounded-full hover:bg-neutral-100 transition-all shadow-xs cursor-pointer"
                    >
                      <FolderGit2 className="w-3.5 h-3.5" />
                      <span>Projects</span>
                    </button>

                    <button
                      onClick={() => setIsContactOpen(true)}
                      className="flex items-center gap-1 text-xs font-semibold text-neutral-700 hover:text-black uppercase tracking-wider px-2 py-2 transition-colors cursor-pointer group"
                    >
                      <span>Contact</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Bottom-Left: Social Icons with Entrance Animation */}
                <div className="w-full animate-fade-in-up animation-delay-500">
                  <SocialIcons onOpenContact={() => setIsContactOpen(true)} />
                </div>
              </div>

              {/* Mobile Fallback: Photo below fold on smaller viewports */}
              <div className="lg:hidden w-full h-80 bg-black pointer-events-auto flex items-end justify-center">
                <HeroImage isLarge={false} />
              </div>
            </div>
          </div>
        )}

        {/* =======================================================================
            MODE 2: REQUESTED LAYOUT (Photo on Left Side, Intro on Right Side)
            Photo is noticeably INCREASED in size as requested!
            ======================================================================= */}
        {imageOnLeft && (
          <div className="relative w-full h-full">
            {/* Base Layer: Light Gray Right Side */}
            <div className="absolute inset-0" style={{ backgroundColor: '#DFE2E5' }} />

            {/* Desktop Right Side Content: Nav & Intro on Light Gray */}
            <div className="hidden lg:block absolute inset-0 z-10 pointer-events-none">
              {/* Top Navigation Bar */}
              <header className="absolute top-8 right-10 xl:right-16 pointer-events-auto">
                <Navigation
                  onOpenContact={() => setIsContactOpen(true)}
                  onOpenResume={() => setIsResumeOpen(true)}
                  onItemClick={handleNavClick}
                  isDarkTheme={false}
                />
              </header>

              {/* Right Intro Area (Constrained to the light gray area) with Entrance Animation */}
              <div className="absolute right-0 inset-y-0 w-[48%] h-full flex flex-col justify-between p-10 lg:p-12 xl:p-16 pointer-events-auto">
                <div className="h-10" />

                {/* Middle: Introduction & Name with Entrance Animation */}
                <div className="my-auto py-8 max-w-xl">
                  <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-neutral-800 tracking-tight mb-2 animate-fade-in-up animation-delay-100">
                    Hi, I am
                  </p>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-[68px] font-extrabold text-neutral-900 tracking-tight leading-[1.08] mb-4 animate-fade-in-up animation-delay-200">
                    Sumanth Gajjela
                  </h1>
                  <p className="text-xs sm:text-sm md:text-base font-semibold text-neutral-500 uppercase tracking-widest leading-relaxed mb-6 animate-fade-in-up animation-delay-300">
                    Data Science Student{' '}
                    <span className="text-neutral-400 font-light mx-1">|</span>{' '}
                    Generative AI &amp; AI Engineering
                  </p>

                  {/* Direct action buttons: View Resume, Projects & Get in touch */}
                  <div className="flex flex-wrap items-center gap-3 animate-fade-in-up animation-delay-400">
                    <button
                      onClick={() => setIsResumeOpen(true)}
                      className="flex items-center gap-2 bg-neutral-900 text-white font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-neutral-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Resume</span>
                    </button>

                    <button
                      onClick={scrollToProjects}
                      className="flex items-center gap-2 bg-white text-black font-semibold text-xs uppercase tracking-wider px-4 py-2.5 rounded-full hover:bg-neutral-100 transition-all shadow-xs cursor-pointer"
                    >
                      <FolderGit2 className="w-3.5 h-3.5" />
                      <span>Projects</span>
                    </button>

                    <button
                      onClick={() => setIsContactOpen(true)}
                      className="border border-neutral-400/80 text-neutral-800 font-semibold text-xs uppercase tracking-wider px-4 py-2.5 rounded-full hover:bg-neutral-300/60 transition-all cursor-pointer"
                    >
                      Get in touch
                    </button>
                  </div>
                </div>

                {/* Bottom Quick Links with Entrance Animation */}
                <div className="flex items-center gap-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider animate-fade-in-up animation-delay-500">
                  <a
                    href="https://www.linkedin.com/in/sumanth-gajjela/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors"
                  >
                    LinkedIn
                  </a>
                  <span>•</span>
                  <a
                    href="https://github.com/SumanthG-1312"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors"
                  >
                    GitHub
                  </a>
                  <span>•</span>
                  <a
                    href="https://x.com/SumanthG1312"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors"
                  >
                    X (Twitter)
                  </a>
                </div>
              </div>
            </div>

            {/* Slanted Black Left Section with Hero Photo & Monogram Logo (Wider container & Larger Photo) */}
            <div className="relative lg:absolute inset-0 w-full lg:w-full z-20 pointer-events-none clip-slant-left flex flex-col justify-between bg-black">
              {/* Left Column Content - Expanded width for larger photo */}
              <div className="w-full lg:w-[54%] xl:w-[52%] h-full flex flex-col justify-between p-4 sm:p-8 md:p-10 pointer-events-auto">
                {/* Top-Left: Monogram Logo (white/light theme for dark background) */}
                <div className="w-full flex items-center justify-between p-2">
                  <Logo theme="light" />

                  {/* Mobile Navigation Trigger */}
                  <div className="lg:hidden">
                    <Navigation
                      onOpenContact={() => setIsContactOpen(true)}
                      onOpenResume={() => setIsResumeOpen(true)}
                      onItemClick={handleNavClick}
                      isDarkTheme={true}
                    />
                  </div>
                </div>

                {/* Photo placed on the left side with INCREASED photo size */}
                <div className="w-full h-full flex items-end justify-center pointer-events-auto overflow-hidden">
                  <HeroImage isLarge={true} />
                </div>

                {/* Bottom-Left: Social Icons with Entrance Animation */}
                <div className="w-full z-20 p-2 animate-fade-in-up animation-delay-500">
                  <SocialIcons onOpenContact={() => setIsContactOpen(true)} darkBackground={true} />
                </div>
              </div>

              {/* Mobile Fallback: Intro below fold on smaller viewports */}
              <div className="lg:hidden w-full p-8 bg-[#DFE2E5] text-neutral-900 pointer-events-auto">
                <p className="text-lg font-medium text-neutral-700 animate-fade-in-up animation-delay-100">Hi, I am</p>
                <h1 className="text-3xl font-extrabold text-neutral-900 mt-1 mb-2 animate-fade-in-up animation-delay-200">Sumanth Gajjela</h1>
                <p className="text-xs font-semibold text-neutral-600 uppercase tracking-widest mb-6 animate-fade-in-up animation-delay-300">
                  Data Science Student | Generative AI &amp; AI Engineering
                </p>
                <div className="flex flex-col gap-2.5">
                  <button
                    onClick={() => setIsResumeOpen(true)}
                    className="w-full py-3 bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>VIEW RESUME</span>
                  </button>
                  <button
                    onClick={scrollToProjects}
                    className="w-full py-3 bg-white text-black font-bold text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-2"
                  >
                    <FolderGit2 className="w-4 h-4" />
                    <span>EXPLORE PROJECTS</span>
                  </button>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="w-full py-3 border border-neutral-400 text-neutral-900 font-bold text-xs uppercase tracking-wider rounded-full"
                  >
                    CONTACT ME
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scroll Indicator at bottom edge of hero */}
        <button
          onClick={scrollToProjects}
          className="hidden md:flex absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-1 text-[11px] font-mono tracking-widest uppercase text-neutral-400 hover:text-white transition-colors cursor-pointer group"
          aria-label="Scroll down to projects showcase"
        >
          <span className="group-hover:translate-y-0.5 transition-transform">Projects</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce text-neutral-400 group-hover:text-white" />
        </button>
      </section>

      {/* =========================================================================
          PROJECT SHOWCASE SECTION (With Dynamic Theme Support)
          ========================================================================= */}
      <ProjectShowcase theme={theme} />

      {/* =========================================================================
          DYNAMIC FOOTER WITH THEME TOGGLE SWITCH
          ========================================================================= */}
      <footer
        className={`w-full py-12 px-6 sm:px-10 lg:px-16 text-xs transition-colors duration-500 border-t ${
          isDark
            ? 'bg-neutral-950 border-neutral-900 text-neutral-400'
            : 'bg-white border-slate-200 text-neutral-600'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Sumanth Gajjela
            </span>
            <span className={isDark ? 'text-neutral-700' : 'text-neutral-300'}>|</span>
            <span>Data Science Student &bull; Generative AI &amp; AI Engineering</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
            {/* Theme Toggle Switch in Footer */}
            <div
              className={`flex items-center p-1 rounded-full border transition-colors ${
                isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-slate-100 border-slate-200 shadow-inner'
              }`}
            >
              <button
                onClick={() => handleThemeChange('light')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  !isDark
                    ? 'bg-white text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Switch to Light Theme"
                aria-label="Light mode"
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Light</span>
              </button>
              <button
                onClick={() => handleThemeChange('dark')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isDark
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
                title="Switch to Dark Theme"
                aria-label="Dark mode"
              >
                <Moon className="w-3.5 h-3.5 text-sky-400" />
                <span>Dark</span>
              </button>
            </div>

            <button
              onClick={() => setIsResumeOpen(true)}
              className={`transition-colors cursor-pointer ${
                isDark ? 'hover:text-white' : 'hover:text-black font-medium'
              }`}
            >
              Resume
            </button>
            <a
              href="https://github.com/SumanthG-1312"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
                isDark ? 'hover:text-white' : 'hover:text-black font-medium'
              }`}
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sumanth-gajjela/"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
                isDark ? 'hover:text-white' : 'hover:text-black font-medium'
              }`}
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/SumanthG1312"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
                isDark ? 'hover:text-white' : 'hover:text-black font-medium'
              }`}
            >
              X
            </a>
            <button
              onClick={scrollToTop}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isDark
                  ? 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-neutral-700 hover:text-black'
              }`}
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          LAYOUT TOGGLE SWITCH (Bottom Floating Dock)
          Allows instant switching between "Image Left (Requested)" & "Image Right (Reference Image)"
          ========================================================================= */}
      <aside aria-label="Layout Switcher" className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40">
        <div
          className={`flex items-center gap-1.5 p-1 backdrop-blur-md rounded-full shadow-2xl transition-all border ${
            isDark
              ? 'bg-neutral-900/90 hover:bg-neutral-900 border-neutral-700/80'
              : 'bg-white/90 hover:bg-white border-slate-300 shadow-lg'
          }`}
        >
          <button
            onClick={() => setImageOnLeft(true)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
              imageOnLeft
                ? isDark
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'bg-neutral-900 text-white font-semibold shadow-sm'
                : isDark
                ? 'text-neutral-400 hover:text-white'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            <span>Image Left</span>
            <span
              className={`text-[10px] px-1 rounded font-mono ${
                imageOnLeft
                  ? isDark
                    ? 'bg-neutral-200 text-neutral-800'
                    : 'bg-neutral-700 text-white'
                  : isDark
                  ? 'bg-neutral-800 text-neutral-300'
                  : 'bg-slate-200 text-neutral-700'
              }`}
            >
              Specified
            </span>
          </button>

          <button
            onClick={() => setImageOnLeft(false)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
              !imageOnLeft
                ? isDark
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'bg-neutral-900 text-white font-semibold shadow-sm'
                : isDark
                ? 'text-neutral-400 hover:text-white'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            <span>Image Right</span>
            <span
              className={`text-[10px] px-1 rounded font-mono ${
                !imageOnLeft
                  ? isDark
                    ? 'bg-neutral-200 text-neutral-800'
                    : 'bg-neutral-700 text-white'
                  : isDark
                  ? 'bg-neutral-800 text-neutral-300'
                  : 'bg-slate-200 text-neutral-700'
              }`}
            >
              Reference
            </span>
          </button>
        </div>
      </aside>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-neutral-900/95 border border-neutral-700 text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          {toastMessage}
        </div>
      )}

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Resume Section Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}
