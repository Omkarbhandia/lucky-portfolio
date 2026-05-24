"use client";

import { useState } from "react";

export default function ContactFooter() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const details = formData.get("details");
    
    const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (!WEB3FORMS_KEY) {
      alert("Web3Forms Key is missing. Please add NEXT_PUBLIC_WEB3FORMS_KEY to your .env.local file.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: name,
          email: email,
          message: details,
          subject: `Portfolio Inquiry from ${name}`,
        }),
      });

      if (response.status === 200) {
        setIsSuccess(true);
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative bg-[#050505] pt-32 pb-16 px-6 md:px-12 border-t border-white/5 mx-auto w-full">
      <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-16 mb-32">
        {/* Contact Form Side */}
        <div className="w-full md:w-1/3">
          <h2 className="font-display text-2xl uppercase tracking-widest text-white/40 mb-8 font-medium">
            Initiate Project
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full group magnetic-target" data-cursor-text="TYPE">
            <input 
              name="name"
              type="text" 
              placeholder="YOUR NAME" 
              className="bg-transparent border-b border-white/20 pb-4 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors text-sm uppercase tracking-widest"
              required
            />
            <input 
              name="email"
              type="email" 
              placeholder="YOUR EMAIL" 
              className="bg-transparent border-b border-white/20 pb-4 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors text-sm uppercase tracking-widest"
              required
            />
            <textarea 
              name="details"
              placeholder="PROJECT DETAILS" 
              rows={3}
              className="bg-transparent border-b border-white/20 pb-4 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors text-sm uppercase tracking-widest resize-none"
              required
            ></textarea>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`self-start font-display text-sm uppercase tracking-[0.2em] border border-white/20 px-8 py-4 transition-colors rounded-sm ${
                isSuccess ? "bg-green-500 text-white border-green-500" : "text-white hover:bg-white hover:text-black"
              } disabled:opacity-50`}
            >
              {isSubmitting ? "Sending..." : isSuccess ? "Request Sent" : "Submit Request"}
            </button>
          </form>
        </div>

        {/* Links side */}
        <div className="flex flex-col items-start md:items-end gap-4 font-mono text-xs text-white/50 uppercase tracking-widest">
           <a href="https://www.instagram.com/luckyy__222_" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors magnetic-target">Instagram</a>
           <a href="https://www.linkedin.com/in/luckygawle/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors magnetic-target">LinkedIn</a>
        </div>
      </div>

      {/* Extreme Typography Email */}
      <div className="text-center w-full overflow-hidden">
        <a 
          href="mailto:luckygawle22@gmail.com" 
          className="font-display font-semibold text-[8vw] mix-blend-difference hover:opacity-80 transition-opacity tracking-tighter block whitespace-nowrap magnetic-target"
          data-cursor-text="SEND"
        >
          luckygawle22@gmail.com
        </a>
      </div>
      
      <div className="mt-16 text-center font-sans text-xs text-white/20 uppercase tracking-widest flex flex-col gap-2">
        <span className="text-white/40">
          © 2026 Developed by <a href="http://omkarbhandia.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors underline decoration-white/20 underline-offset-4 magnetic-target">Omkar Bhandia</a>
        </span>
      </div>
    </footer>
  );
}
