// src/Components/Welcome/Welcome.jsx
import NoteWrapper from "@/Components/NoteSystem/NoteWrapper";

const Welcome = () => {
  const welcomeContent = `
    <section class="mb-12 text-neutral-900 font-sans">
      <div>
        <div>
          <h1 class="mb-4 text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-neutral-900 tracking-tight">
            Hi, my name is Avery Clapp^1[![](/headshot.png)]
          </h1>
        </div>
        <div>
          <p class="text-sm text-neutral-700 leading-relaxed mb-4">
            I am a senior at Johns Hopkins University studying Computer Science and Economics. I enjoy grappling with hard topics across a wide range of disciplines, from computer science and software to philosophy, math, and physics. I explore these ideas on my <a href="/blog" class="underline">blog</a>.
          </p>

          <p class="text-sm text-neutral-700 leading-relaxed">
            In my engineering work, I love delving into the fundamentals of how systems work at the lowest level. I am broadly interested in high-performance computing as I find the rigor and complexity of these systems to be intellectually rewarding.
          </p>
        </div>
      </div>
    </section>
  `;

  return <NoteWrapper content={welcomeContent} />;
};

export default Welcome;
