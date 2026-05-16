import React from 'react';

export default function AboutApp() {
  return (
    <div className="h-full w-full overflow-y-auto bg-[#050505] p-8 text-white hide-scrollbar font-syne">
      <div className="relative mb-12 flex flex-col items-center">
        <div className="absolute inset-0 bg-purple-600/10 blur-3xl -z-10" />
        <div className="h-28 w-28 rounded-3xl border border-white/10 bg-white/5 p-1 shadow-2xl">
          <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974" alt="Dhruba" className="h-full w-full rounded-2xl object-cover" />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight">Dhruba Raj Chaudhary</h1>
        <p className="mt-2 text-sm uppercase tracking-[0.3em] text-purple-400 font-bold">Full Stack Developer</p>
      </div>

      <div className="space-y-12">
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <span className="h-px w-8 bg-purple-500/50" />
            <h2 className="text-xs uppercase tracking-widest text-white/40">Bio</h2>
          </div>
          <p className="text-lg font-light leading-relaxed opacity-70">
            A passionate developer from Kathmandu, Nepal, dedicated to building high-performance, visually stunning digital experiences. I specialize in the MERN stack, Next.js, and mobile development with Flutter.
          </p>
        </section>

        <section className="grid grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:border-purple-500/30 transition-colors">
            <div className="text-2xl font-bold text-purple-400">4+</div>
            <div className="text-[10px] uppercase tracking-widest opacity-40 mt-1">Years Experience</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:border-purple-500/30 transition-colors">
            <div className="text-2xl font-bold text-purple-400">20+</div>
            <div className="text-[10px] uppercase tracking-widest opacity-40 mt-1">Projects Done</div>
          </div>
        </section>

        <section>
          <div className="flex items-center space-x-3 mb-6">
            <span className="h-px w-8 bg-purple-500/50" />
            <h2 className="text-xs uppercase tracking-widest text-white/40">Philosophy</h2>
          </div>
          <p className="text-lg font-light leading-relaxed opacity-70 italic font-playfair">
            "Design is not just what it looks like and feels like. Design is how it works."
          </p>
        </section>
      </div>
    </div>
  );
}
