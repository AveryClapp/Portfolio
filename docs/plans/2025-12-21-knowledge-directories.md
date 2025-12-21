# Knowledge Directories Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add directory-based organization to the knowledge system with Tier 1 MOC filtering and scoped search.

**Architecture:** Physical directories in `/src/Notes/` map to categories. Each directory has `_directory.md` metadata. Main page lists directories, directory pages show Tier 1 MOCs only. Semantic search works globally and directory-scoped.

**Tech Stack:** Next.js 15 App Router, React, gray-matter, @xenova/transformers

---

## Phase 1: Core Loading Logic

### Task 1: Add recursive directory scanning helper

**Files:**
- Modify: `portfolio-next/src/utils/NotesLoader.js`

**Step 1: Add getAllMarkdownFiles helper function**

Add this function after the `ensureNotesDirectoryExists()` function (after line 26):

```javascript
// Helper to recursively get all markdown files from a directory
function getAllMarkdownFiles(dir, baseDir = dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip directories starting with _ or .
      if (file.startsWith('_') || file.startsWith('.')) {
        return;
      }
      getAllMarkdownFiles(filePath, baseDir, fileList);
    } else if (file.endsWith('.md') && !file.startsWith('.') && !file.startsWith('_')) {
      // Store relative path from base directory
      const relativePath = path.relative(baseDir, filePath);
      fileList.push({
        fullPath: filePath,
        relativePath: relativePath,
        fileName: file
      });
    }
  });

  return fileList;
}
```

**Step 2: Verify syntax**

Run: `npm run build`
Expected: Build should succeed (no syntax errors)

**Step 3: Commit**

```bash
git add portfolio-next/src/utils/NotesLoader.js
git commit -m "Add recursive markdown file scanner helper"
```

---

### Task 2: Add getAllDirectories function

**Files:**
- Modify: `portfolio-next/src/utils/NotesLoader.js`

**Step 1: Add getAllDirectories function**

Add this function before `getAllNotes()` function (around line 28, after the `getAllMarkdownFiles` helper):

```javascript
export async function getAllDirectories() {
  if (!ensureNotesDirectoryExists()) return [];

  try {
    const items = fs.readdirSync(NOTES_DIRECTORY);

    const directories = items
      .filter(item => {
        const fullPath = path.join(NOTES_DIRECTORY, item);
        const stat = fs.statSync(fullPath);
        // Include directories, exclude those starting with _ or .
        return stat.isDirectory() && !item.startsWith('_') && !item.startsWith('.');
      })
      .map(dirName => {
        const dirPath = path.join(NOTES_DIRECTORY, dirName);
        const metadataPath = path.join(dirPath, '_directory.md');

        // Default metadata if _directory.md doesn't exist
        let metadata = {
          title: dirName.split('-').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' '),
          description: '',
          icon: '',
          order: 999
        };

        // Read _directory.md if it exists
        if (fs.existsSync(metadataPath)) {
          try {
            const fileContents = fs.readFileSync(metadataPath, 'utf8');
            const { data } = matter(fileContents);
            metadata = {
              title: data.title || metadata.title,
              description: data.description || '',
              icon: data.icon || '',
              order: data.order !== undefined ? data.order : 999
            };
          } catch (error) {
            console.error(`Error reading directory metadata ${dirName}:`, error);
          }
        }

        return {
          slug: titleToSlug(dirName),
          dirName,
          ...metadata
        };
      })
      .sort((a, b) => a.order - b.order);

    return directories;
  } catch (error) {
    console.error('Error loading directories:', error);
    return [];
  }
}
```

**Step 2: Verify syntax**

Run: `npm run build`
Expected: Build should succeed

**Step 3: Commit**

```bash
git add portfolio-next/src/utils/NotesLoader.js
git commit -m "Add getAllDirectories function for directory metadata"
```

---

### Task 3: Update getAllNotes to use recursive scanning

