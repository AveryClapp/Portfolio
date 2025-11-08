import NoteWrapper from "@/Components/NoteSystem/NoteWrapper";

const Projects = () => {
  const projectsContent = `
    <section id="projects" class="mb-12">
      <h2 class="mb-6 text-3xl font-display font-bold text-neutral-900 tracking-tight">Projects</h2>


      <div class="mb-8">
        <h3 class="text-lg font-display font-semibold text-neutral-900 mb-2">
          Emergent Sparsity Matrix Multiplication (On-going)
        </h3>
        <p class="text-sm text-neutral-700 leading-relaxed mb-2">
          Research project investigating how to exploit emergent sparsity patterns in large language models to accelerate inference. Exploring various techniques like dynamic masking, permutation invariants, and custom CUDA kernels to skip unnecessary computations during matrix multiplication, with the goal of achieving faster token generation without sacrificing model accuracy or quality.
        </p>
        <a
          href="https://github.com/AveryClapp/ESMM-Research"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block text-sm font-medium text-neutral-900 underline-grow"
        >
          View Project →
        </a>
      </div>

      <div class="mb-8">
        <h3 class="text-lg font-display font-semibold text-neutral-900 mb-2">
          C++ Orderbook
        </h3>
        <p class="text-sm text-neutral-700 leading-relaxed mb-2">
          A performance-critical C++ trading system designed for ultra-low latency order matching and execution. Built from scratch with extensive optimizations including memory pooling to eliminate syscalls, cache-friendly data structures, strategic struct alignment, branch prediction hints, and careful inlining. Achieved nearly 2M orders per second throughput by squeezing out every microsecond of performance through low-level systems programming techniques.
        </p>
        <a
          href="https://github.com/AveryClapp/Orderbook"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block text-sm font-medium text-neutral-900 underline-grow"
        >
          View Project →
        </a>
      </div>
      <div class="mb-8">
        <h3 class="text-lg font-display font-semibold text-neutral-900 mb-2">
          Claude Code Fallback^2[This is published as an official python package on [PyPI](https://pypi.org/project/claude-code-fallback/)]
        </h3>
        <p class="text-sm text-neutral-700 leading-relaxed mb-2">
          An intelligent CLI wrapper for Claude Code that automatically switches from subscription to API billing when usage limits
          are hit. Built with Python using pseudo-terminals for seamless process interception, background thread monitoring for
          real-time output parsing, and I/O handling. Maintains full terminal interactivity while transparently
          detecting rate limit errors and orchestrating graceful process restarts with
          environment variable injection.
       </p>
        <a
          href="https://github.com/AveryClapp/Orderbook"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block text-sm font-medium text-neutral-900 underline-grow"
        >
          View Project →
        </a>
      </div>
      <div class="mb-8">
        <h3 class="text-lg font-display font-semibold text-neutral-900 mb-2">
          ArXiv Search Tool
        </h3>
        <p class="text-sm text-neutral-700 leading-relaxed mb-2">
          A comprehensive overhaul of the ArXiv search system that streamlines academic research discovery. Built with improved query parsing, advanced filtering by categories and date ranges, and semantic search capabilities to find relevant papers more efficiently. Designed to cut down the time spent sifting through thousands of research papers by providing more intuitive and powerful search functionality for researchers and students.
        </p>
        <a
          href="https://github.com/AveryClapp/ArxivSearch"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block text-sm font-medium text-neutral-900 underline-grow"
        >
          View Project →
        </a>
      </div>

      <div class="mb-8">
        <h3 class="text-lg font-display font-semibold text-neutral-900 mb-2">
          Network Analyzer
        </h3>
        <p class="text-sm text-neutral-700 leading-relaxed mb-2">
          A sophisticated network analysis tool that captures and parses network traffic in real-time. Built with packet sniffing capabilities to monitor HTTP/HTTPS requests, DNS queries, and TCP/UDP connections flowing through your device. Provides detailed analytics on bandwidth usage, protocol distributions, and connection patterns, making it useful for debugging network issues, understanding application behavior, and learning about network protocols at a low level.
        </p>
        <a
          href="https://github.com/AveryClapp/NetworkAnalyzer"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block text-sm font-medium text-neutral-900 underline-grow"
        >
          View Project →
        </a>
      </div>

      <div class="mb-8">
        <h3 class="text-lg font-display font-semibold text-neutral-900 mb-2">
          Daily News Report
        </h3>
        <p class="text-sm text-neutral-700 leading-relaxed mb-2">
          A daily news aggregation system that automatically curates and summarizes top trending headlines from multiple sources including major news outlets and niche publications. Designed to eliminate the endless browsing and doomscrolling by delivering a concise, personalized digest of the most important stories each morning. Built with web scraping, natural language processing for summarization, and scheduled automation to keep you informed without the time sink.^3[This was my first coding project outside of the classroom]
        </p>
        <a
          href="https://github.com/AveryClapp/DailyNewsReport"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block text-sm font-medium text-neutral-900 underline-grow"
        >
          View Project →
        </a>
      </div>


      <div class="mb-8">
        <h3 class="text-lg font-display font-semibold text-neutral-900 mb-2">
          Crypto QuantLab
        </h3>
        <p class="text-sm text-neutral-700 leading-relaxed mb-2">
            A quantitative research platform for cryptocurrency trading that combines technical analysis, machine learning models, and market sentiment analysis to generate data-driven investment strategies. Features backtesting capabilities to evaluate strategy performance across historical data, real-time market monitoring, and algorithmic trading signals. Built to bring institutional-grade quantitative methods to crypto markets for smarter, evidence-based trading decisions.
        </p>
        <a
          href="https://github.com/AveryClapp/AICryptoPlatform"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block text-sm font-medium text-neutral-900 underline-grow"
        >
          View Project →
        </a>
      </div>
    </section>
  `;

  return <NoteWrapper content={projectsContent} />;
};

export default Projects;
