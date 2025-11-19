import NoteWrapper from "@/Components/NoteSystem/NoteWrapper";

const OpenSource = () => {
  const openSourceContent = `
    <section id="opensource" class="mb-10">
      <h2 class="mb-4 text-2xl font-display font-bold text-neutral-900 tracking-tight">Open Source Contributions^4[I'm always looking to work on cool projects so if you have any recommendations or advice, let me know!]</h2>

      <ul class="list-disc list-outside ml-4 space-y-6 text-neutral-400">
        <li>
          <h3 class="text-lg font-display font-semibold text-neutral-900 mb-2">
            ozy
          </h3>
<p class="text-sm text-neutral-700 leading-[1.7] mb-2">
    A Rust-based CLI tool developed by <a href="https://www.aquatic.com/" class="underline"
  target="_blank" rel="noopener noreferrer">Aquatic</a> that manages application versions
  across development teams by centralizing configuration and automatically installing
  consistent versions of tools like Vault, Nomad, etc. Contributed uninstall functionality,
   implementing the 'rm' command with symlink removal and optional cache cleanup flag.
  </p>
               </p>
          <div class="flex gap-3">
            <a
              href="https://github.com/aquanauts/ozy"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block text-sm font-medium text-neutral-900 underline-grow"
            >
              View Project →
            </a>
            <a
              href="https://github.com/aquanauts/ozy/pull/101"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block text-sm font-medium text-neutral-900 underline-grow"
            >
              View PRs →
            </a>
          </div>
        </li>
      </ul>
    </section>
  `;

  return <NoteWrapper content={openSourceContent} />;
};

export default OpenSource;
