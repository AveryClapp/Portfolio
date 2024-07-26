import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, Terminal } from "lucide-react";
import Sidebar from "../Sidebar/Sidebar";
import Welcome from "../Welcome/Welcome";
import Hobbies from "../Hobbies/Hobbies";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import TechStack from "../Technical/TechStack";
import Projects from "../Technical/Projects";
import Experience from "../Technical/Experience";

const TerminalWindow = ({ title, children }) => (
  <div className="bg-black border border-green-500 rounded-lg overflow-hidden mb-6 shadow-lg shadow-green-500/20">
    <div className="bg-green-900 px-4 py-2 flex items-center">
      <Terminal size={16} className="mr-2 text-green-500" />
      <span className="text-green-500 font-mono">{title}</span>
    </div>
    <div className="p-4 font-mono text-green-500">{children}</div>
  </div>
);

const TypewriterEffect = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [text]);

  return (
    <span>
      {displayedText}
      <span className="animate-pulse">▋</span>
    </span>
  );
};

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-green-500 font-mono">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Subtle grid background */}
      <div className="fixed inset-0 bg-grid-green/10" />

      <main className="relative z-10 flex-1 lg:ml-64">
        {/* Mobile menu button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 left-4 p-2 bg-green-600 rounded-md text-black hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 lg:hidden z-50"
        >
          <Menu size={24} />
        </button>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.section
            id="home"
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TerminalWindow title="Welcome.exe">
              <TypewriterEffect text="Initializing Avery's Portfolio..." />
              <Welcome />
            </TerminalWindow>
          </motion.section>

          <motion.section
            id="tech-stack"
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TerminalWindow title="TechStack.sh">
              <TechStack />
            </TerminalWindow>
          </motion.section>

          <motion.section
            id="projects"
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <TerminalWindow title="Projects.json">
              <Projects />
            </TerminalWindow>
          </motion.section>

          <motion.section
            id="experience"
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <TerminalWindow title="Experience.log">
              <Experience />
            </TerminalWindow>
          </motion.section>

          <motion.section
            id="hobbies"
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <TerminalWindow title="Hobbies.txt">
              <Hobbies />
            </TerminalWindow>
          </motion.section>

          <motion.section
            id="contact"
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <TerminalWindow title="Contact.py">
              <Contact />
            </TerminalWindow>
          </motion.section>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Home;
