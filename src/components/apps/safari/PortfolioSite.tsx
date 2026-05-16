'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useInView } from 'framer-motion';

export default function PortfolioSite() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(timer); setTimeout(() => setLoading(false), 500); return 100; }
        return prev + Math.floor(Math.random() * 12) + 2;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative antialiased bg-[#eaddcf] text-[#0f0f0f] w-full h-full overflow-y-auto overflow-x-hidden custom-cursor-wrapper [container-type:inline-size] pb-0 hide-scrollbar"
      style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200;12..96,400;12..96,600;12..96,800&family=Inter:wght@300;400;500;600&display=swap');
        .fp { font-family: 'Bricolage Grotesque', sans-serif; letter-spacing: -0.04em; }
        .fd { font-family: 'Inter', sans-serif; }
        .custom-cursor-wrapper, .custom-cursor-wrapper * { cursor: none !important; }
        ::selection { background: #0f0f0f; color: #eaddcf; }
        /* Fractal Core 3D */
        @keyframes fractalRotate { from { transform: rotateY(0deg) rotateX(0deg); } to { transform: rotateY(360deg) rotateX(360deg); } }
        .fractal-container { transform-style: preserve-3d; animation: fractalRotate 25s linear infinite; }
        .fractal-box { position: absolute; border: 1.5px solid rgba(15, 15, 15, 0.15); transform-style: preserve-3d; transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1); }
        .fractal-box.accent { border-color: rgba(217, 74, 56, 0.3); }
        .fractal-face { position: absolute; inset: 0; border: inherit; background: rgba(217, 74, 56, 0.02); }
        @keyframes scan { from { top: -10%; } to { top: 110%; } }
        .scan-line { position: absolute; left: 0; width: 100%; height: 2px; background: linear-gradient(to right, transparent, #d94a38, transparent); opacity: 0.1; z-index: 50; pointer-events: none; animation: scan 8s linear infinite; }
        
        /* Cinematic Grain */
        .grain-overlay { position: fixed; inset: -50%; width: 200%; height: 200%; background-image: url('https://grainy-gradients.vercel.app/noise.svg'); opacity: 0.04; pointer-events: none; z-index: 1000; animation: grain 8s steps(10) infinite; filter: contrast(120%) brightness(120%); }
        @keyframes grain { 
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
        }

        /* 3D Sphere Animation */
        @keyframes sphereRotate { from { transform: rotateY(0deg) rotateX(0deg); } to { transform: rotateY(360deg) rotateX(360deg); } }
        .sphere-container { transform-style: preserve-3d; animation: sphereRotate 20s linear infinite; }
        .sphere-ring { position: absolute; border: 1px solid rgba(217, 74, 56, 0.3); border-radius: 50%; width: 100%; height: 100%; }
        
        /* Particle Dust */
        @keyframes float { 
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -50px) rotate(5deg); }
          66% { transform: translate(-20px, 20px) rotate(-5deg); }
        }
        .particle { position: absolute; background: white; border-radius: 50%; opacity: 0.1; pointer-events: none; animation: float 15s ease-in-out infinite; }
        
        /* Holographic Flicker */
        @keyframes flicker {
          0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% { opacity: 1; filter: brightness(1); }
          20%, 21.999%, 63%, 63.999%, 65%, 69.999% { opacity: 0.8; filter: brightness(1.5) contrast(1.2); }
        }
        .holo-flicker { animation: flicker 4s linear infinite; }
        .holo-scan { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 50%, rgba(15, 15, 15, 0.1) 50%); background-size: 100% 4px; pointer-events: none; }
      `}</style>

      <div className="grain-overlay" />
      <CustomCursor containerRef={containerRef} />

      <AnimatePresence>
        {loading && <Preloader progress={Math.min(progress, 100)} />}
      </AnimatePresence>

      {!loading && (
        <main className="w-full relative">
          <Nav />
          <Hero containerRef={containerRef} />
          <MassiveAbout containerRef={containerRef} />
          <ScrollWork containerRef={containerRef} />
          <ServicesList />
          <TechMarquee />
          <Footer />
        </main>
      )}
    </div>
  );
}

/* ── Preloader ── */
function Preloader({ progress }: { progress: number }) {
  return (
    <motion.div exit={{ y: '-100%' }} transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0f0f0f] text-[#eaddcf]">
      <div className="overflow-hidden">
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
          className="fp text-[clamp(6rem,20vw,16rem)] leading-none font-bold tracking-tighter">
          {progress}%
        </motion.div>
      </div>
      <div className="absolute bottom-10 left-10 right-10 flex justify-between fd text-xs uppercase tracking-widest opacity-50">
        <span>Loading Experience</span>
        <span>Dhruba ©2024</span>
      </div>
    </motion.div>
  );
}

/* ── Custom Mouse Cursor ── */
function CustomCursor({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, { damping: 20, stiffness: 300, mass: 0.5 });
  const smoothY = useSpring(cursorY, { damping: 20, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const move = (e: MouseEvent) => { cursorX.set(e.clientX - 10); cursorY.set(e.clientY - 10); };
    const hover = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovered(!!t.closest('a, button, .hover-trigger'));
    };
    const enter = () => setVisible(true);
    const leave = () => setVisible(false);

    el.addEventListener('mousemove', move);
    el.addEventListener('mouseover', hover);
    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);

    return () => {
      el.removeEventListener('mousemove', move);
      el.removeEventListener('mouseover', hover);
      el.removeEventListener('mouseenter', enter);
      el.removeEventListener('mouseleave', leave);
    };
  }, [cursorX, cursorY, containerRef]);

  return (
    <motion.div style={{ x: smoothX, y: smoothY, opacity: visible ? 1 : 0 }}
      className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none mix-blend-difference flex items-center justify-center z-[9999]"
      animate={{ scale: hovered ? 4 : 1, backgroundColor: hovered ? '#fff' : '#fff' }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}>
      {hovered && <span className="text-black text-[3px] font-bold tracking-widest uppercase">View</span>}
    </motion.div>
  );
}

/* ── Nav ── */
function Nav() {
  return (
    <nav className="absolute top-0 left-1/2 w-[90%] -translate-x-1/2 z-50 mix-blend-difference text-white py-6 flex justify-between items-center pointer-events-none">
      <div className="flex items-center gap-4 pointer-events-auto">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
          <img src="/image/pp.jpeg" alt="Dhruba" className="w-full h-full object-cover" />
        </div>
        <div className="fp text-xl font-bold uppercase tracking-tight">Dhruba</div>
      </div>
      <Magnetic>
        <a href="mailto:dhrubarajchaudhary498@gmail.com"
          className="hover-trigger fd text-[10px] uppercase tracking-[0.2em] font-bold pointer-events-auto block px-4 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all">
          Available for Work
        </a>
      </Magnetic>
    </nav>
  );
}

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set(clientX - centerX);
    y.set(clientY - centerY);
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className="pointer-events-auto"
    >
      {children}
    </motion.div>
  );
}

/* ── Hero (Immersive) ── */
function Hero({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({ container: containerRef });
  const yScroll = useTransform(scrollYProgress, [0, 1], [0, 800]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Interaction Values
  const textX = useSpring(useTransform(mouseX, [0, 1000], [-30, 30]), { stiffness: 50, damping: 20 });
  const textY = useSpring(useTransform(mouseY, [0, 1000], [-20, 20]), { stiffness: 50, damping: 20 });

  // 3D Expansion based on mouse distance from center
  const expansion = useSpring(useTransform(mouseX, [0, 1000], [1, 2.5]), { stiffness: 30, damping: 10 });
  const rotateX = useSpring(useTransform(mouseY, [0, 1000], [15, -15]), { stiffness: 40, damping: 15 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1000], [-15, 15]), { stiffness: 40, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="min-h-screen w-full relative flex flex-col justify-center p-6 @md:p-12 pt-32 overflow-hidden bg-[#eaddcf]"
    >
      <motion.div
        style={{
          y: yScroll,
          opacity,
          rotateX,
          rotateY
        }}
        className="absolute inset-0 flex flex-col justify-center items-center @md:items-end pointer-events-none overflow-visible px-6 @md:px-[10%]"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#d4c3b3] to-[#eaddcf] blur-[150px] opacity-50 mix-blend-multiply" />

        {/* Fractal Architect Core */}
        <div className="relative w-[70vw] h-[70vw] @md:w-[45vw] @md:h-[45vw] max-w-[500px] max-h-[500px] flex items-center justify-center" style={{ perspective: '2000px' }}>
          <div className="fractal-container w-full h-full relative flex items-center justify-center">

            {/* Outer Wireframe Shell */}
            <motion.div
              style={{ scale: expansion }}
              className="fractal-box w-full h-full"
            >
              {[0, 90, 180, 270].map(deg => (
                <div key={deg} className="fractal-face w-full h-full absolute" style={{ transform: `rotateY(${deg}deg) translateZ(clamp(150px, 35vw, 250px))` }} />
              ))}
            </motion.div>

            {/* Middle Layer (Rotating opposite) */}
            <motion.div
              animate={{ rotateY: -360, rotateX: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              style={{ scale: useTransform(expansion, [1, 2.5], [0.7, 1.2]) }}
              className="fractal-box accent w-[70%] h-[70%]"
            >
              {[0, 90, 180, 270].map(deg => (
                <div key={deg} className="fractal-face w-full h-full absolute" style={{ transform: `rotateY(${deg}deg) translateZ(clamp(100px, 24vw, 175px))` }} />
              ))}
            </motion.div>

            {/* Inner Core (Highly detailed) */}
            <motion.div
              animate={{ rotateZ: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              style={{ scale: 0.4 }}
              className="fractal-box w-[40%] h-[40%] border-[#d94a38]"
            >
              {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                <div key={deg} className="absolute inset-0 border border-[#d94a38]/40" style={{ transform: `rotateY(${deg}deg)` }} />
              ))}
              <div className="absolute inset-0 bg-[#d94a38] rounded-full blur-2xl opacity-20 animate-pulse" />
            </motion.div>

            {/* Data Rings */}
            <div className="absolute w-[120%] h-[120%] border border-dashed border-[#0f0f0f]/5 rounded-full" />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="absolute w-[140%] h-[140%] border border-dotted border-[#d94a38]/5 rounded-full"
            />
          </div>
        </div>
      </motion.div>

      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, 300]), x: textX }} className="relative z-10 w-full mb-12 @md:mb-0 px-6 @md:px-12">
        <h1 className="fp text-[clamp(2.5rem,10cqw,14rem)] leading-[0.85] font-black uppercase flex flex-col break-words">
          <span className="overflow-hidden"><motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.1, duration: 1, ease: [0.76, 0, 0.24, 1] }} className="block">Digital</motion.span></span>
          <span className="overflow-hidden"><motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.2, duration: 1, ease: [0.76, 0, 0.24, 1] }} className="block text-[#d94a38]">Architect</motion.span></span>
        </h1>
        <div className="flex flex-col @md:flex-row justify-between items-start @md:items-end mt-8 gap-6 relative z-10 border-t border-[#0f0f0f]/10 pt-8 w-full">
          <div className="flex flex-col gap-3">
            <span className="fd text-[9px] uppercase tracking-[0.3em] font-bold text-[#d94a38] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d94a38] animate-ping" />
              Systems Online
            </span>
            <div className="flex flex-wrap gap-4 fd text-[9px] @md:text-[10px] font-bold text-[#0f0f0f]/50 uppercase tracking-widest">
              <span><span className="text-[#0f0f0f]">SYS:</span> NOMINAL</span>
              <span><span className="text-[#0f0f0f]">UPTIME:</span> 99.9%</span>
              <span><span className="text-[#0f0f0f]">L/LON:</span> 27.7°N 85.3°E</span>
            </div>
          </div>
          <p className="fd text-xs @md:text-base max-w-sm font-medium leading-relaxed opacity-80">
            I engineer seamless, high-performance web and mobile experiences. Based in Kathmandu, building for the world.
          </p>
          <div className="fd text-[9px] uppercase tracking-[0.2em] font-bold text-[#0f0f0f] animate-pulse">
            Scroll to explore ↓
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ── Massive About (Scroll Reveal) ── */
function MassiveAbout({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef, target: ref, offset: ["start end", "end start"] });

  const text = "I craft work that defines the now and shapes what is next. Bridging the gap between flawless aesthetics and uncompromising technical architecture.";
  const words = text.split(" ");

  return (
    <section ref={ref} className="py-32 @md:py-64 px-6 @md:px-12 flex items-center min-h-screen relative overflow-hidden">
      {/* 3D Blueprint Grid Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f0f_1px,transparent_1px),linear-gradient(to_bottom,#0f0f0f_1px,transparent_1px)] bg-[size:4rem_4rem]"
          style={{ transform: 'perspective(1000px) rotateX(60deg) translateY(-20%) scale(2)', transformOrigin: 'top' }} />
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        <div className="flex flex-col gap-12">
          <div className="flex items-center gap-4">
            <span className="w-12 h-[1px] bg-[#d94a38]" />
            <span className="fd text-[10px] uppercase tracking-[0.4em] font-bold text-[#d94a38]">Ethos & Vision</span>
          </div>

          <div className="flex flex-wrap gap-x-[0.3em] gap-y-[0.1em]">
            {words.map((word, i) => (
              <Word key={i} word={word} index={i} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Word({ word, index, progress }: { word: string; index: number; progress: any }) {
  const start = index / 60;
  const end = start + 0.15;

  const opacity = useTransform(progress, [start, end], [0.1, 1]);
  const rotateX = useTransform(progress, [start, end], [90, 0]);
  const blur = useTransform(progress, [start, end], [10, 0]);
  const y = useTransform(progress, [start, end], [20, 0]);

  return (
    <motion.span
      style={{
        opacity,
        rotateX,
        filter: `blur(${blur}px)`,
        y,
        transformStyle: 'preserve-3d',
        display: 'inline-block'
      }}
      className="fp text-[clamp(2rem,6vw,5rem)] leading-[1.1] font-bold text-[#0f0f0f]"
    >
      {word}
    </motion.span>
  );
}

/* ── Scroll Work (Parallax Immersive) ── */
function ScrollWork({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef, target: ref, offset: ["start end", "end start"] });

  // Background Transition: From Cream to subtly tinted variations
  const bgColor = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], ["#eaddcf", "#d4c3b3", "#eaddcf", "#d4c3b3"]);

  const projects = [
    {
      title: 'Trust Nepal Escrow',
      cat: 'Fintech Platform',
      img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070',
      tag: 'Secure P2P',
      tech: ['Flutter', 'Firebase', 'Node.js'],
      year: '2024',
      desc: 'An automated escrow system designed for the Nepali market, providing secure transaction mediation and integrated payment verification.',
      hud: { perf: '98', engine: 'Impeller', build: '2.4ms' }
    },
    {
      title: 'Focusflow',
      cat: 'Productivity Tool',
      img: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072',
      tag: 'Deep Work',
      tech: ['Dart', 'SQLite', 'Bloc'],
      year: '2023',
      desc: 'A distraction-free task management ecosystem built to optimize cognitive load and enhance developer productivity through time-boxing.',
      hud: { perf: '99', engine: 'Skia', build: '1.8ms' }
    },
    {
      title: 'Confess Nepal',
      cat: 'Social Platform',
      img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2064',
      tag: 'Anonymous Express',
      tech: ['React', 'Next.js', 'PostgreSQL'],
      year: '2024',
      desc: 'A digital space for anonymous expression and community interaction, featuring real-time moderation and sentiment-based content sorting.',
      hud: { perf: '97', engine: 'V8', build: '3.1ms' }
    },
    {
      title: 'Job Portal',
      cat: 'Employment Engine',
      img: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072',
      tag: 'Career Growth',
      tech: ['Next.js', 'Prisma', 'Tailwind'],
      year: '2024',
      desc: 'A high-performance recruitment platform connecting top talent with industry leaders through intelligent matching algorithms.',
      hud: { perf: '96', engine: 'Chromium', build: '4.2ms' }
    },
    {
      title: 'Veg Typing',
      cat: 'Typing Utility',
      img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070',
      tag: 'Transliteration',
      tech: ['Typescript', 'i18n', 'RegEx'],
      year: '2023',
      desc: 'An advanced transliteration engine designed for fast and accurate Nepali typing, supporting multiple local keyboard standards.',
      hud: { perf: '99', engine: 'JS-Core', build: '0.8ms' }
    },
    {
      title: 'Loksewa Tayari',
      cat: 'EdTech Platform',
      img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2074',
      tag: 'Exam Prep',
      tech: ['Flutter', 'Laravel', 'MySQL'],
      year: '2024',
      desc: 'A comprehensive study companion for Public Service Commission aspirants, featuring mock exams, offline study material, and progress tracking.',
      hud: { perf: '95', engine: 'Impeller', build: '5.2ms' }
    },
  ];

  return (
    <motion.section ref={ref} style={{ backgroundColor: bgColor }} className="py-24 w-full transition-colors duration-700">
      <div className="px-6 @md:px-12 mb-20 flex justify-between items-end">
        <h2 className="fp text-5xl @md:text-8xl font-black uppercase">Selected<br />Works</h2>
        <span className="fd text-[10px] uppercase tracking-widest font-bold">(06)</span>
      </div>

      <div className="flex flex-col gap-32 @md:gap-64 w-full">
        {projects.map((p, i) => (
          <ProjectItem key={i} p={p} i={i} containerRef={containerRef} />
        ))}
      </div>
    </motion.section>
  );
}

function ProjectItem({ p, i, containerRef }: { p: any; i: number; containerRef: React.RefObject<HTMLDivElement | null> }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef, target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"]);
  const isLeft = i % 2 === 0;

  // 3D Tilt
  const x = useMotionValue(0);
  const yM = useMotionValue(0);
  const rotateX = useSpring(useTransform(yM, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

  function handleMouse(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    yM.set(mouseY / height - 0.5);
  }

  return (
    <div ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); yM.set(0); }}
      className={`relative w-full px-6 @md:px-12 flex flex-col ${isLeft ? '@md:flex-row' : '@md:flex-row-reverse'} items-center gap-12 @md:gap-24 hover-trigger cursor-pointer group`}>
      {/* Image Block */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="w-full @md:w-[60%] h-[50vh] @md:h-[80vh] overflow-hidden relative bg-[#d4c3b3] shadow-2xl">
        <motion.img
          style={{ y, scale: 1.1 }}
          src={p.img}
          className="absolute inset-0 w-full h-full object-cover origin-center group-hover:scale-[1.15] transition-transform duration-[1.5s] ease-out"
        />

        {/* Project HUD */}
        <div className="absolute top-6 left-6 flex flex-col gap-2 z-20 pointer-events-none group-hover:translate-y-2 transition-transform duration-700">
          <div className="fd text-[8px] uppercase tracking-[0.3em] font-bold text-white/40">Spec Sheet</div>
          <div className="flex flex-col gap-1 fd text-[10px] font-bold uppercase tracking-widest text-white/80">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span>Perf: {p.hud.perf}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d94a38]" />
              <span>Engine: {p.hud.engine}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span>Build: {p.hud.build}</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <span className="fd text-[8px] uppercase tracking-[0.4em] font-bold text-white/30">Target: ARCH_VIEW</span>
          <span className="fd text-[8px] uppercase tracking-[0.4em] font-bold text-white/30">ID: PRJ-00{i + 1}</span>
        </div>

        <div className="absolute inset-0 bg-[#0f0f0f]/10 group-hover:bg-transparent transition-colors duration-700" />
      </motion.div>

      {/* Text Block Parallax */}
      <motion.div style={{ y: textY }} className="w-full @md:w-[40%] flex flex-col relative z-10">
        <div className="flex justify-between items-center mb-6">
          <span className="fd text-[10px] uppercase tracking-[0.3em] font-bold text-[#d94a38]">{p.cat}</span>
          <span className="fd text-[9px] uppercase tracking-widest font-bold text-[#0f0f0f]/30">Vol {i + 1}.0</span>
        </div>
        <h3 className="fp text-5xl @md:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-8">{p.title}</h3>

        <p className="fd text-sm @md:text-base text-[#0f0f0f]/60 font-medium leading-relaxed mb-8 max-w-sm">
          {p.desc}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {p.tech.map((t: string) => (
            <span key={t} className="fd text-[8px] font-bold uppercase tracking-widest border border-[#0f0f0f]/10 px-2 py-1 rounded-sm">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-8 border-t border-[#0f0f0f]/20 flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <span className="fd text-[8px] uppercase font-bold text-[#0f0f0f]/40">Production Year</span>
            <span className="fd text-xs font-bold uppercase">{p.year}</span>
          </div>
          <span className="fd text-xs font-bold group-hover:translate-x-2 transition-transform px-4 py-2 bg-[#0f0f0f] text-[#eaddcf] rounded-full">Case Study →</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Type Reveal Component ── */
function TypeReveal({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className={`${className} flex flex-wrap`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.05, delay: i * 0.03 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}

/* ── Interactive Services List ── */
function ServicesList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const services = [
    {
      title: 'Frontend Engineering',
      sub: 'React / Next.js / Animations',
      desc: 'Crafting high-performance, pixel-perfect interfaces with advanced state management and fluid motion systems.',
      tech: 'TS · NEXT · FRAMER',
      features: ['Dynamic Layouts', 'SEO Optimization', 'Core Web Vitals', 'State Management'],
      img: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070'
    },
    {
      title: 'Backend Architecture',
      sub: 'Node.js / Databases / APIs',
      desc: 'Engineering scalable, secure server environments and robust database schemas for complex data ecosystems.',
      tech: 'NODE · POSTGRES · REDIS',
      features: ['Auth Systems', 'API Design', 'DB Optimization', 'Microservices'],
      img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072'
    },
    {
      title: 'Mobile Development',
      sub: 'Flutter / Native Performance',
      desc: 'Building natively compiled, feature-rich cross-platform applications with clean, maintainable architecture.',
      tech: 'FLUTTER · DART · FIREBASE',
      features: ['Native Bridges', 'Push Notifications', 'Offline Sync', 'App Store Ops'],
      img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070'
    },
    {
      title: 'UI/UX Interaction',
      sub: 'Prototyping / Design Systems',
      desc: 'Designing intuitive user journeys and scalable design languages that bridge the gap between form and function.',
      tech: 'FIGMA · DESIGN SYSTEMS',
      features: ['User Research', 'Prototyping', 'Design Tokens', 'Motion Logic'],
      img: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070'
    }
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="py-32 @md:py-48 px-6 @md:px-12 bg-[#0f0f0f] text-[#eaddcf] relative overflow-hidden"
    >
      {/* Floating Preview Image */}
      <motion.div
        style={{
          x: useSpring(mouseX, { stiffness: 100, damping: 20 }),
          y: useSpring(mouseY, { stiffness: 100, damping: 20 }),
          pointerEvents: 'none'
        }}
        className="absolute w-64 h-40 z-50 overflow-hidden rounded-lg shadow-2xl opacity-0 hidden @md:block"
        animate={{
          opacity: hoveredIndex !== null ? 1 : 0,
          scale: hoveredIndex !== null ? 1 : 0.8,
          rotate: hoveredIndex !== null ? 5 : 0
        }}
      >
        {services.map((s, i) => (
          <motion.img
            key={i}
            src={s.img}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
          />
        ))}
      </motion.div>
      <div className="mb-20 flex justify-between items-baseline">
        <div className="flex flex-col gap-2">
          <TypeReveal text="CAPABILITIES" className="fd text-[10px] uppercase tracking-[0.3em] font-bold text-[#d94a38]" />
          <h2 className="fp text-4xl font-bold uppercase"><TypeReveal text="MY EXPERTISE" /></h2>
        </div>
        <span className="fd text-[9px] uppercase tracking-widest font-bold text-white/20">Expand for details</span>
      </div>

      <div className="flex flex-col border-t border-[#eaddcf]/10">
        {services.map((s, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group flex flex-col py-8 border-b border-[#eaddcf]/10 hover:border-[#d94a38] transition-colors duration-500 cursor-pointer hover-trigger"
          >
            <div className="flex flex-col @md:flex-row justify-between items-start @md:items-center gap-6">
              <div className="flex items-center gap-8">
                <span className="fm text-xs opacity-30">0{i + 1}</span>
                <h3 className="fp text-3xl @md:text-5xl font-bold uppercase tracking-tight transition-all duration-500 group-hover:text-[#d94a38]">
                  {s.title}
                </h3>
              </div>
              <div className="flex items-center gap-6">
                <span className="fd text-[10px] uppercase tracking-widest font-bold text-white/30 group-hover:text-[#d94a38] transition-colors">{s.tech}</span>
                <motion.div
                  animate={{ rotate: hoveredIndex === i ? 45 : 0 }}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:border-[#d94a38] group-hover:text-[#d94a38]"
                >
                  +
                </motion.div>
              </div>
            </div>

            <AnimatePresence>
              {hoveredIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col @md:flex-row gap-12 @md:gap-32 pt-12 pb-8 @md:ml-16">
                    <div className="flex flex-col gap-6 max-w-xl">
                      <span className="fd text-[9px] uppercase tracking-[0.2em] font-bold text-white/30">Description</span>
                      <p className="fd text-base text-white/50 leading-relaxed italic">
                        "{s.desc}"
                      </p>
                    </div>

                    <div className="flex flex-col gap-6">
                      <span className="fd text-[9px] uppercase tracking-[0.2em] font-bold text-white/30">Core Specialities</span>
                      <div className="grid grid-cols-1 @md:grid-cols-2 gap-x-12 gap-y-3">
                        {s.features.map(f => (
                          <div key={f} className="flex items-center gap-3">
                            <span className="w-1 h-1 rounded-full bg-[#d94a38]" />
                            <span className="fd text-[11px] uppercase tracking-widest font-bold text-[#eaddcf]">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Massive Marquee (Holographic Data Stream) ── */
function TechMarquee() {
  const tech = "FLUTTER — REACT — NEXT.JS — NODE — TYPESCRIPT — MONGODB — DART — FIGMA — ".repeat(3);
  const [speed, setSpeed] = useState(30);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const percentage = x / width;
    const newSpeed = 45 - (Math.abs(percentage - 0.5) * 70);
    setSpeed(Math.max(8, newSpeed));
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setSpeed(30)}
      className="py-48 overflow-hidden bg-[#d94a38] text-[#0f0f0f] relative cursor-none"
      style={{ perspective: '2000px' }}
    >
      <div className="absolute top-12 left-12 z-30">
        <TypeReveal text="TECH_STACK_CORE" className="fd text-[9px] uppercase tracking-[0.5em] font-black text-[#0f0f0f]/40" />
      </div>

      <div className="holo-scan z-20" />

      {/* Background Layer (Opposite direction) */}
      <motion.div
        animate={{ x: ["-50%", "0%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: speed * 1.5 }}
        style={{ rotateX: '-20deg', rotateY: '10deg', transformStyle: 'preserve-3d', opacity: 0.15 }}
        className="flex whitespace-nowrap w-max absolute top-1/2 -translate-y-1/2 left-0 select-none pointer-events-none"
      >
        <h2 className="fp text-[15rem] @md:text-[22rem] leading-none font-black tracking-tighter uppercase">
          {tech}
        </h2>
      </motion.div>

      {/* Main Layer */}
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: speed }}
        style={{ rotateX: '15deg', rotateY: '-5deg', transformStyle: 'preserve-3d' }}
        className="flex whitespace-nowrap w-max relative z-10 holo-flicker"
      >
        <h2 className="fp text-[12rem] @md:text-[18rem] leading-none font-black tracking-tighter uppercase drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          {tech}
        </h2>
      </motion.div>

      {/* Foreground Accent Layer */}
      <motion.div
        animate={{ x: ["-25%", "-75%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: speed * 0.5 }}
        style={{ rotateX: '30deg', rotateY: '-15deg', transformStyle: 'preserve-3d', opacity: 0.1 }}
        className="flex whitespace-nowrap w-max absolute top-[60%] left-0 select-none pointer-events-none blur-[2px]"
      >
        <h2 className="fp text-[8rem] @md:text-[12rem] leading-none font-black tracking-tighter uppercase">
          {tech}
        </h2>
      </motion.div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  const [isHovered, setIsHovered] = useState(false);
  const email = "hello@dhruba.studio";
  const [displayText, setDisplayText] = useState("Let's Talk");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&*";

  useEffect(() => {
    let interval: any;
    if (isHovered) {
      let iteration = 0;
      interval = setInterval(() => {
        setDisplayText(email.split("").map((char, index) => {
          if (index < iteration) return email[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join(""));
        if (iteration >= email.length) clearInterval(interval);
        iteration += 1 / 3;
      }, 30);
    } else {
      setDisplayText("Let's Talk");
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <footer className="min-h-screen flex flex-col justify-between p-6 @md:p-12 bg-[#0f0f0f] text-[#eaddcf] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] border border-[#eaddcf]/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] border border-[#eaddcf]/5 rounded-full" />
      </div>

      <div className="mt-20 flex flex-col @md:flex-row justify-between items-start @md:items-end gap-12 relative z-10">
        <Magnetic>
          <a href={`mailto:${email}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="block group hover-trigger">
            <TypeReveal text="INITIATE_CONVERSATION" className="fd text-[10px] uppercase tracking-[0.3em] font-bold text-[#d94a38] mb-6" />
            <h2 className="fp text-[clamp(3rem,12vw,14rem)] leading-[0.8] font-black uppercase text-[#eaddcf] group-hover:text-[#d94a38] transition-colors duration-500 break-all max-w-[90vw]">
              {displayText}
            </h2>
          </a>
        </Magnetic>

        <div className="flex flex-col gap-6 max-w-xs border-l border-[#eaddcf]/20 pl-8">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="fd text-[10px] uppercase tracking-widest font-bold">Transmission Protocol: Active</span>
          </div>
          <p className="fd text-xs text-white/40 leading-relaxed">
            Currently accepting select high-impact projects for Q3/Q4 2024. Average response time: <span className="text-white">4.2 hours</span>.
          </p>
          <div className="flex flex-col gap-1 fd text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">
            <span>Encryption: AES-256</span>
            <span>Secure Link: Established</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col @md:flex-row justify-between items-end gap-12 border-t border-[#eaddcf]/20 pt-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-[#d94a38]/20" />

        <div className="flex flex-wrap gap-12 w-full @md:w-auto">
          <div className="flex flex-col gap-4">
            <span className="fd text-[9px] uppercase tracking-[0.3em] font-bold text-white/30">Connect</span>
            <div className="flex flex-col gap-2">
              <a href="https://github.com/iamdhruba" target="_blank" rel="noopener noreferrer" className="fd text-xs font-bold uppercase tracking-wider hover:text-[#d94a38] transition-colors">Github</a>
              <a href="https://www.linkedin.com/in/dhruba-raj-chaudhary-bb7b392ba/" target="_blank" rel="noopener noreferrer" className="fd text-xs font-bold uppercase tracking-wider hover:text-[#d94a38] transition-colors">LinkedIn</a>
              <a href="https://www.instagram.com/saydhruba" target="_blank" rel="noopener noreferrer" className="fd text-xs font-bold uppercase tracking-wider hover:text-[#d94a38] transition-colors">Instagram</a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="fd text-[9px] uppercase tracking-[0.3em] font-bold text-white/30">System HUD</span>
            <div className="flex flex-col gap-1 fd text-[10px] font-bold uppercase tracking-widest text-white/50">
              <div className="flex justify-between gap-4"><span>Status:</span> <span className="text-green-500">Live</span></div>
              <div className="flex justify-between gap-4"><span>Version:</span> <span>4.2.0</span></div>
              <div className="flex justify-between gap-4"><span>Region:</span> <span>AS-S</span></div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="fd text-[9px] uppercase tracking-[0.3em] font-bold text-white/30">Architecture</span>
            <div className="flex items-center gap-6">
              <div className="relative w-12 h-12 perspective-[500px]">
                <div className="sphere-container w-full h-full">
                  {[0, 45, 90, 135].map(deg => (
                    <div key={deg} className="sphere-ring" style={{ transform: `rotateY(${deg}deg)` }} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1 fd text-[10px] font-bold uppercase tracking-widest text-white/50">
                <div>27.7172° N</div>
                <div>85.3240° E</div>
                <div className="text-[#d94a38]">UTC+5:45</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="fd text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">Dhruba © 2024</div>
          <div className="fd text-[8px] font-black uppercase tracking-widest text-[#d94a38]">Crafted for Excellence</div>
        </div>
      </div>
    </footer>
  );
}
