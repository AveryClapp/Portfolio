import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react";
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

  return (
    <div className="relative w-full h-96 bg-black border border-green-500 rounded-md overflow-hidden">
      <div className="absolute inset-0">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-black bg-opacity-75 p-6 ">
              <div className="flex flex-direction-row w-full">
                <h3 className="text-green-500 text-2xl font-bold mb-2 font-mono justify-self-start">
                  {project.title}
                </h3>{" "}
                <button
                  onClick={() => onProjectClick(projects[currentIndex])}
                  className="bg-green-500 text-black px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 font-mono justify-self-end"
                >
                  View Details
                </button>
              </div>
              <p className="text-green-400 mb-4 line-clamp-2 font-mono">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-green-500 text-black p-2 rounded-md hover:bg-green-600 transition duration-300"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-green-500 text-black p-2 rounded-md hover:bg-green-600 transition duration-300"
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
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-black border border-green-500 rounded-md shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          <div className="flex justify-between items-center p-6 border-b border-green-500">
            <h2 className="text-2xl font-bold text-green-500 font-mono">
              {project.title}
            </h2>
            <button
              onClick={onClose}
              className="text-green-500 hover:text-green-400 transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 font-mono">
            <div className="flex justify-between items-center mb-6">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-500 text-black px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 text-sm font-semibold"
              >
                View Project <ExternalLink size={16} className="ml-2" />
              </a>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-green-900 text-green-300 px-2 py-1 rounded-md text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-green-400 mb-6">{project.description}</p>

            <h3 className="text-xl font-semibold text-green-500 mb-3">
              Key Features:
            </h3>
            <ul className="list-disc list-inside mb-6 text-green-400 space-y-2">
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

const Projects = () => {
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
    <div className="font-mono">
      <section id="projects" className="">
        <div className="mb-8">
          <p className="text-green-500 text-sm mb-2">$ ls projects</p>
          <h2 className="text-3xl font-bold text-green-500">Projects</h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <Carousel projects={projects} onProjectClick={setSelectedProject} />
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

export default Projects;
