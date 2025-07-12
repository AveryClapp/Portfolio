// src/Components/Technical/Experience.jsx
import NoteWrapper from "@/Components/NoteSystem/NoteWrapper";

const Experience = () => {
  const experienceContent = `
    <section id="experience" class="max-w-3xl px-4">
      <h2 class="mb-2 text-2xl font-semibold text-neutral-900">
        Experience
      </h2>

      <div>
        <div class="mb-8 rounded-md bg-stone-100">
          <h3 class="mb-2 text-xl font-semibold text-neutral-900">
            Software Engineer Intern <span class="text-base"> @ Garda Capital Partners</span>
          </h3>
          <ul class="text-sm text-neutral-700">
            <li>Data & Risk</li>
          </ul>
        </div>

        <div class="mb-8 rounded-md bg-stone-100">
          <h3 class="mb-2 text-xl font-semibold text-neutral-900">
            Undergraduate Research Assistant <span class="text-base"> @ Johns Hopkins Whiting School of Engineering</span>
          </h3>
          <ul class="text-sm text-neutral-700">
            <li>At the forefront of my research, I'm developing an innovative GPU-based Masked Matrix Multiplication algorithm in C++, aiming to double the performance of Transformer AI workloads while reducing calculation overhead by 75%. By implementing sophisticated mathematical and linear algebra techniques for large-scale matrix operations, I've achieved a 65% boost in computational efficiency through optimized decomposition methods. This project involves close collaboration with PhD students, post-doctoral researchers, and the Computer Science Department Head.</li>
          </ul>
        </div>

        <div class="mb-8 rounded-md bg-stone-100">
          <h3 class="mb-2 text-xl font-semibold text-neutral-900">
            Software Engineering Intern <span class="text-base"> @ NaviStone Inc.</span>
          </h3>
          <ul class="text-sm text-neutral-700">
            <li>In this role, I led the revitalization of a web application's data visualization capabilities, which significantly enhanced client engagement and data accessibility. By implementing agile methodologies, I helped boost team efficiency and accelerate sprint completion rates. I served as a key liaison between product managers and designers, facilitating effective collaboration in the development of user-facing features. Through the implementation of comprehensive unit testing and robust debugging processes, I elevated code quality and reduced bug occurrences. Additionally, I optimized the development workflow through strategic use of tools like Jira, Git, and Coda, resulting in a notable 40% reduction in project delivery time.</li>
          </ul>
        </div>

        <div class="mb-8 rounded-md bg-stone-100">
          <h3 class="mb-2 text-xl font-semibold text-neutral-900">
            Quantitative Developer <span class="text-base"> @ Institute For Applied Economics</span>
          </h3>
          <ul class="text-sm text-neutral-700">
            <li>During my role, I spearheaded the development and maintenance of a sophisticated web crawler that analyzed 20 Google articles per hour to gauge gold market sentiment. I created and implemented over 15 trading algorithms that leveraged both sentiment analysis data and gold price movements to optimize trading decisions. Through rigorous quantitative research and the implementation of data visualization tools, I successfully refined our trading strategy, resulting in a significant 275% improvement in algorithm returns. To enhance user engagement and accessibility, I developed a Telegram Bot that delivered real-time trade updates, which helped grow our subscriber base to more than 100 paying users.</li>
          </ul>
        </div>
      </div>
    </section>
  `;

  return <NoteWrapper content={experienceContent} />;
};

export default Experience;
