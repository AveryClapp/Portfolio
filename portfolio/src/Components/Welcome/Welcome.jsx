import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Welcome = () => {
  return (
    <section
      id="home"
      className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20 mb-0"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Welcome to My Portfolio
        </h1>
        <p className="text-xl md:text-2xl mb-10">
          I'm Avery, a rising Junionr at Johns Hopkins University studying
          Computer Science and Economics.
        </p>
        <div className="flex justify-center space-x-4 mb-8">
          <a
            href="https://github.com/AveryClapp"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-indigo-600 p-2 rounded-full hover:bg-indigo-100 transition duration-300"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/avery-clapp-062289245/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-indigo-600 p-2 rounded-full hover:bg-indigo-100 transition duration-300"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:aclapp1@jh.edu"
            className="bg-white text-indigo-600 p-2 rounded-full hover:bg-indigo-100 transition duration-300"
          >
            <Mail size={24} />
          </a>
        </div>
        <a href="#contact" className="btn-secondary font-semibold">
          Get in Touch
        </a>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};
export default Welcome;
