import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Education from './components/Education';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="min-h-screen bg-[#121212] font-body flex flex-col overflow-x-hidden">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-8 items-start">
        <Sidebar />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-1 w-full"
          >
            {activeSection === 'home' && <MainContent />}
            {activeSection === 'education' && <Education />}
            {activeSection === 'projects' && <Projects />}
            {activeSection === 'skills' && <Skills />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;