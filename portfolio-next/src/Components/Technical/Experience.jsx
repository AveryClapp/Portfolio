
const ExperienceItem = ({
  title,
  company,
  period,
  location,
  responsibilities,
}) => (
  <div className="mb-8 rounded-md bg-stone-100">
    {/* Title */}
    <h3 className="mb-2 text-xl font-semibold text-neutral-900">
      {title} <span className="text-base"> @ {company}</span>
    </h3>

    {/* Responsibilities */}
    <ul className="text-sm text-neutral-700">
      {responsibilities.map((resp, idx) => (
        <li key={idx}>{resp}</li>
      ))}
    </ul>
  </div>
);

const Experience = () => {
  const experiences = [
    { 
      title: "Incoming Software Engineer Intern",
      company: "Garda Capital Partners",
      period: "June 2025 - August 2025",
      location: "New York City, New York",
      responsibilities: [
        "TBD",
      ],
    },
    {
      title: "Machine Learning Researcher",
      company: "Johns Hopkins Whiting School of Engineering",
      period: "September 2024 - Present",
      location: "Baltimore, Maryland",
      responsibilities: [
        "At the forefront of my research, I'm developing an innovative GPU-based Masked Matrix Multiplication algorithm in C++, aiming to double the performance of Transformer AI workloads while reducing calculation overhead by 75%. By implementing sophisticated mathematical and linear algebra techniques for large-scale matrix operations, I've achieved a 65% boost in computational efficiency through optimized decomposition methods. This project involves close collaboration with PhD students, post-doctoral researchers, and the Computer Science Department Head.",
      ],
    },
    {
      title: "Software Engineering Intern",
      company: "NaviStone Inc.",
      period: "May 2024 – August 2024",
      location: "Cincinnati, Ohio",
      responsibilities: [
        "In this role, I led the revitalization of a web application's data visualization capabilities, which significantly enhanced client engagement and data accessibility. By implementing agile methodologies, I helped boost team efficiency and accelerate sprint completion rates. I served as a key liaison between product managers and designers, facilitating effective collaboration in the development of user-facing features. Through the implementation of comprehensive unit testing and robust debugging processes, I elevated code quality and reduced bug occurrences. Additionally, I optimized the development workflow through strategic use of tools like Jira, Git, and Coda, resulting in a notable 40% reduction in project delivery time.",
      ],
    },
    {
      title: "Quantitative Developer",
      company: "Institute For Applied Economics",
      period: "May 2023 – January 2024",
      location: "Baltimore, Maryland",
      responsibilities: [
        "During my role, I spearheaded the development and maintenance of a sophisticated web crawler that analyzed 20 Google articles per hour to gauge gold market sentiment. I created and implemented over 15 trading algorithms that leveraged both sentiment analysis data and gold price movements to optimize trading decisions. Through rigorous quantitative research and the implementation of data visualization tools, I successfully refined our trading strategy, resulting in a significant 275% improvement in algorithm returns. To enhance user engagement and accessibility, I developed a Telegram Bot that delivered real-time trade updates, which helped grow our subscriber base to more than 100 paying users.",
      ],
    },
  ];

  return (
    <section id="experience" className="max-w-3xl px-4">
      <h2 className="mb-2 text-2xl font-semibold text-neutral-900">
        Experience
      </h2>

      <div>
        {experiences.map((exp, index) => (
          <ExperienceItem key={index} {...exp} />
        ))}
      </div>
    </section>
  );
};

export default Experience;
