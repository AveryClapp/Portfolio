import NoteWrapper from "@/Components/NoteSystem/NoteWrapper";

const Projects = () => {
  const projectsContent = `
    <section id="projects" class="mb-10">
      <h2 class="mb-4 text-2xl font-display font-bold text-neutral-900 tracking-tight">Projects</h2>

      <ul class="list-disc list-outside ml-4 space-y-6 text-neutral-400">
        <li>
          <h3 class="text-lg font-display font-semibold text-neutral-900 mb-2">
            Emergent Sparsity Matrix Multiplication (On-going)
          </h3>
          <p class="text-sm text-neutral-700 leading-[1.7] mb-2">
            Research project exploiting emergent sparsity in transformer attention matrices to accelerate LLM inference. Implements dynamic threshold-based masking to identify and skip negligible activations at runtime, with custom CUDA kernels for efficient sparse-dense operations. Current benchmarks show faster end-to-end performance than cuBLAS at sparsity levels ≤50%, with ongoing work exploiting B matrix sparsity for runtime improvements.
          </p>
          <a
            href="https://github.com/AveryClapp/ESMM-Research"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block text-sm font-medium text-neutral-900 underline-grow"
          >
            View Project →
          </a>
        </li>

        <li>
          <h3 class="text-lg font-display font-semibold text-neutral-900 mb-2">
            C++ Orderbook
          </h3>
          <p class="text-sm text-neutral-700 leading-[1.7] mb-2">
            High-frequency trading order matching engine achieving ~2M orders/second throughput. Single-threaded design with pre-allocated fixed-size memory pool eliminating all allocations in the hot path. Aggressive function inlining to maximize instruction cache hits, cache-line aligned data structures, and branch prediction hints ([[likely]] vs [[unlikely]]) on critical paths.
          </p>
          <a
            href="https://github.com/AveryClapp/Orderbook"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block text-sm font-medium text-neutral-900 underline-grow"
          >
            View Project →
          </a>
        </li>

        <li>
          <h3 class="text-lg font-display font-semibold text-neutral-900 mb-2">
            Claude Code Fallback^2[This is published as an official python package on [PyPI](https://pypi.org/project/claude-code-fallback/)]
          </h3>
          <p class="text-sm text-neutral-700 leading-[1.7] mb-2">
            Log-based monitor that detects Claude Code usage limits by parsing JSONL session logs and sends native OS notifications. Uses lightweight file watching instead of process wrapping, background threads for non-blocking log parsing, and shell function injection to enable seamless mode switching. Works in any terminal environment including tmux and SSH while keeping full user control over API fallback decisions.
          </p>
          <a
            href="https://github.com/AveryClapp/claude-code-fallback"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block text-sm font-medium text-neutral-900 underline-grow"
          >
            View Project →
          </a>
        </li>

        <li>
          <h3 class="text-lg font-display font-semibold text-neutral-900 mb-2">
            ArXiv Search Tool
          </h3>
          <p class="text-sm text-neutral-700 leading-[1.7] mb-2">
            Research paper search using token-level Jaccard similarity to find conceptually related papers beyond keyword matching. Tokenizes abstracts, computes set intersection/union ratios, and ranks results by similarity score. Supports filtering by ArXiv category, date ranges, and author, with query parsing to handle complex boolean logic.
          </p>
          <a
            href="https://github.com/AveryClapp/ArxivSearch"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block text-sm font-medium text-neutral-900 underline-grow"
          >
            View Project →
          </a>
        </li>

        <li>
          <h3 class="text-lg font-display font-semibold text-neutral-900 mb-2">
            Network Analyzer
          </h3>
          <p class="text-sm text-neutral-700 leading-[1.7] mb-2">
            Real-time packet analyzer built on raw sockets and libpcap. Implements protocol parsers for TCP, UDP, DNS, and HTTP/HTTPS (TLS handshake inspection only), with multi-threaded capture to handle high-throughput interfaces without packet drops. Provides bandwidth usage breakdowns, connection tracking, and protocol distribution analytics for debugging network behavior.
          </p>
          <a
            href="https://github.com/AveryClapp/NetworkAnalyzer"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block text-sm font-medium text-neutral-900 underline-grow"
          >
            View Project →
          </a>
        </li>

        <li>
          <h3 class="text-lg font-display font-semibold text-neutral-900 mb-2">
            Crypto QuantLab
          </h3>
          <p class="text-sm text-neutral-700 leading-[1.7] mb-2">
            Quantitative trading research platform using statistical arbitrage and cointegration analysis for crypto pairs trading. Implements Johansen cointegration tests to identify mean-reverting pairs, Bayesian modeling for regime detection, and momentum tests for trend identification. Includes backtesting engine to evaluate strategy performance across historical data.
          </p>
          <a
            href="https://github.com/AveryClapp/AICryptoPlatform"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block text-sm font-medium text-neutral-900 underline-grow"
          >
            View Project →
          </a>
        </li>

        <li>
          <h3 class="text-lg font-display font-semibold text-neutral-900 mb-2">
            Daily News Report
          </h3>
          <p class="text-sm text-neutral-700 leading-[1.7] mb-2">
            Automated news digest that reads user-selected categories, calls an API for summaries, and uses an email service to send out daily reports. Runs on a cron schedule.^3[This was my first coding project outside of the classroom]
          </p>
          <a
            href="https://github.com/AveryClapp/DailyNewsReport"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block text-sm font-medium text-neutral-900 underline-grow"
          >
            View Project →
          </a>
        </li>
      </ul>
    </section>
  `;

  return <NoteWrapper content={projectsContent} />;
};

export default Projects;
