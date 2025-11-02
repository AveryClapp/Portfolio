// src/Components/Welcome/Welcome.jsx
import NoteWrapper from "@/Components/NoteSystem/NoteWrapper";

const Welcome = () => {
  const welcomeContent = `
    <section class="mb-4 text-neutral-900 font-sans">
      <div>
        <div>
          <p class="mb-4 text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-900">
            Hi, my name is Avery Clapp^1[![](/headshot.png)]
          </p>
        </div>
        <div>
          <p class="text-sm text-neutral-700">
            I am a senior at Johns Hopkins University where I study Computer Science and Economics. I enjoy working on
            cutting-edge projects, honing my problem-solving skills, and researching cool topics.
          </p>
        </div>
      </div>
    </section>
  `;

  return <NoteWrapper content={welcomeContent} />;
};

export default Welcome;
