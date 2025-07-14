import { Linkedin, Mail, Github, Newspaper } from "lucide-react"

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
      icon: Newspaper,
      url: "Avery-Clapp-Resume.pdf",
    },
  ];

  return (
    <footer className="text-black pb-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-black-300 transition-colors duration-300"
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
