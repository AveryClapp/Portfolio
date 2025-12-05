import { getAllNotes } from "@/utils/NotesLoader";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import Link from "next/link";

export const metadata = {
  title: "Knowledge Base - Avery Clapp",
  description: "Technical notes, references, and collections on algorithms, systems, and more.",
};

export default async function KnowledgePage() {
  const allNotes = await getAllNotes();

  // Filter MOCs (notes with type: moc in frontmatter)
  const mocs = allNotes.filter(note => note.type === 'moc');

  return (
    <div className="relative min-h-screen bg-stone-100 text-neutral-900 font-sans">
      <Header className="mb-6" />
      <main className="mb-6 relative z-20 flex-1">
        <div className="px-4 lg:ml-32">
          <div className="w-full lg:w-[55%]">
            {/* Title */}
            <h1 className="mb-3 text-2xl font-display font-bold text-neutral-900 tracking-tight">
              Knowledge Base
            </h1>
            <p className="mb-12 text-sm text-neutral-700 leading-relaxed">
              Technical notes and references. Living documents that evolve as I learn.
            </p>

            {/* MOCs */}
            {mocs.length > 0 ? (
              <div className="space-y-8">
                {mocs.map((moc, index) => (
                  <article
                    key={moc.slug}
                    className={index < mocs.length - 1 ? 'border-b border-neutral-200 pb-6' : 'pb-6'}
                  >
                    <h2 className="text-lg font-display font-semibold mb-2">
                      <Link
                        href={`/knowledge/${moc.slug}`}
                        className="hover:text-neutral-600 transition-colors"
                      >
                        {moc.title}
                      </Link>
                    </h2>
                    {moc.description && (
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        {moc.description}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-neutral-500 text-center py-8">
                No collections yet.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