**Files:**
- Modify: `portfolio-next/src/utils/NotesLoader.js`

**Step 1: Replace getAllNotes implementation**

Replace the entire `getAllNotes()` function (lines 28-94) with:

```javascript
export async function getAllNotes() {
  if (!ensureNotesDirectoryExists()) return [];

  try {
    const allFiles = getAllMarkdownFiles(NOTES_DIRECTORY);

    const allNotesData = allFiles
      .map(({ fullPath, relativePath, fileName }) => {
        try {
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          // Extract directory from relative path
          const pathParts = relativePath.split(path.sep);
          const directory = pathParts.length > 1 ? pathParts[0] : '';

          // Generate slug with directory prefix
          const rawSlug = data.slug || fileName.replace(/\.md$/, '');
          const baseSlug = titleToSlug(rawSlug);
          const slug = directory ? `${titleToSlug(directory)}/${baseSlug}` : baseSlug;

          // Extract title from frontmatter or use first heading or filename
          let title = data.title || rawSlug;
          if (!data.title && content) {
            const headingMatch = content.match(/^#\s+(.+)$/m);
            if (headingMatch) {
              title = headingMatch[1];
            }
          }

          // Ensure date is always a string
          const dateString = data.date
            ? (data.date instanceof Date ? data.date.toISOString().split("T")[0] : String(data.date))
            : new Date().toISOString().split("T")[0];

          return {
            slug,
            directory: titleToSlug(directory),
            filename: fileName,
            relativePath,
            content,
            title,
            preview:
              data.preview || content.slice(0, 150).replace(/[#*\[\]]/g, ""),
            ...data,
            date: dateString,
          };
        } catch (error) {
          console.error(`Error reading note ${relativePath}:`, error);
          return null;
        }
      })
      .filter((note) => note !== null);

    return allNotesData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error("Error loading notes:", error);
    return [];
  }
}
```

**Step 2: Verify syntax**

Run: `npm run build`
Expected: Build should succeed

**Step 3: Commit**

```bash
git add portfolio-next/src/utils/NotesLoader.js
git commit -m "Update getAllNotes to support recursive directory scanning"
```

---

### Task 4: Add getNotesByDirectory function

**Files:**
- Modify: `portfolio-next/src/utils/NotesLoader.js`

**Step 1: Add getNotesByDirectory function**

Add this function after `getAllNotes()` (before `getNoteBySlug()`):

```javascript
export async function getNotesByDirectory(directorySlug) {
  const allNotes = await getAllNotes();

  return allNotes
    .filter(note =>
      note.directory === directorySlug &&
      note.type === 'moc' &&
      note.tier === 1
    )
    .sort((a, b) => {
      if (a.date < b.date) return 1;
      else return -1;
    });
}
```

**Step 2: Verify syntax**

Run: `npm run build`
Expected: Build should succeed

**Step 3: Commit**

```bash
git add portfolio-next/src/utils/NotesLoader.js
git commit -m "Add getNotesByDirectory for filtered directory MOCs"
```

---

### Task 5: Update getNoteBySlug to handle nested paths

**Files:**
- Modify: `portfolio-next/src/utils/NotesLoader.js`

**Step 1: Update getNoteBySlug to match full slug**

The current implementation at lines 96-144 already filters by slug, so it should work with directory-prefixed slugs. No changes needed for basic functionality, but let's verify the filename lookup will work.

Actually, we need to update how we find the file since we're now using `relativePath` instead of just `filename`.

Replace the `getNoteBySlug` function (lines 96-144) with:

