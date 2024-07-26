import React from "react";
import { FaPython, FaJs, FaHtml5, FaRust } from "react-icons/fa";
import {
  SiTypescript,
  SiCplusplus,
  SiMysql,
  SiTailwindcss,
} from "react-icons/si";

const TechStackItem = ({ icon: Icon, name }) => (
  <div className="flex items-center p-3 bg-black border border-green-500 rounded-md">
    <Icon className="text-green-500 text-2xl mr-3" />
    <span className="text-green-500 font-mono">{name}</span>
  </div>
);

const TechStack = () => {
  const techStack = [
    { name: "Python", icon: FaPython },
    { name: "JavaScript", icon: FaJs },
    { name: "TypeScript", icon: SiTypescript },
    { name: "C++", icon: SiCplusplus },
    { name: "SQL", icon: SiMysql },
    { name: "HTML", icon: FaHtml5 },
    { name: "Tailwind CSS", icon: SiTailwindcss },
    { name: "Rust", icon: FaRust },
  ];

  return (
    <section id="tech-stack" className="">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-green-500 font-mono">
          Tech Stack
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {techStack.map((tech, index) => (
          <TechStackItem key={index} {...tech} />
        ))}
      </div>
      <div className="mt-8 text-green-500 font-mono">
        <p>$ echo $SKILLS_SUMMARY</p>
        <p className="mt-2">
          Proficient in multiple programming languages and frameworks, with a
          focus on full stack development and a strong passion for financial
          technology.
        </p>
      </div>
    </section>
  );
};

export default TechStack;
