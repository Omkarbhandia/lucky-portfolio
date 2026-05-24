"use client";

import { motion } from "framer-motion";

const TOOLS = [
  "ADOBE PREMIERE PRO",
  "AFTER EFFECTS",
  "DAVINCI RESOLVE",
  "FINAL CUT PRO",
  "FINAL DRAFT",
  "NOTION",
];

export default function ToolkitMarquee() {
  return (
    <section className="py-24 border-y border-white/5 bg-black/50 overflow-hidden flex flex-col relative w-full">
      
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

      <h3 className="text-center font-display text-sm tracking-[0.3em] uppercase text-white/40 mb-12">
        The Director's Toolkit
      </h3>

      <div className="flex w-[200%]">
        <motion.div
          className="flex whitespace-nowrap gap-16 md:gap-32 pr-16 md:pr-32 items-center justify-center"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {[...TOOLS, ...TOOLS, ...TOOLS].map((tool, index) => (
            <div key={index} className="flex items-center gap-6">
              <span className="w-2 h-2 rounded-full bg-white/20" />
              <span className="font-display text-2xl md:text-5xl font-medium tracking-tighter text-white/80 uppercase">
                {tool}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