```javascript
export async function getNoteBySlug(slug) {
  if (!ensureNotesDirectoryExists()) return null;

  try {
    // Load all notes (they already have standardized slugs and relative paths)
    const allNotes = await getAllNotes();

    // Find the note that matches the slug
    const noteData = allNotes.find((n) => n.slug === slug);
    if (!noteData) return null;

    // Use the relative path to read the file
    const fullPath = path.join(NOTES_DIRECTORY, noteData.relativePath);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Extract title from frontmatter or first heading or filename
    let title = data.title || noteData.title;
    if (!data.title && content) {
      const headingMatch = content.match(/^#\s+(.+)$/m);
      if (headingMatch) title = headingMatch[1];
    }

    // Process wikilinks and image paths
    let processedContent = content;
    try {
      const { processWikilinks } = await import("./WikilinkProcessor.js");
      processedContent = await processWikilinks(content);
    } catch (error) {
      console.error("Error processing wikilinks:", error);
    }

    // Ensure date is always a string
    const dateString = data.date
      ? (data.date instanceof Date ? data.date.toISOString().split("T")[0] : String(data.date))
      : noteData.date;

    return {
      slug: noteData.slug,
      directory: noteData.directory,
      content: processedContent,
      title,
      ...data,
      date: dateString,
    };
  } catch (error) {
    console.error(`Error loading note ${slug}:`, error);
    return null;
  }
}
```

**Step 2: Verify syntax**

Run: `npm run build`
Expected: Build should succeed

**Step 3: Commit**

```bash
git add portfolio-next/src/utils/NotesLoader.js
git commit -m "Update getNoteBySlug to handle directory-prefixed slugs"
```

---

## Phase 2: Routing & Pages

### Task 6: Rename [slug] to [...slug] directory

**Files:**
- Rename directory: `portfolio-next/src/app/knowledge/[slug]/` → `portfolio-next/src/app/knowledge/[...slug]/`

**Step 1: Rename directory**

Run:
```bash
cd /Users/averyclapp/Documents/Coding/GitProjects/PersonalPortfolio/portfolio-next/src/app/knowledge
mv "[slug]" "[...slug]"
```

Expected: Directory renamed

**Step 2: Verify structure**

Run: `ls -la /Users/averyclapp/Documents/Coding/GitProjects/PersonalPortfolio/portfolio-next/src/app/knowledge`
Expected: Should see `[...slug]` directory

**Step 3: Commit**

```bash
git add -A portfolio-next/src/app/knowledge
git commit -m "Rename [slug] to [...slug] for catch-all routing"
```

---

### Task 7: Update [...slug]/page.js for multi-level routing

**Files:**
- Modify: `portfolio-next/src/app/knowledge/[...slug]/page.js`

**Step 1: Update generateStaticParams**

Replace the `generateStaticParams` function (lines 16-21) with:

```javascript
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
```

**Step 2: Add import for getAllDirectories and getNotesByDirectory**

Update the import on line 2:

```javascript
import { getNoteBySlug, getAllNotes, getAllDirectories, getNotesByDirectory } from "@/utils/NotesLoader";
```

**Step 3: Verify syntax**

Run: `npm run build`
Expected: Build should succeed

**Step 4: Commit**

```bash
git add portfolio-next/src/app/knowledge/[...slug]/page.js
git commit -m "Update generateStaticParams for directories and nested notes"
```

---

### Task 8: Update generateMetadata for catch-all routing

**Files:**
- Modify: `portfolio-next/src/app/knowledge/[...slug]/page.js`

**Step 1: Update generateMetadata function**

Replace the `generateMetadata` function (lines 24-39) with:

```javascript
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
```

**Step 2: Verify syntax**

Run: `npm run build`
Expected: Build should succeed

**Step 3: Commit**

```bash
git add portfolio-next/src/app/knowledge/[...slug]/page.js
git commit -m "Update generateMetadata for catch-all slug array"
```

---

### Task 9: Create DirectoryPage component file

**Files:**
- Create: `portfolio-next/src/Components/Knowledge/DirectoryPage.jsx`

**Step 1: Create DirectoryPage component**

