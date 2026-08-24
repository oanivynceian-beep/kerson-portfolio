import { useState, useEffect } from 'react';
import { NavSection, ProjectCategory, PortfolioItem } from './types';
import { PORTFOLIO_ITEMS } from './data/portfolioData';
import { Navigation } from './components/Navigation';
import { HomeScreen } from './components/HomeScreen';
import { PortfolioScreen } from './components/PortfolioScreen';
import { StudioScreen } from './components/StudioScreen';
import { ContactScreen } from './components/ContactScreen';
import { ProjectModal } from './components/ProjectModal';
import { Footer } from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentSection, setCurrentSection] = useState<NavSection>('home');
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('ALL');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  // Scroll to top on section change
  const handleNavigate = (section: NavSection, category?: ProjectCategory) => {
    setCurrentSection(section);
    if (category) {
      setActiveCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = PORTFOLIO_ITEMS.findIndex((p) => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % PORTFOLIO_ITEMS.length;
    setSelectedProject(PORTFOLIO_ITEMS[nextIndex]);
  };

  const handlePrevProject = () => {
    if (!selectedProject) return;
    const currentIndex = PORTFOLIO_ITEMS.findIndex((p) => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + PORTFOLIO_ITEMS.length) % PORTFOLIO_ITEMS.length;
    setSelectedProject(PORTFOLIO_ITEMS[prevIndex]);
  };

  // Listen to hash changes if user navigated via browser hash
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'portfolio' || hash === 'work' || hash === 'photography' || hash === 'video' || hash === 'featured') {
        setCurrentSection('work');
        if (hash === 'photography') setActiveCategory('PHOTOGRAPHY');
        if (hash === 'video') setActiveCategory('FILM');
      } else if (hash === 'about' || hash === 'studio') {
        setCurrentSection('studio');
      } else if (hash === 'contact') {
        setCurrentSection('contact');
      } else if (hash === 'home' || hash === '') {
        setCurrentSection('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#131313] text-[#e5e2e1] flex flex-col font-sans selection:bg-white selection:text-black">
      {/* Fixed Navigation */}
      <Navigation
        currentSection={currentSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area with Animated Transition */}
      <main className="flex-grow w-full relative">
        <AnimatePresence mode="wait">
          {currentSection === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <HomeScreen
                onNavigate={handleNavigate}
                onSelectProject={(project) => setSelectedProject(project)}
              />
            </motion.div>
          )}

          {currentSection === 'work' && (
            <motion.div
              key="work"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <PortfolioScreen
                activeCategory={activeCategory}
                onCategoryChange={(cat) => setActiveCategory(cat)}
                onSelectProject={(project) => setSelectedProject(project)}
              />
            </motion.div>
          )}

          {currentSection === 'studio' && (
            <motion.div
              key="studio"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <StudioScreen
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {currentSection === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <ContactScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Project Lightbox Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onPrev={handlePrevProject}
        onNext={handleNextProject}
        onOpenContact={() => {
          setSelectedProject(null);
          handleNavigate('contact');
        }}
      />

      {/* Persistent Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
