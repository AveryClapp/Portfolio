import { Linkedin, Mail, Github, Newspaper, FileText } from "lucide-react"
import Link from "next/link"

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
      name: "Email",
      icon: Mail,
      url: "mailto:aclapp1@jh.edu",
    },
    {
      name: "Resume",
      icon: FileText,
      url: "/resume",
    },
  ];

  return (
    <footer className="text-black pt-16 pb-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex space-x-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              if (link.name === "Resume") {
                return (
                  <Link
                    key={link.name}
                    href={link.url}
                    className="text-black hover:text-black-300 transition-colors duration-300"
                    aria-label={link.name}
                  >
                    <Icon className="h-6 w-6" />
                  </Link>
                );
              }
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-black-300 transition-colors duration-300"
                  aria-label={link.name}
                >
                  <Icon className="h-6 w-6" />
                </a>
              );
            })}
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
