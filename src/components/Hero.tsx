"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

// ----------------------------------------------------------------------
// HELPER COMPONENT: Smooth Animated Counter
// ----------------------------------------------------------------------
function AnimatedCounter({ from, to }: { from: number; to: number }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    const controls = animate(count, to, { duration: 2.5, ease: "easeOut", delay: 0.2 });
    return controls.stop;
  }, [count, to]);

  return <motion.span>{rounded}</motion.span>;
}

// ======================================================================
// MAIN HERO COMPONENT
// ======================================================================
export default function Hero() {
  const TOTAL_VIEWS = 43202000; // 43.2M based on sum of vlogs and reels

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#050505] flex items-center justify-center">
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-[#050505]">
        <motion.img
          src="https://res.cloudinary.com/dw8qdtrhu/image/upload/v1779627674/portfolio-reels/IMG_3091_peotkn.jpg"
          alt="Lucky Gawle - Architect"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 25, ease: "easeInOut", repeat: Infinity }}
          className="absolute inset-0 w-full h-full object-cover opacity-[0.25] grayscale mix-blend-luminosity"
        />
        {/* Custom SVG Film Grain Texture */}
        <div 
          className="absolute inset-0 opacity-[0.15] mix-blend-screen pointer-events-none"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
        />
        {/* Deep Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-[#050505]/30" />
      </div>

      {/* 
        ========================================================
        THE CAMERA TIMECODE
        ========================================================
      */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-8 right-6 md:right-12 z-20 flex items-center gap-3 bg-transparent text-white/80 font-mono text-xs md:text-sm uppercase tracking-widest"
      >
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span>[REC] VIEWS_GEN:</span>
        <span className="font-bold text-white"><AnimatedCounter from={0} to={TOTAL_VIEWS} />+</span>
      </motion.div>

      {/* Main Center Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 w-full px-6 md:px-12 flex flex-col items-center justify-center text-center mt-[-10vh]"
      >
        <h1 className="font-display text-5xl sm:text-7xl md:text-9xl font-semibold tracking-tighter uppercase leading-[0.9] text-white">
          LUCKY GAWLE
        </h1>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-6 text-xl md:text-2xl font-light tracking-wide text-white/80 max-w-2xl"
        >
          The Architect of Videos & Vlogs: <br className="md:hidden" />
          <span className="font-display font-medium text-white italic tracking-normal">Storyteller, Videographer, Scriptwriter, & Lead Video Editor.</span>
        </motion.h2>
      </motion.div>

      {/* Raw Editorial Bio (Bottom Left) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-12 left-6 md:left-12 max-w-[240px] md:max-w-[320px] z-20"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1.5 h-1.5 bg-red-500" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50">Current Mission</span>
        </div>
        <p className="font-mono text-[10px] text-white/40 uppercase leading-loose tracking-widest">
          Operating as a creative strategist, lead editor, and visual director. Translating complex mandates into viral retention through precision videography, high-end photography, and relentless editing for high-profile creators.
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 right-6 md:right-12 flex flex-col items-center opacity-50 z-20">
        <span className="font-display tracking-[0.2em] text-[10px] text-white mb-4 uppercase rotate-90 origin-bottom">Scroll</span>
        <div className="w-[1px] h-16 bg-white/20 overflow-hidden relative">
          <motion.div
            animate={{ y: [0, 64] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-full h-8 bg-white absolute top-0"
          />
        </div>
      </div>
    </section>
  );
}
