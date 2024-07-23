import React from "react";
import { Code } from "lucide-react";

const About = () => {
  return (
    <>
      <section id="tech-stack" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Tech Stack
        </h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {["React.js", "Next.js", "TypeScript", "Tailwind CSS"].map(
              (tech, index) => (
                <li key={index} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-center">
                    <Code className="flex-shrink-0 mr-3 h-5 w-5 text-indigo-500" />
                    <p className="text-sm font-medium text-gray-900">{tech}</p>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      </section>

      <section id="projects" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Projects
        </h2>
        <div className="space-y-6">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Project Name
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Brief description of the project and its key features.
              </p>
              <div className="mt-4">
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  View Project
                </a>
              </div>
            </div>
          </div>
          {/* Add more project cards here */}
        </div>
      </section>

      <section id="experience" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Experience
        </h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Frontend Developer
            </h3>
            <p className="mt-1 text-sm text-indigo-600">Company Name</p>
            <p className="mt-1 text-sm text-gray-500">2020 - Present</p>
            <ul className="mt-3 list-disc list-inside text-sm text-gray-600">
              <li>
                Developed responsive web applications using React and Next.js
              </li>
              <li>
                Collaborated with UX designers to implement pixel-perfect
                interfaces
              </li>
              {/* Add more responsibilities */}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
