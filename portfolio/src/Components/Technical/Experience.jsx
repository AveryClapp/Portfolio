import React from "react";
import { Calendar, MapPin, FileText, ChevronRight } from "lucide-react";

const ExperienceItem = ({
  title,
  company,
  period,
  location,
  responsibilities,
}) => (
  <div className=" border border-green-500 rounded-md mb-4 overflow-hidden">
    <div className="bg-green-800 px-4 py-2 flex items-center">
      <FileText className="mr-2 text-green-300" size={16} />
      <span className="text-green-300 font-semibold">{title}.md</span>
    </div>
    <div className="p-4">
      <h3 className="text-xl font-bold text-green-500 mb-2">{title}</h3>
      <p className="text-green-400 font-semibold mb-1">{company}</p>
      <div className="flex items-center text-green-300 mb-4 text-sm">
        <Calendar className="mr-2" size={14} />
        <span className="mr-4">{period}</span>
        <MapPin className="mr-2" size={14} />
        <span>{location}</span>
      </div>
      <ul className="space-y-2 text-green-300">
        {responsibilities.map((resp, idx) => (
          <li key={idx} className="flex items-start">
            <ChevronRight className="mr-2 mt-1 flex-shrink-0" size={14} />
            <span className="text-sm">{resp}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const Experience = () => {
  const experiences = [
    {
      title: "Software Engineering Intern",
      company: "NaviStone Inc.",
      period: "May 2024 – Present",
      location: "Cincinnati, Ohio",
      responsibilities: [
        "Enhanced client data visualization by revamping a web application, improving user engagement and data access.",
        "Boosted team efficiency by incorporating agile methodologies, resulting in faster task and sprint completions.",
        "Facilitated collaboration between product managers and designers, aiding in development of user-facing features.",
        "Strengthened code quality and reduced bugs by conducting thorough unit testing and robust debugging processes.",
        "Streamlined development process, cutting project delivery time by 40% by effective use of Jira, Git, and Coda.",
      ],
    },
    {
      title: "Quantitative Researcher",
      company:
        "Institute For Applied Economics, Global Health, and the Study of Business Enterprise",
      period: "May 2023 – January 2024",
      location: "Baltimore, Maryland",
      responsibilities: [
        "Managed and upgraded a web crawler analyzing 20 Google articles hourly to calculate gold market sentiment.",
        "Enhanced trading strategy performance by creating 15+ algorithms using sentiment score and gold price change data.",
        "Boosted algorithm returns by 275% through quantitative research and data visualization tools to refine trading strategy.",
        "Expanded subscriber base to 100+ paying users by developing a Telegram Bot delivering real-time trade updates.",
      ],
    },
  ];

  return (
    <section id="experience" className="font-mono pt-4">
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <ExperienceItem key={index} {...exp} />
        ))}
      </div>
    </section>
  );
};

export default Experience;
