import React, { useState, useEffect } from "react";
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
  <section id={id} className={`py-20 ${bgColor}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.h2
        className="text-3xl font-extrabold text-gray-900 mb-10"
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
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto">
          <Section id="welcome" title="Welcome to My Portfolio">
            <motion.div
              className="prose lg:prose-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <p>
                Hello! I'm [Your Name], a passionate frontend developer with a
                keen eye for creating beautiful and functional web experiences.
              </p>
              <p>On this site, you'll find:</p>
              <ul>
                <li>An overview of my technical skills and projects</li>
                <li>Insights into my professional experience</li>
                <li>A glimpse into my personal interests and hobbies</li>
                <li>Ways to get in touch with me</li>
              </ul>
              <p>
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
                className="bg-white p-6 rounded-lg shadow-md"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Code className="mr-2" /> Tech Stack
                </h3>
                <ul className="list-disc list-inside">
                  <li>React.js</li>
                  <li>Next.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  {/* Add more technologies */}
                </ul>
              </motion.div>
              <motion.div
                className="bg-white p-6 rounded-lg shadow-md"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Briefcase className="mr-2" /> Work Experience
                </h3>
                <ul className="space-y-2">
                  <li>
                    <strong>Frontend Developer</strong> - Company Name
                    <p className="text-sm text-gray-600">2020 - Present</p>
                  </li>
                  {/* Add more work experiences */}
                </ul>
              </motion.div>
            </div>
            <motion.div
              className="mt-8 bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-4">Personal Projects</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border p-4 rounded">
                  <h4 className="font-medium">Project Name</h4>
                  <p className="text-sm text-gray-600">
                    Brief description of the project
                  </p>
                  <a
                    href="#"
                    className="text-indigo-600 hover:text-indigo-800 text-sm"
                  >
                    View Project
                  </a>
                </div>
                {/* Add more project cards */}
              </div>
            </motion.div>
          </Section>

          <Section id="personal" title="Hobbies & Interests">
            <motion.div
              className="prose lg:prose-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p>When I'm not coding, you can find me:</p>
              <ul>
                <li>Exploring nature trails and hiking</li>
                <li>Reading science fiction novels</li>
                <li>Experimenting with new cooking recipes</li>
                <li>Playing strategy board games with friends</li>
              </ul>
              <p>
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
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </motion.div>
          </Section>

          <footer className="bg-gray-800 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center space-x-6 mb-4">
                <a href="#" className="hover:text-gray-300">
                  <Github />
                </a>
                <a href="#" className="hover:text-gray-300">
                  <Linkedin />
                </a>
                <a href="#" className="hover:text-gray-300">
                  <Mail />
                </a>
              </div>
              <p className="text-center text-sm">
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
