import React, { useState } from "react";
import {
  Folder,
  File,
  ChevronRight,
  X,
  ExternalLink,
  MousePointerClick,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ProjectList = ({ projects, onProjectClick }) => {
  return (
    <div className="bg-black border border-green-500 rounded-md p-4 font-mono text-green-300">
      <div className="flex items-center mb-4 text-green-400">
        <MousePointerClick size={18} className="mr-2" />
        <span>Click on a project to view details</span>
      </div>
      {projects.map((project, index) => (
        <div
          key={index}
          className="flex items-center py-2 cursor-pointer hover:bg-green-900 hover:bg-opacity-20 transition-colors duration-200"
          onClick={() => onProjectClick(project)}
        >
          <Folder size={18} className="mr-2 text-green-500" />
          <span className="text-green-400 mr-4">drwxr-xr-x</span>
          <span className="text-green-300">{project.title}</span>
          <ChevronRight size={18} className="ml-auto text-green-500" />
        </div>
      ))}
    </div>
  );
};

const Modal = ({ project, onClose }) => {
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
          <div className="flex justify-between items-center p-4 border-b border-green-500">
            <div className="flex items-center">
              <File size={18} className="mr-2 text-green-500" />
              <span className="text-green-500 font-bold">
                cat {project.title}.md
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-green-500 hover:text-green-400 transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 font-mono">
            <h2 className="text-2xl font-bold text-green-500 mb-4">
              # {project.title}
            </h2>

            <p className="text-green-400 mb-4">{project.description}</p>

            <h3 className="text-xl font-semibold text-green-500 mb-2">
              ## Technologies
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-green-900 text-green-300 px-2 py-1 rounded-md text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-semibold text-green-500 mb-2">
              ## Key Features
            </h3>
            <ul className="list-disc list-inside mb-4 text-green-400 space-y-2">
              {project.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-500 text-black px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 text-sm font-semibold"
            >
              View Project <ExternalLink size={16} className="ml-2" />
            </a>
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
      title: "DailyNewsReport",
      description:
        "A sophisticated news aggregation system leveraging APIs from multiple news sources.",
      technologies: ["Python", "Cronjob", "API"],
      details: [
        "Created a system to curate a daily news report based on top 20 trending headlines across business and politics.",
        "Heightened personal productivity and information gathering, reducing daily news browsing time by around 30 minutes.",
        "Achieved 100% program uptime for daily report generation and distribution by executing Cron automation.",
      ],
      link: "https://github.com/AveryClapp/DailyNewsReport",
    },
    {
      title: "InstagramBotSuite",
      description:
        "An analytics tool capable of tracking 1000+ Instagram accounts with custom algorithms.",
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
      title: "CryptoTradePlatform",
      description:
        "A robust crypto trading platform leveraging diverse data to evaluate real-time financial metrics and trends.",
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
      <section id="projects" className="mt-4">
        <ProjectList projects={projects} onProjectClick={setSelectedProject} />
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
