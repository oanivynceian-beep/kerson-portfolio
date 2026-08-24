import React, { useState, useEffect } from 'react';
import { NavSection, ProjectCategory } from '../types';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  currentSection: NavSection;
  onNavigate: (section: NavSection, category?: ProjectCategory) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (section: NavSection, category?: ProjectCategory) => {
    onNavigate(section, category);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <nav
        className={`w-full transition-all duration-500 ${
          isScrolled
            ? 'bg-[#131313]/95 backdrop-blur-xl border-b border-[#444748]/30 shadow-2xl py-3.5 sm:py-4'
            : 'bg-[#131313]/50 backdrop-blur-md border-b border-[#444748]/15 py-4 sm:py-6'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 lg:px-20 flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-left group cursor-pointer focus:outline-none min-h-[44px] flex flex-col justify-center"
          >
            <span className="font-serif text-lg sm:text-2xl md:text-3xl tracking-tight text-white group-hover:opacity-80 transition-opacity block leading-none font-bold">
              KERSON JOHN PARAME
            </span>
            <span className="font-label-caps text-[8px] sm:text-[9px] text-[#8e9192] tracking-[0.25em] block mt-1">
              PHOTO &amp; VIDEOGRAPHY
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <button
              onClick={() => handleNavClick('home')}
              className={`font-nav-link text-[13px] tracking-widest transition-all duration-300 relative py-1 cursor-pointer focus:outline-none ${
                currentSection === 'home'
                  ? 'text-white border-b-2 border-white'
                  : 'text-[#c4c7c8] hover:text-white'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('work', 'ALL')}
              className={`font-nav-link text-[13px] tracking-widest transition-all duration-300 relative py-1 cursor-pointer focus:outline-none ${
                currentSection === 'work'
                  ? 'text-white border-b-2 border-white'
                  : 'text-[#c4c7c8] hover:text-white'
              }`}
            >
              Portfolio
            </button>

            <button
              onClick={() => handleNavClick('work', 'PHOTOGRAPHY')}
              className="font-nav-link text-[13px] tracking-widest text-[#c4c7c8] hover:text-white transition-all duration-300 py-1 cursor-pointer focus:outline-none"
            >
              Photography
            </button>

            <button
              onClick={() => handleNavClick('work', 'FILM')}
              className="font-nav-link text-[13px] tracking-widest text-[#c4c7c8] hover:text-white transition-all duration-300 py-1 cursor-pointer focus:outline-none"
            >
              Videography
            </button>

            <button
              onClick={() => handleNavClick('studio')}
              className={`font-nav-link text-[13px] tracking-widest transition-all duration-300 relative py-1 cursor-pointer focus:outline-none ${
                currentSection === 'studio'
                  ? 'text-white border-b-2 border-white'
                  : 'text-[#c4c7c8] hover:text-white'
              }`}
            >
              About
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`font-nav-link text-[13px] tracking-widest transition-all duration-300 relative py-1 cursor-pointer focus:outline-none ${
                currentSection === 'contact'
                  ? 'text-white border-b-2 border-white'
                  : 'text-[#c4c7c8] hover:text-white'
              }`}
            >
              Contact
            </button>
          </div>

          {/* Right Action Button */}
          <div className="hidden lg:block">
            <button
              onClick={() => handleNavClick('contact')}
              className="border border-white/80 hover:border-white px-5 py-2.5 xl:px-6 xl:py-3 font-label-caps text-[10px] xl:text-[11px] text-white hover:bg-white hover:text-[#131313] transition-all duration-300 active:scale-95 cursor-pointer flex items-center gap-2 group"
            >
              <span>Let's Work Together</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          {/* Mobile & Tablet Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none bg-white/5 border border-white/10 rounded-none active:bg-white/20 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer with AnimatePresence */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden bg-[#131313]/98 border-b border-[#444748]/40 shadow-2xl backdrop-blur-2xl"
            >
              <div className="px-6 py-8 flex flex-col space-y-4 max-h-[85vh] overflow-y-auto">
                <button
                  onClick={() => handleNavClick('home')}
                  className={`text-left font-nav-link text-base tracking-widest uppercase py-2.5 min-h-[44px] flex items-center border-b border-white/5 ${
                    currentSection === 'home' ? 'text-white font-bold pl-2 border-l-2 border-white' : 'text-[#c4c7c8]'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavClick('work', 'ALL')}
                  className={`text-left font-nav-link text-base tracking-widest uppercase py-2.5 min-h-[44px] flex items-center border-b border-white/5 ${
                    currentSection === 'work' ? 'text-white font-bold pl-2 border-l-2 border-white' : 'text-[#c4c7c8]'
                  }`}
                >
                  Portfolio / All Works
                </button>
                <div className="grid grid-cols-2 gap-2 pl-3 py-1">
                  <button
                    onClick={() => handleNavClick('work', 'PHOTOGRAPHY')}
                    className="text-left font-label-caps text-xs tracking-wider text-[#999] hover:text-white py-2 min-h-[44px] flex items-center"
                  >
                    • Photography
                  </button>
                  <button
                    onClick={() => handleNavClick('work', 'FILM')}
                    className="text-left font-label-caps text-xs tracking-wider text-[#999] hover:text-white py-2 min-h-[44px] flex items-center"
                  >
                    • Videography
                  </button>
                </div>
                <button
                  onClick={() => handleNavClick('studio')}
                  className={`text-left font-nav-link text-base tracking-widest uppercase py-2.5 min-h-[44px] flex items-center border-b border-white/5 ${
                    currentSection === 'studio' ? 'text-white font-bold pl-2 border-l-2 border-white' : 'text-[#c4c7c8]'
                  }`}
                >
                  About &amp; Studio Profile
                </button>
                <button
                  onClick={() => handleNavClick('contact')}
                  className={`text-left font-nav-link text-base tracking-widest uppercase py-2.5 min-h-[44px] flex items-center border-b border-white/5 ${
                    currentSection === 'contact' ? 'text-white font-bold pl-2 border-l-2 border-white' : 'text-[#c4c7c8]'
                  }`}
                >
                  Contact &amp; Bookings
                </button>
                <div className="pt-4">
                  <button
                    onClick={() => handleNavClick('contact')}
                    className="w-full border border-white py-4 font-label-caps text-xs text-white hover:bg-white hover:text-black transition-colors min-h-[48px] active:scale-[0.98]"
                  >
                    Let's Work Together
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
