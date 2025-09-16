// src/Components/Technical/Experience.jsx
import NoteWrapper from "@/Components/NoteSystem/NoteWrapper";

const Experience = () => {
  const experienceContent = `
    <section id="experience" class="max-w-3xl px-4 mb-6">
      <h2 class="mb-2 text-2xl font-semibold text-neutral-900">
        Experience
      </h2>

        <div class="mb-8">
          <h3 class="text-xl font-semibold text-neutral-900 mb-2">
            Software Engineer <span class="text-base font-normal text-neutral-600">@ Single Phase Capital | Aug 2025 - Present</span>
          </h3>
          <p class="text-sm text-neutral-700">
            Building...
          </p>
        </div>

        <div class="mb-8">
          <h3 class="text-xl font-semibold text-neutral-900 mb-2">
            ML Research Assistant <span class="text-base font-normal text-neutral-600">@ Johns Hopkins University | September 2024 - Present</span>
          </h3>
          <p class="text-sm text-neutral-700">
              Developing GPU-accelerated algorithms for large language model training, creating novel CUDA implementations for masked matrix operations that achieve significant performance improvements in computational efficiency and memory optimization for billion-parameter models. While working on this, I was awarded the <a href="https://www.cs.jhu.edu/academic-programs/undergraduate-studies/research-opportunities/" class="underline">Pistritto Fellowship</a>, an annual grant given to ambitious student-researchers within the Computer Science department at Johns Hopkins.
          </p>
        </div>

        <div class="mb-8">
          <h3 class="text-xl font-semibold text-neutral-900 mb-2">
            Software Engineer Intern <span class="text-base font-normal text-neutral-600">@ Garda Capital Partners | May 2025 - August 2025</span>
          </h3>
          <p class="text-sm text-neutral-700">
              Led full-stack overhaul of firm's core data platform serving all trading desks, while developing cross-team risk analytics solutions including automated VaR calculations, yield analysis tools for investor relations, daily market reports for the repo desk, and modernizing infrastructure through async migrations and CI/CD implementations.
          </p>
        </div>

        <div class="mb-8">
          <h3 class="text-xl font-semibold text-neutral-900 mb-2">
            Software Engineer Intern <span class="text-base font-normal text-neutral-600">@ NaviStone Inc | May 2024 - August 2024</span>
          </h3>
          <p class="text-sm text-neutral-700">
            Built client-facing analytice dashboard and optimized middleware architecture, focusing on performance enhancements and scalable data processing to support high-volume user interactions and business intelligence workflows.
          </p>
        </div>

        <div class="mb-4">
          <h3 class="text-xl font-semibold text-neutral-900 mb-2">
            Quantitative Developer <span class="text-base font-normal text-neutral-600">@ Institute For Applied Economics | May 2023 - January 2024</span>
          </h3>
          <p class="text-sm text-neutral-700">
            Designed and deployed algorithmic trading platform combining quantitative research with NLP-based sentiment analysis for gold markets, scaling from initial research algorithms to commercial system serving hundreds of subscribers with real-time signal delivery and performance tracking.
          </p>
        </div>
    </section>
  `;

  return <NoteWrapper content={experienceContent} />;
};

export default Experience;