```javascript
import Link from "next/link";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import SemanticSearch from "@/Components/Knowledge/SemanticSearch";

function formatDate(dateString) {
  if (!dateString) return '';
  if (dateString.match(/^\d{2}-\d{2}-\d{4}$/)) return dateString;
  if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const [year, month, day] = dateString.split('-');
    return `${month}-${day}-${year}`;
  }
  return dateString;
}

export default function DirectoryPage({ directory, mocs }) {
  return (
    <div className="relative min-h-screen bg-stone-100 text-neutral-900 font-sans">
      <Header className="mb-6" />
      <main className="mb-6 relative z-20 flex-1">
        <div className="px-4 lg:ml-32">
          <div className="w-full lg:w-[55%]">
            {/* Breadcrumb */}
            <div className="mb-4 text-xs text-neutral-500">
              <Link href="/knowledge" className="hover:text-neutral-900 transition-colors">
                Knowledge
              </Link>
              <span className="mx-2">›</span>
              <span className="text-neutral-900">{directory.title}</span>
            </div>

            {/* Directory Header */}
            <div className="mb-8">
              {directory.icon && (
                <div className="text-3xl mb-2">{directory.icon}</div>
              )}
              <h1 className="mb-3 text-2xl font-display font-bold text-neutral-900 tracking-tight">
                {directory.title}
              </h1>
              {directory.description && (
                <p className="text-sm text-neutral-700 leading-relaxed">
                  {directory.description}
                </p>
              )}
            </div>

            {/* Semantic Search - scoped to this directory */}
            <SemanticSearch directory={directory.slug} />

            {/* Tier 1 MOCs */}
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
                    <p className="text-xs text-neutral-500 mb-2">
                      {formatDate(moc.date)}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-neutral-500 text-center py-8">
                No tier 1 collections in this directory yet.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

**Step 2: Verify syntax**

Run: `npm run build`
Expected: Build should succeed

**Step 3: Commit**

```bash
git add portfolio-next/src/Components/Knowledge/DirectoryPage.jsx
git commit -m "Create DirectoryPage component for directory listing"
```

---

### Task 10: Update [...slug]/page.js default export to handle routing logic

**Files:**
- Modify: `portfolio-next/src/app/knowledge/[...slug]/page.js`

**Step 1: Add import for DirectoryPage**

Add to imports (around line 4):

```javascript
import DirectoryPage from "@/Components/Knowledge/DirectoryPage";
```

**Step 2: Replace the default export function**

Replace the `NotePage` function (lines 41-56) with:

```javascript
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
```

**Step 3: Verify syntax**

Run: `npm run build`
Expected: Build should succeed

**Step 4: Commit**

```bash
git add portfolio-next/src/app/knowledge/[...slug]/page.js
git commit -m "Add routing logic for directories vs notes"
```

---

### Task 11: Update main knowledge page to list directories

**Files:**
- Modify: `portfolio-next/src/app/knowledge/page.js`

**Step 1: Add import for getAllDirectories**

Update line 1:

```javascript
import { getAllNotes, getAllDirectories } from "@/utils/NotesLoader";
```

**Step 2: Update the KnowledgePage function**

Replace the function (lines 30-86) with:

```javascript
export default async function KnowledgePage() {
  const directories = await getAllDirectories();

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
            <p className="mb-8 text-sm text-neutral-700 leading-relaxed">
              Technical notes and references. Living documents that evolve as I learn.
            </p>

            {/* Semantic Search */}
            <SemanticSearch />

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
```

**Step 3: Verify syntax**

Run: `npm run build`
Expected: Build should succeed

**Step 4: Commit**

```bash
git add portfolio-next/src/app/knowledge/page.js
git commit -m "Update main knowledge page to list directories"
```

---

## Phase 3: Search Updates

### Task 12: Update SemanticSearch to support directory scoping

**Files:**
- Modify: `portfolio-next/src/Components/Knowledge/SemanticSearch.jsx`

**Step 1: Add directory prop to component**

Replace line 5 with:

```javascript
const SemanticSearch = ({ directory = null }) => {
```

**Step 2: Update performSearch to include directory parameter**

Replace the `performSearch` function (lines 24-43) with:

```javascript
  async function performSearch(searchQuery) {
    setIsSearching(true);
    try {
      const body = { query: searchQuery };
      if (directory) {
        body.directory = directory;
      }

      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }
```

**Step 3: Verify syntax**

Run: `npm run build`
Expected: Build should succeed

**Step 4: Commit**

```bash
git add portfolio-next/src/Components/Knowledge/SemanticSearch.jsx
git commit -m "Add directory scoping support to SemanticSearch"
```

---

### Task 13: Update search API to filter by directory

**Files:**
- Modify: `portfolio-next/src/app/api/search/route.js`

**Step 1: Update POST function to accept directory parameter**

Replace the `POST` function (lines 42-83) with:

```javascript
export async function POST(request) {
  try {
    const { query, directory } = await request.json();

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ results: [] });
    }

    // Load model and embeddings
    const model = await loadModel();
    let notesData = loadEmbeddings();

    // Filter by directory if specified
    if (directory) {
      notesData = notesData.filter(note => note.directory === directory);
    }

    // Generate embedding for query
    const output = await model(query, {
      pooling: 'mean',
      normalize: true
    });
    const queryEmbedding = Array.from(output.data);

    // Calculate similarities
    const scored = notesData.map(note => ({
      slug: note.slug,
      title: note.title,
      preview: note.preview,
      similarity: cosineSimilarity(queryEmbedding, note.embedding)
    }));

    // Sort by similarity and take top 20
    const topResults = scored
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 20)
      .filter(note => note.similarity > 0.2); // Relevance threshold

    return NextResponse.json({ results: topResults });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
```

**Step 2: Verify syntax**

Run: `npm run build`
Expected: Build should succeed

**Step 3: Commit**

```bash
git add portfolio-next/src/app/api/search/route.js
git commit -m "Add directory filtering to search API"
```

---

### Task 14: Update generate-embeddings script to include directory

**Files:**
- Modify: `portfolio-next/scripts/generate-embeddings.js`

**Step 1: Update to use getAllMarkdownFiles helper**

Replace the file reading logic (lines 76-132) with:

```javascript
    // Helper to recursively get all markdown files
    function getAllMarkdownFiles(dir, baseDir = dir, fileList = []) {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          if (file.startsWith('_') || file.startsWith('.')) return;
          getAllMarkdownFiles(filePath, baseDir, fileList);
        } else if (file.endsWith('.md') && !file.startsWith('.') && !file.startsWith('_')) {
          const relativePath = path.relative(baseDir, filePath);
          fileList.push({ fullPath: filePath, relativePath: relativePath, fileName: file });
        }
      });
      return fileList;
    }

    // Read all markdown files recursively
    const allFiles = getAllMarkdownFiles(NOTES_DIR);
    console.log(`📝 Found ${allFiles.length} note files`);

    const embeddings = [];

    for (let i = 0; i < allFiles.length; i++) {
      const { fullPath, relativePath, fileName } = allFiles[i];

      try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        // Extract directory from relative path
        const pathParts = relativePath.split(path.sep);
        const directory = pathParts.length > 1 ? titleToSlug(pathParts[0]) : '';

        // Generate slug (same logic as NotesLoader.js)
        const rawSlug = data.slug || fileName.replace(/\.md$/, '');
        const baseSlug = titleToSlug(rawSlug);
        const slug = directory ? `${directory}/${baseSlug}` : baseSlug;

        // Extract title
        let title = data.title || rawSlug;
        if (!data.title && content) {
          const headingMatch = content.match(/^#\s+(.+)$/m);
          if (headingMatch) title = headingMatch[1];
        }

        // Extract and clean preview for display
        const rawPreview = data.preview || data.description ||
          content.slice(0, 150);
        const preview = cleanMarkdown(rawPreview).slice(0, 150);

        // Embed full content for better semantic search
        const textToEmbed = `${title}\n\n${content}`;

        // Generate embedding (returns tensor)
        const output = await embedder(textToEmbed, { pooling: 'mean', normalize: true });
        const embedding = Array.from(output.data); // Convert to array

        embeddings.push({
          slug,
          directory,
          title,
          preview,
          embedding,
          type: data.type || 'note',
          tier: data.tier || null,
          date: data.date || new Date().toISOString().split('T')[0]
        });

        // Progress indicator
        if ((i + 1) % 5 === 0 || i === allFiles.length - 1) {
          console.log(`  ✓ Processed ${i + 1}/${allFiles.length} notes`);
        }
      } catch (error) {
        console.error(`  ✗ Error processing ${relativePath}:`, error.message);
      }
    }
