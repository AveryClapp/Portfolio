import React from "react";
import Experience from "./Experience";

const About = () => {
  return (
    <section id="about" className="mx-auto max-w-3xl px-4 py-8">
      {/* About Me Section */}
      <h2 className="mb-4 text-2xl font-bold text-neutral-900">About Me</h2>
      <p className="mb-8 text-neutral-700 leading-relaxed">
        Hi, I’m Avery, a Junior at Johns Hopkins University with a passion for
        creating efficient, scalable solutions. I enjoy working on cutting-edge
        projects, honing my problem-solving skills, and collaborating with
        like-minded professionals.
      </p>

      {/* Experience Section */}
      <div id="experience" className="mb-10">
        <Experience />
      </div>
    </section>
  );
};

export default About;
