import React from "react";
import { Linkedin, Github, Code } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/avery-clapp-062289245/",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/AveryClapp",
    },
    {
      name: "LeetCode",
      icon: Code,
      url: "https://leetcode.com/u/AveryClapp/",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label={link.name}
              >
                <link.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
          <p className="text-center text-sm">
            © {currentYear} Avery's Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
