import { redirect } from "next/navigation";
import { getNoteBySlug, getAllNotes, getAllDirectories, getNotesByDirectory } from "@/utils/NotesLoader";
import BlogPost from "@/Components/BlogList/BlogPost";
import DirectoryPage from "@/Components/Knowledge/DirectoryPage";
import NotFound from "@/app/not-found.js";

function titleToSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-") // spaces → hyphens
    .replace(/-+/g, "-"); // collapse multiple hyphens
}

// Generate static paths for all notes and directories at build time
export async function generateStaticParams() {
  const notes = await getAllNotes();
  const directories = await getAllDirectories();

  // Generate paths for all notes (will be arrays like ['dir', 'note'] or ['note'])
  const notePaths = notes.map((note) => ({
    slug: note.slug.split('/'),
  }));

  // Generate paths for directories (single element arrays like ['dir'])
  const directoryPaths = directories.map((dir) => ({
    slug: [dir.slug],
  }));

  return [...directoryPaths, ...notePaths];
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug || [];
  const slugPath = slugArray.join('/');
  const slug = titleToSlug(slugPath);

  // Try to load as note first
  const note = await getNoteBySlug(slug);

  if (note) {
    return {
      title: "Avery Clapp",
      description: note.preview || note.title,
    };
  }

  // Try to load as directory
  const directories = await getAllDirectories();
  const directory = directories.find(d => d.slug === slug);

  if (directory) {
    return {
      title: "Avery Clapp",
      description: directory.description || `${directory.title} knowledge collection`,
    };
  }

  return {
    title: "Avery Clapp",
  };
}

export default async function DynamicKnowledgePage({ params }) {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug || [];
  const slugPath = slugArray.map(s => decodeURIComponent(s)).join('/');
  const slug = titleToSlug(slugPath);

  // Redirect if slug doesn't match canonical format
  const canonicalPath = slugArray.map(s => titleToSlug(decodeURIComponent(s))).join('/');
  if (slug !== canonicalPath && slugPath !== canonicalPath) {
    return redirect(`/knowledge/${canonicalPath}`);
  }

  // Try to load as a note first
  const note = await getNoteBySlug(slug);
  if (note) {
    return <BlogPost post={note} isNote={true} />;
  }

  // Try to load as a directory
  const directories = await getAllDirectories();
  const directory = directories.find(d => d.slug === slug);

  if (directory) {
    const mocs = await getNotesByDirectory(slug);
    return <DirectoryPage directory={directory} mocs={mocs} />;
  }

  // Not found
  return <NotFound />;
}
