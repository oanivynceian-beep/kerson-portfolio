import React from 'react';
import { PORTFOLIO_ITEMS } from '../data/portfolioData';
import { ProjectCategory, PortfolioItem } from '../types';
import { Sparkles, Eye, Play, Film, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import portfolioBg from '../data/port.jpg';

interface PortfolioScreenProps {
  activeCategory: ProjectCategory;
  onCategoryChange: (category: ProjectCategory) => void;
  onSelectProject: (project: PortfolioItem) => void;
}

export const PortfolioScreen: React.FC<PortfolioScreenProps> = ({
  activeCategory,
  onCategoryChange,
  onSelectProject,
}) => {
  const filteredItems = PORTFOLIO_ITEMS.filter((item) => {
    if (activeCategory === 'ALL') return true;
    return item.mainCategory === activeCategory;
  });

  return (
    <div className="w-full pt-24 sm:pt-28 pb-24 sm:pb-32 min-h-screen">
      {/* Header Section */}
      <header
        className="px-4 sm:px-8 md:px-16 lg:px-20 py-12 sm:py-16 md:py-20 mx-auto border-b border-[#444748]/20 relative bg-center bg-cover bg-no-repeat w-full"
        style={{ backgroundImage: `url(${portfolioBg})` }}
      >
        <div className="absolute inset-0 bg-[#0a0a0a]/80 z-0 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/30 z-0" />
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10 max-w-[1440px] mx-auto"
        >
          <div className="md:col-start-1 lg:col-start-2 md:col-span-12 lg:col-span-10">
            <span className="font-label-caps text-[#8e9192] text-xs tracking-widest block mb-3 sm:mb-4">
              ARCHIVE &amp; EXHIBITION • 2024–2026
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 sm:mb-6 uppercase tracking-tight font-bold">
              PORTFOLIO
            </h1>
            <p className="font-sans text-sm sm:text-base md:text-lg text-[#c4c7c8] max-w-2xl leading-relaxed">
              A curated selection of cinematic reels, high-speed sports action, documentary journalism, and editorial portraiture by Kerson John Parame.
            </p>
          </div>
        </motion.div>
      </header>

      {/* Filter Navigation */}
      <section className="px-4 sm:px-8 md:px-16 lg:px-20 py-6 sm:py-10 max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4 sm:gap-6">
          <ul className="flex flex-wrap gap-2 sm:gap-6 font-label-caps text-xs">
            <li>
              <button
                onClick={() => onCategoryChange('ALL')}
                className={`px-3 py-2 sm:px-4 sm:py-2 uppercase tracking-widest transition-all duration-300 cursor-pointer min-h-[44px] flex items-center gap-1.5 ${activeCategory === 'ALL'
                    ? 'bg-white text-black font-bold'
                    : 'text-[#8e9192] hover:text-white bg-white/5 border border-white/10'
                  }`}
              >
                <span>ALL WORKS</span>
                <span className="text-[10px] opacity-70">({PORTFOLIO_ITEMS.length})</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onCategoryChange('PHOTOGRAPHY')}
                className={`px-3 py-2 sm:px-4 sm:py-2 uppercase tracking-widest transition-all duration-300 cursor-pointer min-h-[44px] flex items-center gap-1.5 ${activeCategory === 'PHOTOGRAPHY'
                    ? 'bg-white text-black font-bold'
                    : 'text-[#8e9192] hover:text-white bg-white/5 border border-white/10'
                  }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>PHOTOGRAPHY</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onCategoryChange('FILM')}
                className={`px-3 py-2 sm:px-4 sm:py-2 uppercase tracking-widest transition-all duration-300 cursor-pointer min-h-[44px] flex items-center gap-1.5 ${activeCategory === 'FILM'
                    ? 'bg-white text-black font-bold'
                    : 'text-[#8e9192] hover:text-white bg-white/5 border border-white/10'
                  }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>VIDEOGRAPHY</span>
              </button>
            </li>
          </ul>

          <div className="flex items-center gap-2 text-xs font-sans text-[#8e9192]">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Showing {filteredItems.length} projects</span>
          </div>
        </div>
      </section>

      {/* Masonry / Grid Gallery with Stagger Animations */}
      <section className="px-4 sm:px-8 md:px-16 lg:px-20 pb-16 max-w-[1440px] mx-auto">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => {
              let aspectClass = 'aspect-[4/5]';
              if (item.aspectRatio === '16/9') aspectClass = 'aspect-[16/9]';
              if (item.aspectRatio === 'square') aspectClass = 'aspect-square';
              if (item.aspectRatio === '3/4') aspectClass = 'aspect-[3/4]';
              if (item.aspectRatio === '3/2') aspectClass = 'aspect-[3/2]';

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => onSelectProject(item)}
                  className="group relative overflow-hidden bg-[#1c1b1b] cursor-pointer transition-all duration-300 border border-white/5 hover:border-white/30 shadow-lg flex flex-col"
                >
                  {/* Image Wrap */}
                  <div className={`relative w-full ${aspectClass} bg-[#141414] overflow-hidden`}>
                    {item.videoSrc ? (
                      <video
                        src={item.videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        onContextMenu={(e) => e.preventDefault()}
                        controlsList="nodownload"
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                      />
                    ) : (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    )}

                    {/* Corner format badge */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 flex items-center gap-2">
                      {item.videoSrc && (
                        <span className="bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 font-label-caps text-[9px] px-2 py-0.5 flex items-center gap-1 shadow-md">
                          <Play className="w-2 h-2 fill-emerald-300" />
                          <span>PLAY REEL</span>
                        </span>
                      )}
                      {item.externalVideoUrl && !item.videoSrc && (
                        <span className="bg-blue-950/90 text-blue-300 border border-blue-500/40 font-label-caps text-[9px] px-2 py-0.5 flex items-center gap-1 shadow-md">
                          <Play className="w-2 h-2 fill-blue-300" />
                          <span>FACEBOOK REEL</span>
                        </span>
                      )}
                      <span className="bg-black/80 backdrop-blur-sm border border-white/20 text-white font-label-caps text-[9px] px-2 py-0.5 shadow-md">
                        {item.year}
                      </span>
                    </div>

                    {/* Hover Overlay Content (Desktop) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 hidden sm:flex">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-label-caps text-[10px] text-emerald-400 uppercase tracking-wider">
                          {item.category} • {item.mainCategory}
                        </span>
                        <Eye className="w-4 h-4 text-white/80" />
                      </div>
                      <h3 className="font-serif text-xl md:text-2xl text-white mb-2 font-bold leading-snug">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs text-[#c4c7c8] line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Mobile & Touch Title Bar */}
                  <div className="p-4 sm:hidden border-t border-[#444748]/20 flex justify-between items-center bg-[#181818] min-h-[64px]">
                    <div>
                      <span className="font-label-caps text-[9px] text-[#8e9192] block">
                        {item.category}
                      </span>
                      <h4 className="font-serif text-sm font-bold text-white line-clamp-1">{item.title}</h4>
                    </div>
                    <span className="font-label-caps text-[10px] text-emerald-400 shrink-0 ml-2">
                      VIEW →
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
};
