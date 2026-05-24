"use client";

import Hero from "@/components/Hero";
import ToolkitMarquee from "@/components/ToolkitMarquee";
import WorksGrid from "@/components/WorksGrid";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent">
      {/* 01: Identity & Hero */}
      <Hero />

      {/* 02: The Director's Toolkit Marquee */}
      <ToolkitMarquee />

      {/* 03: High-Quality Archive Grid & Cinema Mode Modal */}
      <WorksGrid limit={7} />

      {/* 04: Classy Contact Footer */}
      <ContactFooter />
    </main>
  );
}
