const Projects = () => {
  const projects = [
    {
      title: "Network Analyzer",
      description:
        "A sophisticated network analysis tool that captures, sniffs, and parses network traffic flowing through your device in real-time.",
      link: "https://github.com/AveryClapp/NetworkAnalyzer",
    },
    {
      title: "Daily News Report",
      description:
        "A daily news aggregation system that curates top trending headlines from multiple sources. Designed to cut personal browsing time and keep you updated effortlessly.",
      link: "https://github.com/AveryClapp/DailyNewsReport",
    },
    {
      title: "Instagram Botting Suite",
      description:
        "An analytics tool that tracks over 1,000 Instagram accounts, offering insights into engagement, 'ghost' followers, and growth metrics.",
      link: "https://github.com/AveryClapp/InstagramAnalyzer",
    },
    {
      title: "Crypto Trading Platform",
      description:
        "A robust trading platform that crunches real-time data and machine learning models to forecast crypto market trends.",
      link: "https://github.com/AveryClapp/AICryptoPlatform",
    },
  ];

  return (
    <section id="projects" className="max-w-3xl px-4 py-2">
      <h2 className="mb-2 text-2xl font-semibold text-neutral-900">Projects</h2>

      {projects.map((project, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-lg font-semibold text-neutral-900">
            {project.title}
          </h3>

          <p className="text-sm text-neutral-700 leading-relaxed">
            {project.description}
          </p>

          {/* Link to Project */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-medium text-black hover:text-blue-500"
          >
            View Project →
          </a>
        </div>
      ))}
    </section>
  );
};

export default Projects;
