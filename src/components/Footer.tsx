import React from 'react';
import { NavSection } from '../types';
import { Phone, Instagram, Facebook } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  onNavigate: (section: NavSection) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#0e0e0e] border-t border-[#444748]/20 py-12 sm:py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 lg:px-20 flex flex-col items-center text-center space-y-6 sm:space-y-8"
      >
        {/* Brand Display Logo */}
        <button
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group cursor-pointer focus:outline-none text-center"
        >
          <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-tight group-hover:opacity-80 transition-opacity block">
            KERSON JOHN PARAME
          </span>
          <span className="font-label-caps text-[9px] sm:text-[10px] text-[#8e9192] tracking-[0.3em] block mt-1">
            FREELANCE PHOTO &amp; VIDEOGRAPHER • DAVAO CITY
          </span>
        </button>

        {/* Social and Direct Links */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 md:gap-8 max-w-2xl pt-2">
          <a
            href="https://www.facebook.com/kerson.john.parame/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 font-label-caps text-xs text-[#c4c7c8] hover:text-white transition-colors duration-300 tracking-wider py-2 px-3 bg-white/5 border border-white/10 sm:bg-transparent sm:border-transparent min-h-[44px]"
          >
            <Facebook className="w-3.5 h-3.5 text-blue-400" />
            <span>Facebook</span>
          </a>

          <a
            href="https://www.instagram.com/worcestershire_sauceee/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 font-label-caps text-xs text-[#c4c7c8] hover:text-white transition-colors duration-300 tracking-wider py-2 px-3 bg-white/5 border border-white/10 sm:bg-transparent sm:border-transparent min-h-[44px]"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-400" />
            <span>Instagram</span>
          </a>

          <a
            href="tel:09512491780"
            className="flex items-center gap-2 font-label-caps text-xs text-[#c4c7c8] hover:text-emerald-400 transition-colors duration-300 tracking-wider font-mono py-2 px-3 bg-white/5 border border-white/10 sm:bg-transparent sm:border-transparent min-h-[44px]"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>09512491780</span>
          </a>

          <a
            href="tel:09918347451"
            className="flex items-center gap-2 font-label-caps text-xs text-[#c4c7c8] hover:text-emerald-400 transition-colors duration-300 tracking-wider font-mono py-2 px-3 bg-white/5 border border-white/10 sm:bg-transparent sm:border-transparent min-h-[44px]"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>09918347451</span>
          </a>

          <button
            onClick={() => {
              onNavigate('studio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-label-caps text-xs text-[#c4c7c8] hover:text-white transition-colors duration-300 tracking-wider cursor-pointer py-2 px-3 min-h-[44px]"
          >
            About &amp; Software Stack
          </button>

          <button
            onClick={() => {
              onNavigate('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-label-caps text-xs text-white hover:text-emerald-400 transition-colors duration-300 tracking-wider cursor-pointer py-2 px-3 min-h-[44px] font-semibold"
          >
            Inquire / Book
          </button>
        </div>

        {/* Experience summary sub-bar */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs text-[#8e9192] pt-4 border-t border-[#444748]/20 w-full max-w-3xl">
          <span className="bg-[#181818] px-2.5 py-1 border border-white/5">Palarong Pambansa 2024 Photographer</span>
          <span className="bg-[#181818] px-2.5 py-1 border border-white/5">San Pedro Cathedral SOCCOM</span>
          <span className="bg-[#181818] px-2.5 py-1 border border-white/5">Univ. of Mindanao Primum</span>
          <span className="bg-[#181818] px-2.5 py-1 border border-white/5">RMC Media</span>
        </div>

        {/* Copyright Note */}
        <p className="font-sans text-xs text-[#6e7172]">
          © {new Date().getFullYear()} Kerson John Parame. Adobe Premiere Pro • Lightroom Classic • Lightroom • CapCut.
        </p>
      </motion.div>
    </footer>
  );
};
