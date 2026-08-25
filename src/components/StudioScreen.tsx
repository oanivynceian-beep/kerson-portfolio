import React from 'react';
import { STUDIO_PORTRAIT_IMAGE, BTS_IMAGES, SELECT_HONORS, SOFTWARE_STACK, STUDIO_INFO } from '../data/portfolioData';
import { NavSection } from '../types';
import { ArrowRight, Award, Cpu, Sparkles, MapPin, Phone, Instagram, Facebook, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import pic from './about.jpg';

interface StudioScreenProps {
  onNavigate: (section: NavSection) => void;
}

export const StudioScreen: React.FC<StudioScreenProps> = ({ onNavigate }) => {
  return (
    <div className="w-full min-h-screen pt-20 md:pt-0">
      <div className="flex flex-col md:flex-row w-full min-h-screen">
        {/* Left Panel: Large Portrait (Sticky on Desktop) */}
        <div className="w-full md:w-1/2 h-[420px] sm:h-[500px] md:h-screen md:sticky md:top-0 relative overflow-hidden bg-[#0e0e0e]">
          <div className="w-full h-full relative">
            <img
              src={pic}
              alt="Kerson John Parame — Freelance Photographer & Videographer"
              className="object-cover w-full h-full grayscale brightness-95 contrast-110 select-none"
            />
            {/* Subtle bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/20 to-transparent md:bg-gradient-to-t md:from-black/80 md:via-transparent md:to-transparent pointer-events-none" />

            {/* Editorial overlay badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-20"
            >
              <span className="font-label-caps text-[9px] sm:text-[10px] text-emerald-400 tracking-[0.25em] block mb-1">
                FREELANCE PHOTO &amp; VIDEOGRAPHER
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-bold">
                Kerson John Parame
              </h3>
              <div className="flex items-center gap-2 mt-2 font-sans text-xs text-[#c4c7c8]">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Davao City, Philippines</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Panel: Scrollable Profile Content */}
        <div className="w-full md:w-1/2 bg-[#131313] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 sm:py-20 md:py-28 relative z-20">
          {/* Section 1: Philosophy & Identity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mx-auto mb-14 sm:mb-20"
          >
            <p className="font-label-caps text-xs text-[#8e9192] mb-4 sm:mb-6 uppercase tracking-widest">
              ABOUT THE CREATOR
            </p>
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-white mb-6 sm:mb-8 font-bold leading-tight">
              {STUDIO_INFO.philosophyTitle}
            </h1>
            <p className="font-sans text-sm sm:text-base text-[#c4c7c8] leading-relaxed mb-6">
              {STUDIO_INFO.philosophyBody}
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 pt-2">
              <span className="px-3 py-1.5 bg-[#1c1b1b] border border-[#444748]/40 font-label-caps text-[10px] text-white tracking-wider">
                SPORTS PHOTOGRAPHY
              </span>
              <span className="px-3 py-1.5 bg-[#1c1b1b] border border-[#444748]/40 font-label-caps text-[10px] text-white tracking-wider">
                INSTITUTIONAL MEDIA
              </span>
              <span className="px-3 py-1.5 bg-[#1c1b1b] border border-[#444748]/40 font-label-caps text-[10px] text-white tracking-wider">
                CINEMATIC REELS
              </span>
            </div>
          </motion.div>

          <hr className="border-[#444748]/30 mb-14 sm:mb-20 max-w-xl mx-auto" />

          {/* Section 2: Creative Software Arsenal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mx-auto mb-14 sm:mb-20"
          >
            <div className="flex items-center gap-2 mb-6">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <p className="font-label-caps text-xs text-[#8e9192] uppercase tracking-widest">
                SOFTWARE &amp; WORKFLOW SUITE
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SOFTWARE_STACK.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ y: -3 }}
                  className="p-5 bg-[#181818] border border-[#444748]/30 hover:border-white/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <img src={item.logo} alt={`${item.name} logo`} className="w-5 h-5 mr-2" />
                        <span className="font-serif text-lg font-bold text-white">
                          {item.name}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 bg-[#252525] border border-white/10 font-label-caps text-[9px] text-[#c4c7c8]">
                        {item.shortName}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-[#8e9192] leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#444748]/20 flex items-center justify-between">
                    <span className="font-label-caps text-[9px] text-[#8e9192] uppercase">
                      {item.category}
                    </span>
                    <span className="font-label-caps text-[9px] text-emerald-400 font-semibold">
                      {item.level}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <hr className="border-[#444748]/30 mb-14 sm:mb-20 max-w-xl mx-auto" />

          {/* Section 3: Professional Milestones & Affiliations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mx-auto mb-14 sm:mb-20"
          >
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-4 h-4 text-emerald-400" />
              <p className="font-label-caps text-xs text-[#8e9192] uppercase tracking-widest">
                ORGANIZATIONAL &amp; MEDIA ROLES
              </p>
            </div>

            <ul className="flex flex-col border-t border-[#444748]/30">
              {SELECT_HONORS.map((honor) => (
                <li
                  key={honor.id}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-5 border-b border-[#444748]/30 group hover:bg-[#1c1b1b]/80 px-3 transition-colors gap-2"
                >
                  <div>
                    <span className="font-serif text-lg md:text-xl text-white block group-hover:translate-x-1 transition-transform font-bold">
                      {honor.organization}
                    </span>
                    <span className="font-sans text-xs text-[#8e9192]">
                      {honor.project} {honor.location ? `• ${honor.location}` : ''}
                    </span>
                  </div>
                  <span className="font-label-caps text-[10px] sm:text-[11px] text-emerald-400 sm:text-right bg-emerald-950/40 px-2.5 py-1 border border-emerald-500/20 self-start sm:self-auto">
                    {honor.award}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <hr className="border-[#444748]/30 mb-14 sm:mb-20 max-w-xl mx-auto" />

          {/* Section 4: Behind the Lens (Set & Production) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mx-auto mb-14 sm:mb-20"
          >
            <div className="flex items-center justify-between mb-6">
              <p className="font-label-caps text-xs text-[#8e9192] uppercase tracking-widest">
                IN THE FIELD
              </p>
              <span className="font-sans text-xs text-[#8e9192]">Field &amp; Post Production</span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="col-span-2 group overflow-hidden bg-[#1c1b1b]">
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img
                    src={BTS_IMAGES.set}
                    alt="Camera operator tracking sports and documentary action"
                    className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute bottom-3 left-4 bg-black/80 px-3 py-1 font-label-caps text-[9px] text-white backdrop-blur-sm">
                    Field Coverage &amp; Directing
                  </div>
                </div>
              </div>

              <div className="group overflow-hidden bg-[#1c1b1b]">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={BTS_IMAGES.gear}
                    alt="Fast lenses and camera gear"
                    className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-3 bg-black/80 px-2 py-0.5 font-label-caps text-[8px] text-white backdrop-blur-sm">
                    Fast Lenses &amp; Bodies
                  </div>
                </div>
              </div>

              <div className="group overflow-hidden bg-[#1c1b1b]">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={BTS_IMAGES.suite}
                    alt="Adobe Premiere and Lightroom Editing Suite"
                    className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-3 bg-black/80 px-2 py-0.5 font-label-caps text-[8px] text-white backdrop-blur-sm">
                    Premiere &amp; LrC Grading
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <hr className="border-[#444748]/30 mb-14 sm:mb-20 max-w-xl mx-auto" />

          {/* Section 5: Direct Connect Card & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mx-auto space-y-8"
          >
            <div className="p-6 bg-[#181818] border border-[#444748]/30 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="font-label-caps text-[11px] text-white tracking-wider">
                  DIRECT CONTACT &amp; SOCIALS
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <a
                  href="tel:09512491780"
                  className="flex items-center gap-2 text-[#c4c7c8] hover:text-white transition-colors p-2 bg-white/5 border border-white/5 hover:border-white/20 min-h-[44px]"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>09512491780</span>
                </a>
                <a
                  href="tel:09918347451"
                  className="flex items-center gap-2 text-[#c4c7c8] hover:text-white transition-colors p-2 bg-white/5 border border-white/5 hover:border-white/20 min-h-[44px]"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>09918347451</span>
                </a>
                <a
                  href="https://www.facebook.com/kerson.john.parame/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[#c4c7c8] hover:text-white transition-colors p-2 bg-white/5 border border-white/5 hover:border-white/20 min-h-[44px]"
                >
                  <Facebook className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="truncate">Kerson John Parame</span>
                </a>
                <a
                  href="https://www.instagram.com/worcestershire_sauceee/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[#c4c7c8] hover:text-white transition-colors p-2 bg-white/5 border border-white/5 hover:border-white/20 min-h-[44px]"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                  <span className="truncate">@worcestershire_sauceee</span>
                </a>
              </div>
            </div>

            <div>
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-3 font-serif text-2xl sm:text-3xl md:text-4xl text-white hover:text-emerald-400 transition-all group cursor-pointer focus:outline-none"
              >
                <span>Hire For A Shoot</span>
                <ArrowRight className="w-7 h-7 sm:w-8 sm:h-8 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
