import { getAllNotes } from '@/utils/NotesLoader';
import Header from '@/Components/Header/Header';
import Footer from '@/Components/Footer/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Avery Clapp',
  description: 'Personal notes and thoughts',
};

export default async function NotesPage() {
  const notes = await getAllNotes();

  return (
    <div className="min-h-screen bg-stone-100 text-neutral-900 font-sans">
      <Header className="mb-6" />

      <main className="px-4 lg:ml-32 w-full lg:w-[55%] pb-12">
        <h1 className="text-2xl font-bold mb-6">Notes</h1>

        {notes.length === 0 ? (
          <p className="text-neutral-600">No notes found.</p>
        ) : (
          <ul className="space-y-2">
            {notes.map(note => (
              <li key={note.slug}>
                <Link
                  href={`/notes/${note.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {note.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />
    </div>
  );
}
