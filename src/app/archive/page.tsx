"use client";

import WorksGrid from "@/components/WorksGrid";
import ContactFooter from "@/components/ContactFooter";

export default function ArchivePage() {
  return (
    <main className="min-h-screen bg-[#050505]">
      {/* Complete Archive Grid */}
      <WorksGrid isArchivePage={true} />

      {/* Footer to maintain site consistency */}
      <ContactFooter />
    </main>
  );
}
