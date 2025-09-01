import NoteWrapper from "@/Components/NoteSystem/NoteWrapper";

const Projects = () => {
  const projectsContent = `
    <section id="projects" class="max-w-3xl px-4 py-2">
      <h2 class="mb-2 text-2xl font-semibold text-neutral-900">Projects</h2>

      <div class="mb-8">
        <h3 class="text-lg font-semibold text-neutral-900">
          C++ Orderbook
        </h3>
        <p class="text-sm text-neutral-700 leading-relaxed">
          A performance-critical C++ trading system designed for ultra-low latency order matching and execution.
        </p>
        <a
          href="https://github.com/AveryClapp/Orderbook"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block text-sm font-medium text-black hover:text-blue-500"
        >
          View Project →
        </a>
      </div>
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-neutral-900">
          ArXiv Search Tool
        </h3>
        <p class="text-sm text-neutral-700 leading-relaxed">
          A robust overhaul of the ArXiv search system that enables more efficient and optimized querying of various research papers.
        </p>
        <a
          href="https://github.com/AveryClapp/ArxivSearch"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block text-sm font-medium text-black hover:text-blue-500"
        >
          View Project →
        </a>
      </div>

      <div class="mb-8">
        <h3 class="text-lg font-semibold text-neutral-900">
          Network Analyzer
        </h3>
        <p class="text-sm text-neutral-700 leading-relaxed">
          A sophisticated network analysis tool that captures, sniffs, and parses network traffic flowing through your device in real-time.
        </p>
        <a
          href="https://github.com/AveryClapp/NetworkAnalyzer"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block text-sm font-medium text-black hover:text-blue-500"
        >
          View Project →
        </a>
      </div>

      <div class="mb-8">
        <h3 class="text-lg font-semibold text-neutral-900">
          Daily News Report
        </h3>
        <p class="text-sm text-neutral-700 leading-relaxed">
          A daily news aggregation system that curates top trending headlines from multiple sources. Designed to cut personal browsing time and keep you updated effortlessly.^2[This was my first coding project outside of the classroom]
        </p>
        <a
          href="https://github.com/AveryClapp/DailyNewsReport"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block text-sm font-medium text-black hover:text-blue-500"
        >
          View Project →
        </a>
      </div>


      <div class="mb-8">
        <h3 class="text-lg font-semibold text-neutral-900">
          Crypto Trading Platform
        </h3>
        <p class="text-sm text-neutral-700 leading-relaxed">
          A robust trading platform that crunches real-time data and machine learning models to forecast crypto market trends.
        </p>
        <a
          href="https://github.com/AveryClapp/AICryptoPlatform"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block text-sm font-medium text-black hover:text-blue-500"
        >
          View Project →
        </a>
      </div>
    </section>
  `;

  return <NoteWrapper content={projectsContent} />;
};

export default Projects;
