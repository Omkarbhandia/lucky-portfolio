"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16); // center the 32px circle
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("button, a, .magnetic-target");
      
      if (interactiveEl) {
        setIsHovering(true);
        if (interactiveEl.hasAttribute("data-cursor-text")) {
          setHoverText(interactiveEl.getAttribute("data-cursor-text") || "");
        } else {
          setHoverText("");
        }
      } else {
        setIsHovering(false);
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{
        left: smoothX,
        top: smoothY,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isHovering ? (hoverText ? 3 : 1.5) : 1, 
        opacity: 1 
      }}
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/50 mix-blend-difference pointer-events-none z-[9999] flex items-center justify-center bg-white/10 backdrop-blur-sm"
    >
      {hoverText && (
        <span className="text-[4px] font-bold tracking-widest uppercase text-white scale-[0.33]">
          {hoverText}
        </span>
      )}
    </motion.div>
  );
}
