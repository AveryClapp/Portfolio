// src/Components/Technical/Experience.jsx
import NoteWrapper from "@/Components/NoteSystem/NoteWrapper";

const Experience = () => {
  const experienceContent = `
    <section id="experience" class="mb-10">
      <h2 class="mb-4 text-2xl font-display font-bold text-neutral-900 tracking-tight">
        Experience
      </h2>

        <div class="mb-6">
          <h3 class="text-lg font-display font-semibold text-neutral-900 mb-1">
            Quantitative Developer
          </h3>
          <p class="text-sm text-neutral-600 mb-2">Single Phase Capital · Aug 2025 - Present</p>
          <p class="text-sm text-neutral-700 leading-[1.7]">
            Building...
          </p>
        </div>

        <div class="mb-6">
          <h3 class="text-lg font-display font-semibold text-neutral-900 mb-1">
            ML Research Assistant
          </h3>
          <p class="text-sm text-neutral-600 mb-2">Johns Hopkins University · September 2024 - Present</p>
          <p class="text-sm text-neutral-700 leading-[1.7]">
              Developing GPU-accelerated algorithms for large language model training, creating novel CUDA implementations for masked matrix operations that achieve significant performance improvements in computational efficiency and memory optimization for billion-parameter models. While working on this, I was awarded the <a href="https://www.cs.jhu.edu/academic-programs/undergraduate-studies/research-opportunities/" class="underline">Pistritto Fellowship</a>, an annual grant given to ambitious student-researchers within the Computer Science department at Johns Hopkins.
          </p>
        </div>

        <div class="mb-6">
          <h3 class="text-lg font-display font-semibold text-neutral-900 mb-1">
            Software Engineer Intern
          </h3>
          <p class="text-sm text-neutral-600 mb-2">Garda Capital Partners · May 2025 - August 2025</p>
          <p class="text-sm text-neutral-700 leading-[1.7]">
              Led full-stack overhaul of firm's core data platform serving all trading desks, while developing cross-team risk analytics solutions including automated VaR calculations, yield analysis tools for investor relations, daily market reports for the repo desk, and modernizing infrastructure through async migrations and CI/CD implementations.
          </p>
        </div>

        <div class="mb-6">
          <h3 class="text-lg font-display font-semibold text-neutral-900 mb-1">
            Software Engineer Intern
          </h3>
          <p class="text-sm text-neutral-600 mb-2">NaviStone Inc · May 2024 - August 2024</p>
          <p class="text-sm text-neutral-700 leading-[1.7]">
            Built client-facing analytice dashboard and optimized middleware architecture, focusing on performance enhancements and scalable data processing to support high-volume user interactions and business intelligence workflows.
          </p>
        </div>

        <div class="mb-4">
          <h3 class="text-lg font-display font-semibold text-neutral-900 mb-1">
            Quantitative Developer
          </h3>
          <p class="text-sm text-neutral-600 mb-2">Institute For Applied Economics · May 2023 - January 2024</p>
          <p class="text-sm text-neutral-700 leading-[1.7]">
            Designed and deployed algorithmic trading platform combining quantitative research with NLP-based sentiment analysis for gold markets, scaling from initial research algorithms to commercial system serving hundreds of subscribers with real-time signal delivery and performance tracking.
          </p>
        </div>
    </section>
  `;

  return <NoteWrapper content={experienceContent} />;
};

export default Experience;