```

**Step 2: Verify syntax**

Run: `node portfolio-next/scripts/generate-embeddings.js`
Expected: Script should run (may have no files yet, that's ok)

**Step 3: Commit**

```bash
git add portfolio-next/scripts/generate-embeddings.js
git commit -m "Update embeddings script for directory structure"
```

---

## Phase 4: Migration & Testing

### Task 15: Create example directory structure

**Files:**
- Create directory: `portfolio-next/src/Notes/example-category/`
- Create: `portfolio-next/src/Notes/example-category/_directory.md`

**Step 1: Create example directory**

Run:
```bash
mkdir -p /Users/averyclapp/Documents/Coding/GitProjects/PersonalPortfolio/portfolio-next/src/Notes/example-category
```

Expected: Directory created

**Step 2: Create _directory.md**

Create file with:

```markdown
---
title: "Example Category"
description: "This is an example category to test the directory system"
icon: "📚"
order: 1
---
```

**Step 3: Commit**

```bash
git add portfolio-next/src/Notes/example-category/
git commit -m "Add example category directory for testing"
```

---

### Task 16: Create example Tier 1 MOC

**Files:**
- Create: `portfolio-next/src/Notes/example-category/Example MOC.md`

**Step 1: Create MOC file**

```markdown
---
type: moc
tier: 1
title: "Example MOC"
description: "This is an example Tier 1 MOC"
date: 2025-12-21
---

