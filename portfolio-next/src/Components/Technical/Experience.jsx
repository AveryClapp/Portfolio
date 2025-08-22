// src/Components/Technical/Experience.jsx
import NoteWrapper from "@/Components/NoteSystem/NoteWrapper";

const Experience = () => {
  const experienceContent = `
    <section id="experience" class="max-w-3xl px-4 mb-6">
      <h2 class="mb-2 text-2xl font-semibold text-neutral-900">
        Experience
      </h2>

      <div class="space-y-4">
        <div class="mb-4">
          <h3 class="text-xl font-semibold text-neutral-900 mb-2">
            Quantitative Developer <span class="text-base font-normal text-neutral-600">@ Single Phase Capital | Aug 2025 - Present</span>
          </h3>
          <p class="text-sm text-neutral-700">
          </p>
        </div>

        <div class="mb-4">
          <h3 class="text-xl font-semibold text-neutral-900 mb-2">
            ML Research Assistant <span class="text-base font-normal text-neutral-600">@ Johns Hopkins University | September 2024 - Present</span>
          </h3>
          <p class="text-sm text-neutral-700">
            CUDA C++ programming to overhaul GPU workloads by capitalizing on emergent matrix sparsity levels.
          </p>
        </div>

        <div class="mb-4">
          <h3 class="text-xl font-semibold text-neutral-900 mb-2">
            Software Engineer Intern <span class="text-base font-normal text-neutral-600">@ Garda Capital Partners | May 2025 - August 2025</span>
          </h3>
          <p class="text-sm text-neutral-700">
            Risk infrastructure && real-time data pipelines for global fixed-income assets.
          </p>
        </div>

        <div class="mb-4">
          <h3 class="text-xl font-semibold text-neutral-900 mb-2">
            Software Engineering Intern <span class="text-base font-normal text-neutral-600">@ NaviStone Inc | May 2024 - August 2024</span>
          </h3>
          <p class="text-sm text-neutral-700">
            Client-facing analytics dashboard. Middleware optimization for real-time metrics.
          </p>
        </div>

        <div class="mb-4">
          <h3 class="text-xl font-semibold text-neutral-900 mb-2">
            Quantitative Developer <span class="text-base font-normal text-neutral-600">@ Institute For Applied Economics | May 2023 - January 2024</span>
          </h3>
          <p class="text-sm text-neutral-700">
            Automated gold trading algorithms architected on NLP and quantitative analysis. 
          </p>
        </div>
      </div>
    </section>
  `;

  return <NoteWrapper content={experienceContent} />;
};

export default Experience;
