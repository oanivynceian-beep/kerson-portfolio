import React, { useEffect } from 'react';
import { PortfolioItem } from '../types';
import { X, ChevronLeft, ChevronRight, Camera, Film, MapPin, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectModalProps {
  project: PortfolioItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onOpenContact: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onPrev,
  onNext,
  onOpenContact,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6 md:p-8">
        {/* Background click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 bg-[#131313] border border-[#444748]/50 w-full max-w-5xl max-h-[92vh] overflow-y-auto flex flex-col shadow-2xl"
        >
          {/* Modal Top Bar */}
          <div className="sticky top-0 z-20 bg-[#131313]/95 backdrop-blur-md px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#444748]/30 flex justify-between items-center">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="font-label-caps text-[10px] text-emerald-400 font-semibold">
                {project.category}
              </span>
              <span className="text-[#444748]">•</span>
              <span className="font-label-caps text-[10px] text-white">
                {project.year}
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={onPrev}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-[#444748] hover:border-white text-white transition-colors cursor-pointer active:scale-95"
                title="Previous Work (Left Arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={onNext}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-[#444748] hover:border-white text-white transition-colors cursor-pointer active:scale-95"
                title="Next Work (Right Arrow)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-white/40 hover:border-white text-white transition-colors ml-1 cursor-pointer active:scale-95 bg-white/5"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-6 md:p-10 space-y-6 sm:space-y-8">
            {/* Main Visual Frame */}
            <div className="w-full bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden border border-[#222]">
              {project.videoSrc ? (
                <video
                  src={project.videoSrc}
                  controls
                  autoPlay
                  className="max-h-[50vh] sm:max-h-[65vh] w-full object-contain"
                  poster={project.image}
                />
              ) : project.externalVideoUrl ? (
                <div className="w-full aspect-video flex flex-col items-center justify-center">
                  <iframe
                    src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(project.externalVideoUrl)}&show_text=false&appId`}
                    className="w-full h-full"
                    style={{ minHeight: '56vh', border: 'none' }}
                    scrolling="no"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    title={project.title}
                  />
                  <a
                    href={project.externalVideoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 font-label-caps text-[10px] text-[#8e9192] hover:text-white transition-colors border-b border-[#444748] hover:border-white pb-0.5"
                  >
                    <span>Open on Facebook</span>
                  </a>
                </div>
              ) : project.gallery && project.gallery.length > 0 ? (
                <div className="w-full flex flex-col gap-4 overflow-y-auto max-h-[65vh] p-4">
                  {/* The thumbnail / main image */}
                  <img
                    src={project.image}
                    alt={`${project.title} - Main`}
                    className="w-full h-auto object-contain select-none"
                  />
                  {/* The rest of the gallery */}
                  {project.gallery.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${project.title} - Gallery ${idx + 1}`}
                      className="w-full h-auto object-contain select-none"
                    />
                  ))}
                </div>
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  className="max-h-[50vh] sm:max-h-[65vh] w-auto object-contain select-none"
                />
              )}
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 pt-2 sm:pt-4">
              <div className="md:col-span-7 space-y-3 sm:space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-bold">
                  {project.title}
                </h2>
                {project.client && (
                  <div className="font-label-caps text-xs text-emerald-400">
                    Commissioned by {project.client}
                  </div>
                )}
                <p className="font-sans text-sm sm:text-base text-[#c4c7c8] leading-relaxed pt-1">
                  {project.description}
                </p>
              </div>

              {/* Technical Specifications */}
              <div className="md:col-span-5 bg-[#181818] p-5 sm:p-6 border border-[#444748]/30 space-y-4">
                <h4 className="font-label-caps text-[11px] text-white tracking-widest border-b border-[#444748]/30 pb-2 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  TECHNICAL ARCHIVES
                </h4>

                {project.technicalSpecs && (
                  <div className="space-y-3 font-sans text-xs">
                    <div className="flex items-start gap-2">
                      <Camera className="w-3.5 h-3.5 text-emerald-400 mt-0.5" />
                      <div>
                        <span className="text-[#8e9192] block font-label-caps text-[9px]">Camera &amp; Optics</span>
                        <span className="text-white font-medium">{project.technicalSpecs.camera}</span>
                        <span className="text-[#c4c7c8] block">{project.technicalSpecs.lens}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 pt-2 border-t border-[#444748]/20">
                      <Film className="w-3.5 h-3.5 text-emerald-400 mt-0.5" />
                      <div>
                        <span className="text-[#8e9192] block font-label-caps text-[9px]">Capture Format</span>
                        <span className="text-white font-medium">{project.technicalSpecs.format}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 pt-2 border-t border-[#444748]/20">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 mt-0.5" />
                      <div>
                        <span className="text-[#8e9192] block font-label-caps text-[9px]">Location</span>
                        <span className="text-white font-medium">{project.technicalSpecs.location}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-3 border-t border-[#444748]/30">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenContact();
                    }}
                    className="w-full bg-white text-black py-3 font-label-caps text-xs hover:bg-white/90 transition-colors text-center font-bold min-h-[44px] cursor-pointer"
                  >
                    Inquire For Similar Production
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