# Example MOC

This is an example MOC to test the directory system.

## Section 1

Content here.
```

**Step 2: Commit**

```bash
git add "portfolio-next/src/Notes/example-category/Example MOC.md"
git commit -m "Add example Tier 1 MOC for testing"
```

---

### Task 17: Regenerate embeddings

**Files:**
- Run script: `portfolio-next/scripts/generate-embeddings.js`

**Step 1: Run embedding generation**

If in development and using local Obsidian vault:
```bash
cd /Users/averyclapp/Documents/Coding/GitProjects/PersonalPortfolio
node portfolio-next/scripts/generate-embeddings.js
```

If in production mode:
```bash
cd /Users/averyclapp/Documents/Coding/GitProjects/PersonalPortfolio
NODE_ENV=production node portfolio-next/scripts/generate-embeddings.js
```

Expected: Should process files and generate embeddings with directory field

**Step 2: Verify embeddings.json has directory field**

Run: `cat portfolio-next/public/data/embeddings.json | head -n 30`
Expected: Should see `"directory": "example-category"` in the output

**Step 3: Commit updated embeddings**

```bash
git add portfolio-next/public/data/embeddings.json
git commit -m "Regenerate embeddings with directory support"
```

---

### Task 18: Test the build

**Files:**
- N/A (verification step)

**Step 1: Build the application**

Run: `cd portfolio-next && npm run build`
Expected: Build should succeed with no errors

**Step 2: Start development server**

Run: `npm run dev`
Expected: Server starts on http://localhost:3000

**Step 3: Test in browser**

1. Visit http://localhost:3000/knowledge
   - Expected: Should see "Example Category" directory listed
2. Click on "Example Category"
   - Expected: Should navigate to /knowledge/example-category
   - Expected: Should see "Example MOC" listed
3. Click on "Example MOC"
   - Expected: Should navigate to /knowledge/example-category/example-moc
   - Expected: Should render the MOC content
4. Test breadcrumb navigation
   - Expected: "Knowledge > Example Category" breadcrumb works
5. Test search on main page
   - Expected: Can search all notes
6. Test search on directory page
   - Expected: Search is scoped to that directory

**Step 4: Document any issues**

If issues found, create notes in this file or create bug tasks

---

### Task 19: Test wikilink backward compatibility

**Files:**
- Create test blog post with wikilink to note

**Step 1: Create test blog post**

Create `portfolio-next/src/Blogs/test-wikilinks.md`:

```markdown
---
title: "Test Wikilinks"
date: "2025-12-21"
preview: "Testing wikilink resolution"
tags: ["test"]
---

