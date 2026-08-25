import React, { useState, useRef, useEffect } from 'react';
import { HERO_IMAGE, HERO_VIDEO, PORTFOLIO_ITEMS } from '../data/portfolioData';
import { NavSection, PortfolioItem } from '../types';
import { ArrowDown, ArrowUpRight, Camera, Film, Play, Pause, Volume2, VolumeX, Award, Sparkles, SlidersHorizontal, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeScreenProps {
  onNavigate: (section: NavSection) => void;
  onSelectProject: (project: PortfolioItem) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onSelectProject }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback: keep muted
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* HERO SECTION WITH FULL BACKGROUND VIDEO */}
      <section className="relative w-full min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20 sm:pt-28 sm:pb-24 bg-[#0e0e0e]">
        {/* Background Video Container */}
        <div className="absolute inset-0 z-0 select-none overflow-hidden">
          {/* Static fallback poster while video streams */}
          <div
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-60'
            }`}
            style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
            aria-hidden="true"
          />

          {/* Native HTML5 Video Element */}
          <video
            ref={videoRef}
            src={HERO_VIDEO.src}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            className="w-full h-full object-cover pointer-events-none scale-105 filter brightness-90 contrast-105"
          />

          {/* Cinematic Vignette & Editorial Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/40 to-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        </div>

        {/* Video Audio & Playback Controls Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute bottom-6 right-4 sm:bottom-8 sm:right-10 z-30 flex items-center gap-2"
        >
          <button
            onClick={toggleSound}
            className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-black/75 hover:bg-black/95 backdrop-blur-md border border-white/20 hover:border-white/60 text-white font-label-caps text-[9px] sm:text-[10px] tracking-wider transition-all duration-200 cursor-pointer shadow-xl active:scale-95 min-h-[38px]"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-white/70" />
                <span>UNMUTE AUDIO</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="text-emerald-300">AUDIO ON</span>
              </>
            )}
          </button>

          <button
            onClick={togglePlay}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-black/75 hover:bg-black/95 backdrop-blur-md border border-white/20 hover:border-white/60 text-white transition-all duration-200 cursor-pointer shadow-xl active:scale-95 min-h-[38px] min-w-[38px]"
            title={isPlaying ? 'Pause Background' : 'Play Background'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
          </button>
        </motion.div>

        {/* Hero Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-4 sm:px-8 md:px-16 w-full max-w-[1440px] mx-auto flex flex-col items-center"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 bg-white/10 backdrop-blur-md border border-white/20 mb-5 sm:mb-8 font-label-caps text-[9px] sm:text-[11px] text-white tracking-[0.2em] uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>DIRECTOR &amp; CINEMATOGRAPHER REEL</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-5 sm:mb-7 tracking-tight uppercase leading-[1.08] max-w-5xl font-bold"
          >
            CAPTURED IN LIGHT.<br />
            TOLD IN MOTION.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="font-sans text-sm sm:text-base md:text-lg text-[#c4c7c8] max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 font-normal leading-relaxed px-2"
          >
            Freelance photographer and videographer based in Davao City. Crafting high-impact sports action, institutional media, sacred liturgical documentaries, and cinematic motion.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full max-w-md sm:max-w-none sm:w-auto px-4 sm:px-0"
          >
            <button
              onClick={() => onNavigate('work')}
              className="w-full sm:w-auto bg-white text-[#131313] border border-white px-8 md:px-10 py-3.5 sm:py-4 font-label-caps text-[11px] hover:bg-transparent hover:text-white transition-all duration-300 active:scale-95 cursor-pointer text-center min-h-[44px]"
            >
              View Portfolio
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto border border-[#8e9192] px-8 md:px-10 py-3.5 sm:py-4 font-label-caps text-[11px] text-[#e5e2e1] hover:border-white hover:text-white transition-all duration-300 active:scale-95 cursor-pointer text-center min-h-[44px]"
            >
              Start a Project
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          onClick={() => onNavigate('work')}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer z-20 group text-[#c4c7c8] hover:text-white transition-colors"
        >
          <span className="font-label-caps text-[9px] sm:text-[10px] tracking-[0.25em]">
            SCROLL TO EXPLORE
          </span>
          <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-bounce opacity-80 group-hover:opacity-100 transition-opacity" />
        </motion.div>
      </section>

      {/* CREDENTIALS TICKER BANNER */}
      <div className="w-full bg-[#181818] border-y border-[#333] py-4 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-wrap items-center justify-between gap-4 text-xs font-label-caps text-[#8e9192]">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-white">Palarong Pambansa 2024</span>
            <span className="hidden sm:inline text-[#666]">• Marikina City</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
            <span className="text-white">San Pedro Cathedral SOCCOM</span>
            <span className="hidden md:inline text-[#666]">• Archdiocese of Davao</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />
            <span className="text-white">Former UM Primum Videographer</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <span className="text-white">RMC Media Production</span>
          </div>
        </div>
      </div>

      {/* CURATED REEL HIGHLIGHTS (Teaser Strip with on-scroll trigger) */}
      <section className="relative z-10 bg-[#131313] py-16 sm:py-24 px-4 sm:px-8 md:px-16 lg:px-20 border-t border-[#444748]/20 max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6"
        >
          <div>
            <span className="font-label-caps text-[#8e9192] text-xs tracking-widest block mb-2 sm:mb-3">
              SELECTED HIGHLIGHTS
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-white font-bold">
              Distinctive Frames &amp; Motion
            </h2>
          </div>
          <button
            onClick={() => onNavigate('work')}
            className="inline-flex items-center gap-2 font-label-caps text-xs sm:text-sm text-[#c4c7c8] hover:text-white transition-colors border-b border-[#444748] hover:border-white pb-1 self-start md:self-auto cursor-pointer"
          >
            <span>Explore All 2024 Archives</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PORTFOLIO_ITEMS.slice(0, 3).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              onClick={() => onSelectProject(item)}
              className="group cursor-pointer bg-[#1c1b1b] overflow-hidden relative flex flex-col border border-white/5 hover:border-white/30 transition-all duration-300"
            >
              <div className="relative aspect-[4/5] sm:aspect-[16/10] md:aspect-[4/5] overflow-hidden bg-[#0c0c0c]">
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
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5 sm:p-6">
                  <span className="font-label-caps text-[10px] text-white/70 mb-1">
                    {item.client}
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-[#c4c7c8] line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 border-t border-[#444748]/20 flex justify-between items-center bg-[#181818] min-h-[90px]">
                <div className="pr-3">
                  <span className="font-label-caps text-[9px] sm:text-[10px] text-[#8e9192] block mb-1">
                    {item.category} • {item.year}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg text-white group-hover:text-white/90 font-bold line-clamp-1">
                    {item.title}
                  </h3>
                </div>
                <div className="w-9 h-9 shrink-0 border border-[#444748] flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Capabilities Grid with On-Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="mt-20 sm:mt-28 pt-12 sm:pt-16 border-t border-[#444748]/20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <div className="space-y-3 p-4 sm:p-0 rounded-none bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-0">
            <div className="w-10 h-10 border border-[#444748] flex items-center justify-center mb-4 text-white">
              <Camera className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg sm:text-xl text-white font-bold">Sports &amp; Action Photo</h4>
            <p className="font-sans text-sm text-[#8e9192] leading-relaxed">
              Official Palarong Pambansa 2024 photographer. Precise shutter timing that freezes athletic emotion and peak motion.
            </p>
          </div>

          <div className="space-y-3 p-4 sm:p-0 rounded-none bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-0">
            <div className="w-10 h-10 border border-[#444748] flex items-center justify-center mb-4 text-white">
              <Film className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg sm:text-xl text-white font-bold">Institutional &amp; Docu Video</h4>
            <p className="font-sans text-sm text-[#8e9192] leading-relaxed">
              University of Mindanao Primum videographer, RMC Media, and San Pedro Cathedral SOCCOM documentary coverage.
            </p>
          </div>

          <div className="space-y-3 p-4 sm:p-0 rounded-none bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-0">
            <div className="w-10 h-10 border border-[#444748] flex items-center justify-center mb-4 text-white">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg sm:text-xl text-white font-bold">Adobe Suite &amp; CapCut</h4>
            <p className="font-sans text-sm text-[#8e9192] leading-relaxed">
              Mastery of Adobe Premiere Pro, Lightroom Classic, Lightroom, and CapCut for fast-turnaround social and cinematic edits.
            </p>
          </div>

          <div className="space-y-3 p-4 sm:p-0 rounded-none bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-0">
            <div className="w-10 h-10 border border-[#444748] flex items-center justify-center mb-4 text-white">
              <span className="font-label-caps text-xs font-bold text-white">DVO</span>
            </div>
            <h4 className="font-serif text-lg sm:text-xl text-white font-bold">Freelance Production</h4>
            <p className="font-sans text-sm text-[#8e9192] leading-relaxed">
              Based in Davao City, available for regional coverage, sports tournaments, corporate events, and creative commissions.
            </p>
          </div>
        </motion.div>

        {/* Interactive Call to Action Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 sm:mt-24 p-6 sm:p-12 bg-gradient-to-r from-[#1b1b1b] to-[#141414] border border-white/15 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
        >
          <div>
            <span className="font-label-caps text-xs text-emerald-400 tracking-widest block mb-2">
              READY FOR BOOKINGS &amp; COMMISSION WORK
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold mb-2">
              Have an upcoming event or production in mind?
            </h3>
            <p className="font-sans text-sm text-[#8e9192] max-w-xl">
              From high-stakes sports coverage to commercial video projects, get in touch for custom rates and availability.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white text-black hover:bg-white/90 px-6 py-3.5 font-label-caps text-xs text-center transition-all min-h-[44px]"
            >
              Contact Kerson
            </button>
            <a
              href="tel:09512491780"
              className="border border-white/30 hover:border-white text-white px-6 py-3.5 font-label-caps text-xs text-center transition-all min-h-[44px] flex items-center justify-center gap-2"
            >
              <span>Call 09512491780</span>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
