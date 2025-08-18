// src/Components/Welcome/Welcome.jsx
import NoteWrapper from "@/Components/NoteSystem/NoteWrapper";

const Welcome = () => {
  const welcomeContent = `
    <section id="home" class="w-full bg-stone-100 mb-4 text-neutral-800 font-sans">
      <div class="max-w-5xl px-0 lg:px-4">
        <div>
          <p class="mb-4 text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-900">
            Hi, my name is Avery Clapp^1[![](/headshot.png)]
          </p>
        </div>
        <div>
          <p class="text-sm text-neutral-700">
            I am a rising Senior at Johns Hopkins University where I study Computer Science and Economics. I enjoy working on
            cutting-edge projects, honing my problem-solving skills, and
            collaborating with like-minded professionals.
          </p>
        </div>
      </div>
    </section>
  `;

  return <NoteWrapper content={welcomeContent} />;
};

export default Welcome;
