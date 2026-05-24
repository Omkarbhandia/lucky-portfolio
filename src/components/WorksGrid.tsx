"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ArrowRight } from "lucide-react";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  client: string;
  format: string;
  tech: string;
  videoSrc?: string;
  youtubeId?: string;
  poster: string;
  script?: string;
  strategy?: string;
  views?: string;
  isVertical?: boolean; // explicit flag for 9:16 vertical reels
  colSpan?: boolean; // spans 2 columns
  rowSpan?: boolean; // spans 2 rows
  vaultOnly?: boolean; // explicit flag to hide from homepage
};

const PROJECTS: Project[] = [
  {
    id: "vlog7",
    title: "Latest Vlog (Vlog 07)",
    client: "Personal Channel",
    format: "Vlog Format",
    views: "1.1M",
    tech: "Premiere Pro / After Effects",
    youtubeId: "0394hg6bhMU",
    poster: "https://img.youtube.com/vi/0394hg6bhMU/maxresdefault.jpg",
    strategy: "THE STRATEGY:\nMastering narrative momentum through advanced sound design and invisible cuts.",
    colSpan: true,
    vaultOnly: true,
  },
  {
    id: "vlog6",
    title: "New Cinematic Cut (Vlog 06)",
    client: "Personal Channel",
    format: "Vlog Format",
    views: "753K",
    tech: "Premiere Pro / After Effects",
    youtubeId: "_zToIOVkB6k",
    poster: "https://img.youtube.com/vi/_zToIOVkB6k/maxresdefault.jpg",
    strategy: "THE STRATEGY:\nHigh-end cinematic pacing and dynamic storytelling designed to retain viewer attention.",
    colSpan: true,
    vaultOnly: true,
  },
  {
    id: "vlog1",
    title: "The Vision (Vlog 01)",
    client: "Personal Channel",
    format: "Vlog Format",
    views: "855K",
    tech: "Premiere Pro",
    youtubeId: "fxrwBYNG00c",
    poster: "https://img.youtube.com/vi/fxrwBYNG00c/maxresdefault.jpg",
    strategy: "THE STRATEGY:\nEstablishing the core narrative style for the ongoing vlog series. Focused on fast-paced, engaging cuts and direct-to-camera connection to build a parasocial relationship with the audience.",
    colSpan: true,
    rowSpan: true, // Massive 2x2 Feature block
  },
  {
    id: "reel15",
    title: "Storytelling Reel",
    client: "Social Campaign",
    format: "Vertical Reel",
    views: "1.8M",
    tech: "Premiere Pro",
    videoSrc: "https://res.cloudinary.com/dw8qdtrhu/video/upload/v1779623408/portfolio-reels/Video_10_yb4xjw.mp4",
    poster: "https://res.cloudinary.com/dw8qdtrhu/video/upload/v1779623408/portfolio-reels/Video_10_yb4xjw.jpg",
    strategy: "THE STRATEGY:\nExcellent storytelling combined with narrative momentum to drive massive viewer retention.",
    isVertical: true,
    rowSpan: true, // Tall 1x2 block
  },
  {
    id: "reel2",
    title: "Dynamic Hook",
    client: "Social Campaign",
    format: "Vertical Reel",
    views: "30K",
    tech: "After Effects",
    videoSrc: "https://res.cloudinary.com/dw8qdtrhu/video/upload/v1778743678/portfolio-reels/Video2_nokd3w.mp4",
    poster: "https://res.cloudinary.com/dw8qdtrhu/video/upload/v1778743678/portfolio-reels/Video2_nokd3w.jpg",
    strategy: "THE STRATEGY:\nUtilizing dynamic text animation and heavy sound design to force retention during audio-off and audio-on environments alike.",
    isVertical: true,
    rowSpan: true,
  },
  {
    id: "reel3",
    title: "Pacing Study",
    client: "Social Campaign",
    format: "Vertical Reel",
    views: "5.8M",
    tech: "Premiere Pro",
    videoSrc: "https://res.cloudinary.com/dw8qdtrhu/video/upload/v1778743667/portfolio-reels/Video13_tromea.mp4",
    poster: "https://res.cloudinary.com/dw8qdtrhu/video/upload/v1778743667/portfolio-reels/Video13_tromea.jpg",
    strategy: "THE STRATEGY:\nA deliberate break from hyper-editing. Allowing the subject room to breathe, leveraging negative space in the edit to build tension.",
    isVertical: true,
    rowSpan: true,
  },
  {
    id: "vlog2",
    title: "Building The Arc (Vlog 02)",
    client: "Personal Channel",
    format: "Vlog Format",
    views: "1.1M",
    tech: "Final Cut Pro",
    youtubeId: "_lOPEEqHf5I",
    poster: "https://img.youtube.com/vi/_lOPEEqHf5I/maxresdefault.jpg",
    strategy: "THE STRATEGY:\nDeepening the storytelling through dynamic b-roll and rhythmic editing to keep audience retention high throughout the narrative arc.",
    colSpan: true, // Wide 2x1 block
  },
  {
    id: "reel4",
    title: "Cinematic Cut",
    client: "Social Campaign",
    format: "Vertical Reel",
    views: "852K",
    tech: "DaVinci Resolve",
    videoSrc: "https://res.cloudinary.com/dw8qdtrhu/video/upload/v1778743663/portfolio-reels/Video10_b8zijq.mp4",
    poster: "https://res.cloudinary.com/dw8qdtrhu/video/upload/v1778743663/portfolio-reels/Video10_b8zijq.jpg",
    strategy: "THE STRATEGY:\nApplying film-level color grading pipelines to vertical iPhone footage. Transforming raw mobile content into premium brand assets.",
    isVertical: true,
    rowSpan: true,
  },
  {
    id: "vlog3",
    title: "Cinematic Push (Vlog 03)",
    client: "Personal Channel",
    format: "Vlog Format",
    views: "1.3M",
    tech: "DaVinci Resolve",
    youtubeId: "zLydqaHIwDQ",
    poster: "https://img.youtube.com/vi/zLydqaHIwDQ/maxresdefault.jpg",
    strategy: "THE STRATEGY:\nExperimenting with color grading and cinematic composition within a raw vlog format to elevate the production value.",
    colSpan: true, // Wide 2x1 block
  },
  {
    id: "reel5",
    title: "Visual Momentum",
    client: "Social Campaign",
    format: "Vertical Reel",
    views: "6.5M",
    tech: "Premiere Pro",
    videoSrc: "https://res.cloudinary.com/dw8qdtrhu/video/upload/v1778743665/portfolio-reels/Video12_d19p41.mp4",
    poster: "https://res.cloudinary.com/dw8qdtrhu/video/upload/v1778743665/portfolio-reels/Video12_d19p41.jpg",
    strategy: "THE STRATEGY:\nMaintaining absolute visual momentum. Every cut serves to pull the viewer into the next frame, dropping drop-off rates significantly.",
    isVertical: true,
    rowSpan: true,
  },
  {
    id: "vlog4",
    title: "Sound & Pace (Vlog 04)",
    client: "Personal Channel",
    format: "Vlog Format",
    views: "327K",
    tech: "Premiere Pro",
    youtubeId: "OEyjjdeJHfQ",
    poster: "https://img.youtube.com/vi/OEyjjdeJHfQ/maxresdefault.jpg",
    strategy: "THE STRATEGY:\nFocusing on sound design and pacing. Utilizing J-cuts and L-cuts to create seamless transitions between wildly different scenes and energy levels.",
    colSpan: true, // Wide 2x1 block
  },
  {
    id: "reel6",
    title: "Audio-Driven Cut",
    client: "Social Campaign",
    format: "Vertical Reel",
    views: "1.7M",
    tech: "After Effects",
    videoSrc: "https://res.cloudinary.com/dw8qdtrhu/video/upload/v1778743662/portfolio-reels/Video11_fss4uq.mp4",
    poster: "https://res.cloudinary.com/dw8qdtrhu/video/upload/v1778743662/portfolio-reels/Video11_fss4uq.jpg",
    strategy: "THE STRATEGY:\nLetting the beat dictate the visual cuts. A purely rhythmic exercise in matching visual energy to the underlying low-end frequencies.",
    isVertical: true,
    rowSpan: true,
  },
  {
    id: "reel7",
    title: "Split Narrative",
    client: "Social Campaign",
    format: "Vertical Reel",
    views: "6.6M",
    tech: "Premiere Pro",
    videoSrc: "https://res.cloudinary.com/dw8qdtrhu/video/upload/v1778743658/portfolio-reels/Video9_yifz9b.mp4",
    poster: "https://res.cloudinary.com/dw8qdtrhu/video/upload/v1778743658/portfolio-reels/Video9_yifz9b.jpg",
    strategy: "THE STRATEGY:\nUtilizing the constraints of 9:16 to stack narrative frames. Splitting the screen to show multiple perspectives simultaneously without losing focus.",
    isVertical: true,
    rowSpan: true,
  },
  {
    id: "vlog5",
    title: "The Finale (Vlog 05)",
    client: "Personal Channel",
    format: "Vlog Format",
    views: "1M",
    tech: "Premiere Pro / After Effects",
    youtubeId: "zPOWn96H6Fg",
    poster: "https://img.youtube.com/vi/zPOWn96H6Fg/maxresdefault.jpg",
    strategy: "THE STRATEGY:\nA masterclass in tension and release editing. Structuring the vlog like a mini-documentary to maximize watch time and emotional investment.",
    colSpan: true,
    rowSpan: true, // Massive 2x2 block
  },
  {
    id: "reel8",
    title: "Micro-Doc Style",
    client: "Social Campaign",
    format: "Vertical Reel",
    views: "25K",
    tech: "Premiere Pro",
    videoSrc: "https://res.cloudinary.com/dw8qdtrhu/video/upload/v1778743657/portfolio-reels/Video6_de7y3m.mp4",
    poster: "https://res.cloudinary.com/dw8qdtrhu/video/upload/v1778743657/portfolio-reels/Video6_de7y3m.jpg",
    strategy: "THE STRATEGY:\nCondensing a 10-minute documentary arc into a 60-second vertical format. Every frame is essential.",
    isVertical: true,
    rowSpan: true,
  },
  {
    id: "reel9",
    title: "Motion Graphics",
    client: "Social Campaign",
    format: "Vertical Reel",
    views: "5.4M",
    tech: "After Effects",
    videoSrc: "https://res.cloudinary.com/dw8qdtrhu/video/upload/v1778743654/portfolio-reels/Video8_mqq51h.mp4",
    poster: "https://res.cloudinary.com/dw8qdtrhu/video/upload/v1778743654/portfolio-reels/Video8_mqq51h.jpg",
    strategy: "THE STRATEGY:\nHeavy reliance on kinetic typography and tracked motion graphics to keep the viewer visually locked in.",
    isVertical: true,
    rowSpan: true,
  },
  {
    id: "reel10",
    title: "The Breakup",
    client: "Social Campaign",
    format: "Vertical Reel",
    views: "20K",
    tech: "Premiere Pro",
    videoSrc: "https://res.cloudinary.com/dw8qdtrhu/video/upload/v1778743653/portfolio-reels/Video1_pdnrfn.mp4",
    poster: "https://res.cloudinary.com/dw8qdtrhu/video/upload/v1778743653/portfolio-reels/Video1_pdnrfn.jpg",
    strategy: "THE STRATEGY:\nIntentionally jarring cuts designed to stop mindless scrolling. Creating visual friction that forces the user to pause and engage.",
    isVertical: true,
    rowSpan: true,
  },
  {
    id: "reel11",
    title: "Seamless Loop",
    client: "Social Campaign",
    format: "Vertical Reel",
    views: "40K",
    tech: "Premiere Pro",
    videoSrc: "https://res.cloudinary.com/dw8qdtrhu/video/upload/v1778743649/portfolio-reels/Video4_drlmv5.mp4",
    poster: "https://res.cloudinary.com/dw8qdtrhu/video/upload/v1778743649/portfolio-reels/Video4_drlmv5.jpg",
    strategy: "THE STRATEGY:\nStructuring the narrative so the final frame flows perfectly into the first frame, tricking the algorithm into registering multiple loops per viewer.",
    isVertical: true,
    rowSpan: true,
  },
  {
    id: "reel12",
    title: "Raw Aesthetic",
    client: "Social Campaign",
    format: "Vertical Reel",
    views: "4.6M",
    tech: "DaVinci Resolve",
    videoSrc: "https://res.cloudinary.com/dw8qdtrhu/video/upload/v1778743852/portfolio-reels/Video7_uwl81s.mp4",
    poster: "https://res.cloudinary.com/dw8qdtrhu/video/upload/v1778743852/portfolio-reels/Video7_uwl81s.jpg",
    strategy: "THE STRATEGY:\nAn anti-edit. Stripping away the polish and relying purely on the raw energy of the subject to drive engagement. Authenticity over perfection.",
    isVertical: true,
    rowSpan: true,
  },
  {
    id: "reel13",
    title: "Viral Momentum",
    client: "Social Campaign",
    format: "Vertical Reel",
    views: "1.6M",
    tech: "Premiere Pro",
    videoSrc: "https://res.cloudinary.com/dw8qdtrhu/video/upload/v1778757770/portfolio-reels/SnapInsta-Ai_3795373756316113969_hlrc2y.mp4",
    poster: "https://res.cloudinary.com/dw8qdtrhu/video/upload/v1778757770/portfolio-reels/SnapInsta-Ai_3795373756316113969_hlrc2y.jpg",
    strategy: "THE STRATEGY:\nHigh-velocity micro-edits designed for immediate algorithm pick-up.",
    isVertical: true,
    rowSpan: true,
  },
  {
    id: "reel14",
    title: "Pattern Interrupt",
    client: "Social Campaign",
    format: "Vertical Reel",
    views: "1.8M",
    tech: "After Effects",
    videoSrc: "https://res.cloudinary.com/dw8qdtrhu/video/upload/v1778757766/portfolio-reels/SnapInsta-Ai_3538807749731452184_gavxz3.mp4",
    poster: "https://res.cloudinary.com/dw8qdtrhu/video/upload/v1778757766/portfolio-reels/SnapInsta-Ai_3538807749731452184_gavxz3.jpg",
    strategy: "THE STRATEGY:\nUsing extreme scale shifts and audio ducking to reset the viewer's attention span every 3 seconds.",
    isVertical: true,
    rowSpan: true,
  },
];

