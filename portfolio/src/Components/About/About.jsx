import { React, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { FaPython, FaJs, FaHtml5, FaRust } from "react-icons/fa";
import {
  SiTypescript,
  SiCplusplus,
  SiMysql,
  SiTailwindcss,
} from "react-icons/si";

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
                  onClick={() => onProjectClick(project)}
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

// Modal Component
const Modal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">{project.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-gray-600 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300"
          >
            View Project
          </a>
        </div>
      </div>
    </div>
  );
};

const TechStackItem = ({ icon: Icon, name, color }) => (
  <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
    <Icon className={`text-${color} text-2xl mr-3`} />
    <span className="text-gray-700 font-medium">{name}</span>
  </div>
);

const Experience = ({ experiences }) => {
  return (
    <div className="space-y-6">
      {experiences.map((exp, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
          <p className="text-indigo-600">{exp.company}</p>
          <p className="text-gray-600 mb-2">{exp.period}</p>
          <ul className="list-disc list-inside text-gray-700">
            {exp.responsibilities.map((resp, idx) => (
              <li key={idx}>{resp}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

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
      title: "Project 1",
      description:
        "This is a detailed description of Project 1. It showcases my skills in...",
      image: "https://via.placeholder.com/400x200?text=Project+1",
      technologies: ["React", "Node.js", "MongoDB"],
      link: "https://project1.example.com",
    },
    {
      title: "Project 2",
      description: "Project 2 is an innovative application that...",
      image: "https://via.placeholder.com/400x200?text=Project+2",
      technologies: ["Vue.js", "Express", "PostgreSQL"],
      link: "https://project2.example.com",
    },
    // Add more projects as needed
  ];
  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Innovators Inc.",
      period: "2020 - Present",
      responsibilities: [
        "Led the development of responsive web applications using React and Next.js",
        "Collaborated with UX designers to implement pixel-perfect interfaces",
        "Mentored junior developers and conducted code reviews",
      ],
    },
    // Add more experiences as needed
  ];
  return (
    <>
      <section id="tech-stack" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Tech Stack
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {techStack.map((tech, index) => (
            <TechStackItem key={index} {...tech} />
          ))}
        </div>
      </section>

      <section id="projects" className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Projects
        </h2>
        <Carousel projects={projects} onProjectClick={setSelectedProject} />
      </section>

      <section id="experience" className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Experience
        </h2>
        <Experience experiences={experiences} />
      </section>

      {selectedProject && (
        <Modal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default About;
