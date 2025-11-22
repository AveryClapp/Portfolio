import { getAllNotes } from '@/utils/NotesLoader';
import Header from '@/Components/Header/Header';
import Footer from '@/Components/Footer/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Notes | Avery Clapp',
  description: 'Personal notes and thoughts from Obsidian',
};

export default async function NotesPage() {
  const notes = await getAllNotes();

  return (
    <div className="min-h-screen bg-stone-100 text-neutral-900 font-sans">
      <Header className="mb-6" />

      <main className="px-4 lg:ml-32 w-full lg:w-[55%] pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Notes</h1>
          <p className="text-neutral-600">
            Personal notes from my Obsidian vault
          </p>
        </div>

        {notes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-600">No notes found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {notes.map(note => (
              <Link
                key={note.slug}
                href={`/notes/${note.slug}`}
                className="block border border-neutral-300 rounded-lg p-6 hover:border-neutral-400 hover:shadow-md transition-all duration-200 bg-white"
              >
                <h2 className="text-2xl font-bold mb-2 text-neutral-900 hover:text-neutral-700">
                  {note.title}
                </h2>
                {note.date && (
                  <p className="text-sm text-neutral-500 mb-3">
                    {note.date}
                  </p>
                )}
                {note.preview && (
                  <p className="text-neutral-600 line-clamp-2">
                    {note.preview}
                  </p>
                )}
                {note.tags && note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {note.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs bg-neutral-200 text-neutral-700 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
