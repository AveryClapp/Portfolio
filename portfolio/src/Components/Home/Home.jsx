import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Menu, Terminal } from "lucide-react";
import { useInView } from "react-intersection-observer";
import Sidebar from "../Sidebar/Sidebar";
import Welcome from "../Welcome/Welcome";
import Hobbies from "../Hobbies/Hobbies";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import TechStack from "../Technical/TechStack";
import Projects from "../Technical/Projects";
import Experience from "../Technical/Experience";

const MatrixBackground = ({
  fontSize = 15,
  charColor = "#0F0",
  fadeSpeed = 0.05,
  frameRate = 30,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const columns = canvas.width / fontSize;
    const drops = new Array(Math.floor(columns)).fill(1);

    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?";

    const draw = () => {
      ctx.fillStyle = `rgba(0, 0, 0, ${fadeSpeed})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = charColor;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 1000 / frameRate);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [fontSize, charColor, fadeSpeed, frameRate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 opacity-30"
    />
  );
};

const TerminalWindow = ({ title, children }) => {
  const [command, ...titleParts] = title.split(" ");
  const restOfTitle = titleParts.join(" ");

  return (
    <div className="bg-black border border-green-500 rounded-lg overflow-hidden mb-6 shadow-lg shadow-green-500/20">
      <div className="bg-green-900 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <Terminal size={16} className="mr-2 text-green-500" />
          <span className="text-green-500 font-mono font-black text-xl mr-2">
            {command}
          </span>
          <span className="text-green-300 font-mono font-bolder">
            {restOfTitle}
          </span>
        </div>
      </div>
      <div className="p-4 font-mono text-green-500">{children}</div>
    </div>
  );
};

const TypewriterEffect = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const intervalRef = useRef(null);

  useEffect(() => {
    if (inView && text && typeof text === "string") {
      let i = 0;

      const typeChar = () => {
        if (i <= text.length) {
          setDisplayedText(text.slice(0, i));
          i++;
        } else {
          clearInterval(intervalRef.current);
        }
      };

      intervalRef.current = setInterval(typeChar, 50);

      return () => clearInterval(intervalRef.current);
    }
  }, [inView, text]);

  return (
    <span ref={ref}>
      {displayedText}
      {displayedText.length < text.length && (
        <span className="animate-pulse">▋</span>
      )}
    </span>
  );
};

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const generateLoginMessage = () => {
    const now = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = days[now.getDay()];
    const month = months[now.getMonth()];
    const date = now.getDate().toString().padStart(2, "0");
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    return `Last login: ${day} ${month} ${date} ${hours}:${minutes}:${seconds} on server: avery-portfolio-1`;
  };
  const loginMessage = generateLoginMessage();

  return (
    <div className="relative min-h-screen bg-black text-green-500 font-mono">
      <MatrixBackground
        fontSize={20}
        charColor="#00FF00"
        fadeSpeed={0.1}
        frameRate={15}
      />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="relative z-20 flex-1 lg:ml-64">
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
            <TerminalWindow title="Welcome">
              <TypewriterEffect text={loginMessage} />
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
            <TerminalWindow title="Tech-Stack">
              <TypewriterEffect text="$ techstack --list --verbose" />
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
            <TerminalWindow title="Personal Projects">
              <TypewriterEffect text="$ ls -l ~/projects/" />
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
            <TerminalWindow title="Experience">
              <TypewriterEffect text="$ grep -H '' experience/*.md" />
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
            <TerminalWindow title="Hobbies">
              <TypewriterEffect text="$ cat /home/avery/hobbies/*" />
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
            <TerminalWindow title="Contact">
              <TypewriterEffect text="$ mail -s 'New Contact' aclapp1@jh.edu" />
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
