import { React, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react";
import { FaPython, FaJs, FaHtml5, FaRust } from "react-icons/fa";
import {
  SiTypescript,
  SiCplusplus,
  SiMysql,
  SiTailwindcss,
} from "react-icons/si";
import Experience from "./Experience";
import { motion, AnimatePresence } from "framer-motion";

const Carousel = ({ projects, onProjectClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    );
  };

  // Update currentProject whenever currentIndex changes
  useEffect(() => {
    // This ensures that the correct project is always used
  }, [currentIndex, projects]);

  return (
    <div className="relative w-full h-96 bg-gray-100 rounded-xl overflow-hidden">
      <div className="absolute inset-0">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-2xl font-bold mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-200 mb-4 line-clamp-2">
                  {project.description}
                </p>
                <button
                  onClick={() => onProjectClick(projects[currentIndex])}
                  className="bg-white text-black px-4 py-2 rounded-full hover:bg-opacity-90 transition duration-300"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 text-black p-2 rounded-full hover:bg-opacity-75 transition duration-300"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 text-black p-2 rounded-full hover:bg-opacity-75 transition duration-300"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

const Modal = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">
              {project.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 text-sm font-semibold"
              >
                View Project <ExternalLink size={16} className="ml-2" />
              </a>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover rounded-lg mb-6 shadow-md"
            />

            <p className="text-gray-600 mb-6">{project.description}</p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Key Features:
            </h3>
            <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2">
              {project.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const TechStackItem = ({ icon: Icon, name, color }) => (
  <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
    <Icon className={`text-${color} text-2xl mr-3`} />
    <span className="text-gray-700 font-medium">{name}</span>
  </div>
);

const About = () => {
  const techStack = [
    { name: "Python", icon: FaPython, color: "blue-500" },
    { name: "JavaScript", icon: FaJs, color: "yellow-500" },
    { name: "TypeScript", icon: SiTypescript, color: "blue-600" },
    { name: "C++", icon: SiCplusplus, color: "blue-700" },
    { name: "SQL", icon: SiMysql, color: "orange-500" },
    { name: "HTML", icon: FaHtml5, color: "red-500" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "cyan-400" },
    { name: "Rust", icon: FaRust, color: "orange-700" },
  ];

  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: "Daily News Report",
      description:
        "A sophisticated news aggregation system leveraging APIs from multiple news sources.",
      image: "https://via.placeholder.com/400x200?text=Daily+News+Report",
      technologies: ["Python", "Cronjob", "API"],
      details: [
        "Created a system to curate a daily news report based on top 20 trending headlines across business and politics.",
        "Heightened personal productivity and information gathering, reducing daily news browsing time by around 30 minutes.",
        "Achieved 100% program uptime for daily report generation and distribution by executing Cron automation.",
      ],
      link: "https://github.com/AveryClapp/DailyNewsReport",
    },
    {
      title: "Instagram Botting Suite",
      description:
        "An analytics tool capable of tracking 1000+ Instagram accounts with custom algorithms.",
      image: "https://via.placeholder.com/400x200?text=Instagram+Botting+Suite",
      technologies: ["Rust", "JavaScript", "Tokio"],
      details: [
        "Engineered an analytics tool with Python and API integration, capable of tracking 1000+ Instagram accounts.",
        "Developed 'ghost' follower identification feature with custom algorithms to optimize user engagement.",
        "Implemented follower and following tracking with data visualization, providing key growth performance insights.",
        "Utilized the Selenium WebDriver to handle complex DOM interactions, ensuring reliability across dynamic page states.",
      ],
      link: "https://github.com/AveryClapp/InstagramAnalyzer",
    },
    {
      title: "Crypto Trading Platform",
      description:
        "A robust crypto trading platform leveraging diverse data to evaluate real-time financial metrics and trends.",
      image: "https://via.placeholder.com/400x200?text=Crypto+Trading+Platform",
      technologies: ["Python", "React.js", "FastAPI", "Scikit-Learn"],
      details: [
        "Built a platform evaluating 15+ real-time financial metrics and trends.",
        "Optimized Natural Language Processing (NLP) models for market sentiment analysis, processing 300+ daily posts.",
        "Trained Machine Learning (ML) models with scikit-learn on historical data to improve price movement forecasts.",
        "Designed a scalable backend infrastructure with FastAPI, generating real-time data streams for instant market insights.",
        "Crafted a React.js application featuring real-time charts and customizable dashboards for efficient crypto data analysis.",
      ],
      link: "https://github.com/AveryClapp/AICryptoPlatform",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <section id="tech-stack" className="pt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Tech Stack
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {techStack.map((tech, index) => (
            <TechStackItem key={index} {...tech} />
          ))}
        </div>
      </section>

      <section id="projects" className="my-36">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Projects
        </h2>
        <div className="max-w-3xl mx-auto">
          <Carousel projects={projects} onProjectClick={setSelectedProject} />
        </div>
      </section>

      <section id="experience" className="mb-20">
        <div className="max-w-3xl mx-auto">
          <Experience />
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <Modal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default About;
