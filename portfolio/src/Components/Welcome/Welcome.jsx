import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Welcome = () => {
  return (
    <section id="home" className="text-green-500 py-20 mb-0">
      <div className="max-w-4xl mx-auto ">
        <div className="mb-6">
          <p className="text-sm mb-2">$ ./welcome.sh</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 typing-animation">
            Welcome to My Portfolio
          </h1>
        </div>
        <div className="mb-6">
          <p className="text-sm mb-2">$ cat about.txt</p>
          <p className="text-lg md:text-xl mb-4">
            I'm Avery, a rising Junior at Johns Hopkins University studying
            Computer Science and Economics.
          </p>
        </div>
        <div className="mb-8">
          <p className="text-sm mb-2">$ ls social-links</p>
          <div className="flex justify-start space-x-4">
            <a
              href="https://github.com/AveryClapp"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-green-500 text-green-500 p-2 rounded-md hover:bg-green-500 hover:text-black transition duration-300"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/avery-clapp-062289245/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-green-500 text-green-500 p-2 rounded-md hover:bg-green-500 hover:text-black transition duration-300"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:aclapp1@jh.edu"
              className="border border-green-500 text-green-500 p-2 rounded-md hover:bg-green-500 hover:text-black transition duration-300"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
        <div>
          <p className="text-sm mb-2">$ ./contact.sh</p>
          <a
            href="#contact"
            className="inline-block border border-green-500 text-green-500 px-4 py-2 rounded-md hover:bg-green-500 hover:text-black transition duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