export default function WorksGrid({ limit, isArchivePage = false }: { limit?: number; isArchivePage?: boolean }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filterCategories = ["All", "Vlogs", "Vertical Reels"];

  const filteredProjects = activeFilter === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => activeFilter === "Vlogs" ? p.format === "Vlog Format" : p.format === "Vertical Reel");

  const displayedProjects = limit 
    ? filteredProjects.filter(p => !p.vaultOnly).slice(0, limit) 
    : filteredProjects;

  // Prevent background scrolling when Cinema Mode is active
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedProject]);

  return (
    <section className="py-32 px-6 lg:px-12 max-w-[1800px] mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between md:items-end mb-16 border-b border-white/10 pb-8 gap-4">
        <div>
          {isArchivePage && (
            <Link href="/" className="text-white/40 hover:text-white text-xs uppercase tracking-widest flex items-center gap-2 mb-8 transition-colors w-fit">
              ← Back to Home
            </Link>
          )}
          <h2 className="font-display text-5xl md:text-7xl font-semibold tracking-tighter uppercase text-white">
            {isArchivePage ? "The Vault" : "Selected Works"}
          </h2>
        </div>
        <p className="text-white/40 max-w-sm text-sm">
          {isArchivePage 
            ? "The complete, unedited archive of high-retention formats, vertical reels, and cinematic vlogs." 
            : "A curated collection of high-retention formats and strategy-driven edits. Hover to preview. Click for Cinema Mode."}
        </p>
      </div>

      {isArchivePage && (
        <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-4 no-scrollbar">
          {filterCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`relative px-6 py-3 rounded-full font-display text-xs uppercase tracking-widest font-semibold transition-colors ${
                activeFilter === category ? "text-black" : "text-white/50 hover:text-white"
              }`}
            >
              {activeFilter === category && (
                <motion.div
                  layoutId="activeFilterBubble"
                  className="absolute inset-0 bg-white rounded-full z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 whitespace-nowrap">{category}</span>
            </button>
          ))}
        </div>
      )}

      {/* MASONRY/BENTO GRID PATTERN */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-[250px] md:auto-rows-[300px] grid-flow-dense">
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((project) => (
            <VideoCard 
              key={project.id} 
              project={project} 
              onClick={() => setSelectedProject(project)} 
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {!isArchivePage && limit && PROJECTS.length > limit && (
        <div className="mt-20 flex justify-center w-full">
          <Link href="/archive">
            <button className="group flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full font-display font-semibold uppercase tracking-widest text-sm hover:bg-white/90 transition-all duration-300 magnetic-target">
              Enter The Vault <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
            </button>
          </Link>
        </div>
      )}

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]"
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-50 p-2 magnetic-target"
            >
              <X size={36} strokeWidth={1} />
            </button>

            {/* CINEMA MODE SPLIT */}
            <motion.div
              layoutId={`card-${selectedProject.id}`}
              className="w-full h-full flex flex-col md:flex-row"
            >
              {/* Left: Video Player */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full bg-black flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10 relative p-0 md:p-8">
                {selectedProject.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedProject.youtubeId}?autoplay=1&rel=0`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full max-h-full aspect-video border-none"
                  ></iframe>
                ) : (
                  <video
                    src={selectedProject.videoSrc}
                    autoPlay
                    controls
                    playsInline
                    className={`w-full h-full object-contain ${selectedProject.isVertical ? "max-w-[400px]" : "max-w-full"}`}
                  />
                )}
              </div>

              {/* Right: Strategy & Details */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#0a0a0a] overflow-y-auto p-8 md:p-16 lg:p-24 flex flex-col justify-center">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="font-display text-4xl md:text-6xl font-semibold uppercase mb-4 tracking-tighter">
                    {selectedProject.title}
                  </h3>
                  
                  <div className="flex gap-4 mb-12 border-b border-white/10 pb-8">
                    <div>
                      <span className="block text-[10px] text-white/40 uppercase tracking-widest mb-1">Format</span>
                      <span className="text-sm font-medium">{selectedProject.format}</span>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div>
                      <span className="block text-[10px] text-white/40 uppercase tracking-widest mb-1">Tech</span>
                      <span className="text-sm font-medium">{selectedProject.tech}</span>
                    </div>
                    {selectedProject.views && (
                      <>
                        <div className="w-px h-8 bg-white/10" />
                        <div>
                          <span className="block text-[10px] text-white/40 uppercase tracking-widest mb-1">Views</span>
                          <span className="text-sm font-medium">{selectedProject.views}</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="mb-8">
                    <span className="block font-display text-lg text-white mb-6 uppercase tracking-tight">Creative Strategy & Script</span>
                    <p className="text-white/60 leading-relaxed font-light whitespace-pre-wrap text-sm md:text-base">
                      {selectedProject.strategy}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function VideoCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (project.videoSrc && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (project.videoSrc && videoRef.current) {
      videoRef.current.pause();
    }
  };

  // If there's a youtubeId but no custom poster, we use the YouTube high-res thumbnail
  const posterUrl = project.poster || (project.youtubeId ? `https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg` : "");

  return (
    <motion.button
      layout
      layoutId={`card-${project.id}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      // Appending colSpan and rowSpan dynamic grid classes
      className={`group relative w-full h-full bg-[#111] overflow-hidden border border-white/5 hover:border-white/20 transition-colors p-0 text-left cursor-none magnetic-target ${
        project.colSpan ? "md:col-span-2" : ""
      } ${project.rowSpan ? "md:row-span-2" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor-text="PLAY"
    >
      <img
        src={posterUrl}
        alt={project.title}
        // Since we are using a masonry grid where cells naturally fit the aspect ratio (tall cells for tall videos), we can safely use object-cover for full bleed imagery!
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1s] ${
          isHovered ? (project.videoSrc ? "opacity-0 scale-105" : "opacity-80 scale-105") : "opacity-50 grayscale scale-100"
        }`}
      />

      {project.videoSrc && (
        <video
          ref={videoRef}
          src={project.videoSrc}
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* YouTube Icon Overlay if hovering and no raw video is playing */}
      {isHovered && !project.videoSrc && project.youtubeId && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
            <Play className="text-white ml-1" size={24} fill="white" />
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

      <div className="absolute inset-0 p-8 flex flex-col justify-end z-30">
        <h3 className="font-display text-3xl font-semibold uppercase tracking-tight text-white group-hover:translate-x-2 transition-transform duration-500">
          {project.title}
        </h3>
        <p className="text-sm text-white/50 tracking-widest mt-2 uppercase font-medium group-hover:translate-x-2 transition-transform duration-500 delay-75">
          {project.client}
        </p>
      </div>
    </motion.button>
  );
}
