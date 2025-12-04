import { redirect } from "next/navigation";
import { getNoteBySlug, getAllNotes } from "@/utils/NotesLoader";
import BlogPost from "@/Components/BlogList/BlogPost";
import NotFound from "@/app/not-found.js";

function titleToSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-") // spaces → hyphens
    .replace(/-+/g, "-"); // collapse multiple hyphens
}

// Generate static paths for all notes at build time
export async function generateStaticParams() {
  const notes = await getAllNotes();
  return notes.map((note) => ({
    slug: note.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = decodeURIComponent(resolvedParams.slug);
  const note = await getNoteBySlug(slug);

  if (!note) {
    return {
      title: "Avery Clapp",
    };
  }

  return {
    title: "Avery Clapp",
    description: note.preview || note.title,
  };
}

export default async function NotePage({ params }) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);
  const slug = titleToSlug(decodedSlug);
  if (slug !== decodedSlug) {
    return redirect(`/notes/${slug}`);
  }
  const note = await getNoteBySlug(slug);

  if (!note) {
    return <NotFound />;
  }

  // Reuse BlogPost component but hide date and subscription for notes
  return <BlogPost post={note} isNote={true} />;
}
