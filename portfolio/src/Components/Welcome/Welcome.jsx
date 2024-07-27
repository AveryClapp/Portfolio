import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const CommandOutput = ({ command, children }) => (
  <div className="mb-6 w-full">
    <p className="text-sm text-green-400 mb-2">$ {command}</p>
    <div className="bg-black border border-green-500 rounded-lg p-4 w-full">
      {children}
    </div>
  </div>
);

const Welcome = () => {
  return (
    <section id="home" className="text-green-300 font-mono pt-8 w-full">
      <div className="w-full">
        <CommandOutput command="./welcome.sh">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-green-500">
            Welcome to My Portfolio
          </h1>
          <p className="text-lg">[System] Initializing portfolio... Done.</p>
        </CommandOutput>

        <CommandOutput command="cat about.txt">
          <p className="text-lg">
            Name: Avery Clapp
            <br />
            Class: Rising Junior at Johns Hopkins University
            <br />
            Major: Computer Science and Economics
            <br />
            Interests: FinTech Applications, Data Driven Solutions, Scalable Web
            Development
            <br />
          </p>
        </CommandOutput>

        <CommandOutput command="ls -l social-links/">
          <div className="flex flex-col space-y-2">
            <a
              href="https://github.com/AveryClapp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-green-500 transition-colors duration-300"
            >
              <Github size={20} className="mr-2" />
              <span>github.com/AveryClapp</span>
            </a>
            <a
              href="https://www.linkedin.com/in/avery-clapp-062289245/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-green-500 transition-colors duration-300"
            >
              <Linkedin size={20} className="mr-2" />
              <span>linkedin.com/in/avery-clapp-062289245</span>
            </a>
            <a
              href="mailto:aclapp1@jh.edu"
              className="flex items-center hover:text-green-500 transition-colors duration-300"
            >
              <Mail size={20} className="mr-2" />
              <span>aclapp1@jh.edu</span>
            </a>
          </div>
        </CommandOutput>

        <CommandOutput command="./contact.sh">
          <p className="mb-2">Initializing contact form...</p>
          <a
            href="#contact"
            className="inline-block bg-green-500 text-black px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Open Contact Form
          </a>
        </CommandOutput>
      </div>
    </section>
  );
};

export default Welcome;
