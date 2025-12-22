import { getAllNotes, getAllDirectories } from "@/utils/NotesLoader";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import SemanticSearch from "@/Components/Knowledge/SemanticSearch";
import DirectoryTracker from "@/Components/NavigationTrail/TrailClearer";
import Link from "next/link";

export const metadata = {
  title: "Avery Clapp",
  description: "Technical notes, references, and collections on algorithms, systems, and more.",
};

// Format date from YYYY-MM-DD to MM-DD-YYYY
function formatDate(dateString) {
  if (!dateString) return '';

  // Check if already in MM-DD-YYYY format
  if (dateString.match(/^\d{2}-\d{2}-\d{4}$/)) {
    return dateString;
  }

  // Convert from YYYY-MM-DD to MM-DD-YYYY
  if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const [year, month, day] = dateString.split('-');
    return `${month}-${day}-${year}`;
  }

  return dateString;
}

export default async function KnowledgePage() {
  const directories = await getAllDirectories();

  return (
    <div className="relative min-h-screen bg-stone-100 text-neutral-900 font-sans">
      <DirectoryTracker />
      <Header className="mb-6" />
      <main className="mb-6 relative z-20 flex-1">
        <div className="px-4 lg:ml-32">
          <div className="w-full lg:w-[55%]">
            {/* Title */}
            <h1 className="mb-3 text-2xl font-display font-bold text-neutral-900 tracking-tight">
              Knowledge Base
            </h1>
            <p className="mb-8 text-sm text-neutral-700 leading-relaxed">
              Technical notes and references. Living documents that evolve as I learn.
            </p>

            {/* Semantic Search */}
            {/* <SemanticSearch /> */}

            {/* Directories */}
            {directories.length > 0 ? (
              <div className="space-y-8">
                {directories.map((directory, index) => (
                  <article
                    key={directory.slug}
                    className={index < directories.length - 1 ? 'border-b border-neutral-200 pb-6' : 'pb-6'}
                  >
                    <h2 className="text-lg font-display font-semibold mb-2">
                      <Link
                        href={`/knowledge/${directory.slug}`}
                        className="hover:text-neutral-600 transition-colors"
                      >
                        {directory.icon && <span className="mr-2">{directory.icon}</span>}
                        {directory.title}
                      </Link>
                    </h2>
                    {directory.description && (
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        {directory.description}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-neutral-500 text-center py-8">
                No directories yet.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
