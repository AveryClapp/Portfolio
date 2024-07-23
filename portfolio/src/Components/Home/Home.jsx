import React, { useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Menu,
  Code,
  Briefcase,
  Heart,
  Send,
} from "lucide-react";
import Sidebar from "../Sidebar/Sidebar";
import { motion } from "framer-motion";

const Section = ({ id, title, children, bgColor = "bg-white" }) => (
  <section id={id} className={`py-24 ${bgColor}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      {children}
    </div>
  </section>
);

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto">
          <Section id="welcome" title="Welcome to My Portfolio">
            <motion.div
              className="prose lg:prose-xl max-w-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
                Hello! I'm{" "}
                <span className="font-semibold text-indigo-600">
                  [Your Name]
                </span>
                , a passionate frontend developer with a keen eye for creating
                beautiful and functional web experiences.
              </p>
              <p className="text-lg md:text-xl text-gray-600 mb-4">
                On this site, you'll find:
              </p>
              <ul className="list-none space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="text-indigo-500 mr-2">•</span> An overview of
                  my technical skills and projects
                </li>
                <li className="flex items-center">
                  <span className="text-indigo-500 mr-2">•</span> Insights into
                  my professional experience
                </li>
                <li className="flex items-center">
                  <span className="text-indigo-500 mr-2">•</span> A glimpse into
                  my personal interests and hobbies
                </li>
                <li className="flex items-center">
                  <span className="text-indigo-500 mr-2">•</span> Ways to get in
                  touch with me
                </li>
              </ul>
              <p className="text-lg md:text-xl text-gray-700 mt-6">
                I'm excited to share my journey with you and potentially
                collaborate on future projects!
              </p>
            </motion.div>
          </Section>

          <Section
            id="technical"
            title="Technical Expertise"
            bgColor="bg-gray-50"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                className="bg-white p-8 rounded-lg shadow-md"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                  <Code className="mr-3 text-indigo-500" /> Tech Stack
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-indigo-500 mr-2">▹</span> React.js
                  </li>
                  <li className="flex items-center">
                    <span className="text-indigo-500 mr-2">▹</span> Next.js
                  </li>
                  <li className="flex items-center">
                    <span className="text-indigo-500 mr-2">▹</span> TypeScript
                  </li>
                  <li className="flex items-center">
                    <span className="text-indigo-500 mr-2">▹</span> Tailwind CSS
                  </li>
                </ul>
              </motion.div>
              <motion.div
                className="bg-white p-8 rounded-lg shadow-md"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                  <Briefcase className="mr-3 text-indigo-500" /> Work Experience
                </h3>
                <ul className="space-y-4">
                  <li>
                    <h4 className="font-semibold text-lg text-gray-800">
                      Frontend Developer
                    </h4>
                    <p className="text-indigo-600">Company Name</p>
                    <p className="text-sm text-gray-600">2020 - Present</p>
                  </li>
                </ul>
              </motion.div>
            </div>
            <motion.div
              className="mt-12 bg-white p-8 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                Personal Projects
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <h4 className="font-semibold text-lg text-gray-800 mb-2">
                    Project Name
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Brief description of the project
                  </p>
                  <a
                    href="#"
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    View Project →
                  </a>
                </div>
              </div>
            </motion.div>
          </Section>

          <Section id="personal" title="Hobbies & Interests">
            <motion.div
              className="prose lg:prose-xl max-w-none"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xl text-gray-700 mb-6">
                When I'm not coding, you can find me:
              </p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-3 mt-1">◆</span>
                  <span>Exploring nature trails and hiking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-3 mt-1">◆</span>
                  <span>Reading science fiction novels</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-3 mt-1">◆</span>
                  <span>Experimenting with new cooking recipes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-3 mt-1">◆</span>
                  <span>Playing strategy board games with friends</span>
                </li>
              </ul>
              <p className="text-lg text-gray-700 mt-8">
                These hobbies not only provide a great work-life balance but
                also inspire creativity in my professional work.
              </p>
            </motion.div>
          </Section>

          <Section id="contact" title="Get in Touch" bgColor="bg-gray-50">
            <motion.div
              className="max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </motion.div>
          </Section>

          <footer className="bg-gray-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center space-x-8 mb-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-150 ease-in-out"
                >
                  <Github size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-150 ease-in-out"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-150 ease-in-out"
                >
                  <Mail size={24} />
                </a>
              </div>
              <p className="text-center text-gray-400 text-sm">
                © 2024 Your Name. All rights reserved.
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Home;