# Test Wikilinks

This should link to the example MOC: [[Example MOC]]

The link above should resolve to /knowledge/example-category/example-moc
```

**Step 2: Visit the blog post**

Navigate to: http://localhost:3000/blog/test-wikilinks

Expected: The wikilink should render as a link to `/knowledge/example-category/example-moc`

**Step 3: Click the wikilink**

Expected: Should navigate to the MOC successfully

**Step 4: If working, commit test files**

```bash
git add portfolio-next/src/Blogs/test-wikilinks.md
git commit -m "Add wikilink test blog post"
```

---

### Task 20: Final verification and cleanup

**Files:**
- N/A (verification and documentation)

**Step 1: Run all verification checks**

1. Build succeeds: `npm run build`
2. No TypeScript/ESLint errors: `npm run lint`
3. All routes work:
   - /knowledge (directories list)
   - /knowledge/example-category (Tier 1 MOCs)
   - /knowledge/example-category/example-moc (note content)
4. Search works (global and scoped)
5. Wikilinks from blog posts resolve correctly
6. Breadcrumbs work

**Step 2: Remove test files if desired**

If you want to remove test files:
```bash
rm -rf portfolio-next/src/Notes/example-category
rm portfolio-next/src/Blogs/test-wikilinks.md
node portfolio-next/scripts/generate-embeddings.js
git add -A
git commit -m "Remove test files after verification"
```

Or keep them as examples.

**Step 3: Final commit**

```bash
git add -A
git commit -m "Complete knowledge directory system implementation

- Added directory-based organization
- Tier 1 MOC filtering
- Scoped semantic search
- Backward compatible wikilinks
- All tests passing"
```

---

## Success Criteria Checklist

After completing all tasks, verify:

- ✅ Main knowledge page displays directories with metadata
- ✅ Directory pages show only Tier 1 MOCs (tier: 1 in frontmatter)
- ✅ Semantic search works on both main and directory pages
- ✅ Wikilinks from blog posts resolve correctly to nested paths
- ✅ All existing functionality preserved
- ✅ URLs are clean and slugified consistently
- ✅ System is ready for future hierarchical MOCs (tier: 2, tier: 3)
- ✅ Build succeeds with no errors
- ✅ All routes generate correctly at build time

---

## Notes for Future

**Adding new directories:**
1. Create directory in `/src/Notes/<directory-name>/`
2. Add `_directory.md` with metadata
3. Add MOCs with `tier: 1` in frontmatter
4. Regenerate embeddings: `node scripts/generate-embeddings.js`

**Adding hierarchical MOCs later:**
1. Add `tier: 2` to child MOC frontmatter
2. Link from Tier 1 MOC to Tier 2 MOC using `[[MOC Name]]`
3. Tier 2 won't appear in directory listings, only accessible via navigation

**Migrating existing notes:**
1. Create appropriate directories
2. Move notes into directories
3. Add `tier: 1` to root MOCs
4. Regenerate embeddings
5. Test all wikilinks still work
