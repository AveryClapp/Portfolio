import { getNoteBySlug, getAllNotes } from '@/utils/NotesLoader';
import BlogPost from '@/Components/BlogList/BlogPost';

// Generate static paths for all notes at build time
export async function generateStaticParams() {
  const notes = await getAllNotes();
  return notes.map(note => ({
    slug: note.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const note = await getNoteBySlug(params.slug);

  if (!note) {
    return {
      title: 'Avery Clapp',
    };
  }

  return {
    title: 'Avery Clapp',
    description: note.preview || note.title,
  };
}

export default async function NotePage({ params }) {
  const note = await getNoteBySlug(params.slug);

  if (!note) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Note Not Found</h1>
          <p className="text-neutral-600">
            The note "{params.slug}" could not be found.
          </p>
          <a href="/notes" className="text-blue-600 hover:underline mt-4 inline-block">
            ← Back to Notes
          </a>
        </div>
      </div>
    );
  }

  // Reuse BlogPost component to render the note
  // It already handles sidenotes and markdown rendering
  return <BlogPost post={note} />;
}
