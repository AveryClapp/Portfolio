"use client";

import { useRouter } from "next/navigation";
import { Shuffle } from "lucide-react";

/**
 * RandomNoteButton - Navigate to a random note
 *
 * @param {Array} notes - Array of note objects with slug property
 * @param {string} scope - Display scope ("all notes" or "directory name")
 */
export default function RandomNoteButton({ notes, scope = "all notes" }) {
  const router = useRouter();

  const handleRandomNote = () => {
    if (!notes || notes.length === 0) return;

    const randomIndex = Math.floor(Math.random() * notes.length);
    const randomNote = notes[randomIndex];

    router.push(`/wiki/${randomNote.slug}`);
  };

  if (!notes || notes.length === 0) return null;

  return (
    <button
      onClick={handleRandomNote}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 bg-stone-100 hover:bg-stone-200 border border-neutral-200 transition-colors duration-150"
      aria-label={`Random note from ${scope}`}
    >
      <Shuffle className="w-4 h-4" />
      <span>Random Note</span>
    </button>
  );
}
