// import { Github, Linkedin, Mail } from "lucide-react";

const Welcome = () => {
  return (
    <section
      id="home"
      className="w-full bg-stone-100 mb-4 text-neutral-800 font-sans"
    >
      <div className="max-w-5xl px-4">
        {/* Portfolio Heading */}
        <div>
          <p className="mb-4 text-xl font-semibold text-neutral-900 md:text-4xl">
            Hi, my name is Avery Clapp
          </p>
        </div>

        {/* Introduction */}
        <div>
          <p className="text-sm text-neutral-700">
            I am a rising Senior at Johns Hopkins University where I study Computer Science and Economics. I enjoy working on
            cutting-edge projects, honing my problem-solving skills, and
            collaborating with like-minded professionals.
          </p>
        </div>

        {/* Social Links */}
        {/* <div>
          <h2 className="text-xl font-semibold text-neutral-900">
            Social Links
          </h2>
          <div className="mt-2">
            <a
              href="https://github.com/AveryClapp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center hover:text-blue-500"
            >
              <Github size={20} className="mr-2" />
            </a>
            <a
              href="https://www.linkedin.com/in/avery-clapp-062289245/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center hover:text-blue-500"
            >
              <Linkedin size={20} className="mr-2" />
            </a>
            <a
              href="mailto:aclapp1@jh.edu"
              className="inline-flex items-center hover:text-blue-500"
            >
              <Mail size={20} className="mr-2" />
            </a>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Welcome;
