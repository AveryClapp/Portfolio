import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Sidebar from "../Sidebar/Sidebar";
import Welcome from "../Welcome/Welcome";
import About from "../About/About";
import Hobbies from "../Hobbies/Hobbies";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";

const DynamicBackground = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    const updateSize = () => {
      const width = document.documentElement.scrollWidth;
      const height = document.documentElement.scrollHeight;
      svg.setAttribute("width", width);
      svg.setAttribute("height", height);
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    const createLine = () => {
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("stroke", "rgba(99, 102, 241, 0.2)");
      line.setAttribute("stroke-width", "2");
      svg.appendChild(line);

      const animate = () => {
        const width = document.documentElement.scrollWidth;
        const height = document.documentElement.scrollHeight;
        const duration = 5000 + Math.random() * 5000;
        const x1 = Math.random() * width;
        const y1 = Math.random() * height;
        const x2 = Math.random() * width;
        const y2 = Math.random() * height;

        line.animate(
          [
            {
              x1: line.getAttribute("x1") || 0,
              y1: line.getAttribute("y1") || 0,
              x2: line.getAttribute("x2") || 0,
              y2: line.getAttribute("y2") || 0,
            },
            { x1, y1, x2, y2 },
          ],
          {
            duration,
            fill: "forwards",
          }
        ).onfinish = () => {
          line.setAttribute("x1", x1);
          line.setAttribute("y1", y1);
          line.setAttribute("x2", x2);
          line.setAttribute("y2", y2);
          animate();
        };
      };

      animate();
    };

    const createParticle = () => {
      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circle.setAttribute("r", Math.random() * 2 + 1);
      circle.setAttribute("fill", "rgba(99, 102, 241, 0.5)");
      svg.appendChild(circle);

      const animate = () => {
        const width = document.documentElement.scrollWidth;
        const height = document.documentElement.scrollHeight;
        const duration = 3000 + Math.random() * 3000;
        const cx = Math.random() * width;
        const cy = Math.random() * height;

        circle.animate(
          [
            {
              cx: circle.getAttribute("cx") || 0,
              cy: circle.getAttribute("cy") || 0,
            },
            { cx, cy },
          ],
          {
            duration,
            fill: "forwards",
          }
        ).onfinish = () => {
          circle.setAttribute("cx", cx);
          circle.setAttribute("cy", cy);
          animate();
        };
      };

      animate();
    };

    for (let i = 0; i < 20; i++) {
      createLine();
    }

    for (let i = 0; i < 50; i++) {
      createParticle();
    }

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="fixed inset-0 w-full h-full"
      style={{ minHeight: "100%", minWidth: "100%" }}
    >
      <defs>
        <radialGradient
          id="grid-gradient"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
        >
          <stop offset="0%" stopColor="rgba(99, 102, 241, 0.1)" />
          <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-gradient)" />
    </svg>
  );
};

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Fixed gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900" />

      {/* Dynamic Background */}
      <DynamicBackground />

      <main className="relative z-10 flex-1 lg:ml-64">
        {/* Mobile menu button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 left-4 p-2 bg-indigo-600 rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 lg:hidden z-50"
        >
          <Menu size={24} />
        </button>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.section
            id="home"
            className="py-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Welcome />
          </motion.section>

          <motion.section
            id="tech-stack"
            className="py-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Add your tech stack content here */}
          </motion.section>

          <motion.section
            id="projects"
            className="py-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Add your projects content here */}
          </motion.section>

          <motion.section
            id="experience"
            className="py-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <About />
          </motion.section>

          <motion.section
            id="hobbies"
            className="py-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Hobbies />
          </motion.section>

          <motion.section
            id="contact"
            className="py-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Contact />
          </motion.section>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Home;
