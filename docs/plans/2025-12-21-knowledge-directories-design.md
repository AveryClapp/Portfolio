# Knowledge System: Directory Organization & Hierarchical MOCs

**Date:** 2025-12-21
**Status:** Approved for Implementation

## Overview

Add directory-based organization to the knowledge system. The main knowledge page will list directories, and directory pages will display Tier 1 MOCs (Maps of Content). This design future-proofs for hierarchical MOCs while maintaining backward compatibility with existing wikilinks.

## Design Decisions

### 1. Directory Structure & Metadata

Physical directories in `/src/Notes/` map to knowledge categories.

**File Organization:**
```
/src/Notes/
├── competitive-programming/
│   ├── _directory.md                    # Metadata for this directory
│   ├── Competitive Programming Fundamentals.md  # Tier 1 MOC (tier: 1)
│   ├── Advanced Graph Algorithms.md     # Tier 2 MOC (tier: 2)
│   ├── Segment Tree.md                  # Regular note
│   └── ...
├── theology/
│   ├── _directory.md
│   ├── Introduction to Proverbs.md      # Tier 1 MOC (tier: 1)
│   └── ...
└── _template/
    └── ...
```

**Directory Metadata Format (`_directory.md`):**
```yaml
---
title: "Competitive Programming"
description: "Algorithms and data structures for programming contests"
icon: "🏆"  # emoji or icon identifier
order: 1    # controls sort order on main knowledge page
---
```

**MOC Frontmatter (updated):**
```yaml
---
type: moc
tier: 1              # NEW: marks this as a Tier 1 MOC
title: Competitive Programming Fundamentals
description: Collection of notes and concepts...
date: 2025-12-05
---
```

**Rules:**
- All notes must be in a directory (no root-level notes)
- Files starting with `_` or `.` are excluded from loading
- Directory names are slugified using existing `titleToSlug()` function

### 2. URL Routing & Navigation Flow

**Main Knowledge Page (`/knowledge`):**
- Displays all directories as cards/tiles
- Reads `_directory.md` files for title, description, icon
- Sorts by `order` field (ascending)
- Each directory card links to `/knowledge/[directory-slug]`
- Semantic search bar at top searches across ALL notes

**Directory Page (`/knowledge/competitive-programming`):**
- Shows directory title and description from `_directory.md`
- Lists only Tier 1 MOCs (where `tier: 1` in frontmatter)
- Semantic search bar scoped to this directory only
- Each MOC links to `/knowledge/[directory-slug]/[moc-slug]`

**Individual Note/MOC Page (`/knowledge/competitive-programming/segment-tree`):**
- Renders full note content (same as current behavior)
- Wikilinks work as before
- Breadcrumb navigation: Knowledge > Competitive Programming > Segment Tree

**URL Structure:**
- `/knowledge` - main directory listing
- `/knowledge/competitive-programming` - directory page (Tier 1 MOCs)
- `/knowledge/competitive-programming/segment-tree` - individual note/MOC

**Slugification:**
- Directory names: `Competitive Programming/` → `competitive-programming`
- Uses same `titleToSlug()` function as note slugs

### 3. Loading Logic Changes

**NotesLoader.js Updates:**

1. **Add `getAllDirectories()` function:**
   - Scans `/src/Notes/` for subdirectories
   - Excludes: `_template`, `.github`, and any starting with `.` or `_`
   - Reads `_directory.md` from each directory
   - Parses frontmatter and returns directory metadata + slug
   - Returns array sorted by `order` field

2. **Update `getAllNotes()` to recursively scan:**
   - Adapt `getAllMarkdownFiles()` helper from BlogLoader.js
   - Recursively scan subdirectories for `.md` files
   - Store relative path from `/src/Notes/` in note metadata
   - Extract directory from path (e.g., `competitive-programming/Segment Tree.md` → directory: `competitive-programming`)
   - Full slug includes directory: `competitive-programming/segment-tree`

3. **Add `getNotesByDirectory(directorySlug)` function:**
   - Filters all notes to those in the specified directory
   - Further filters to only `type: 'moc'` and `tier: 1`
   - Returns Tier 1 MOCs for directory page display
   - Sorted by date (newest first)

4. **Update `getNoteBySlug(slug)` to handle nested paths:**
   - Accept slugs like `competitive-programming/segment-tree`
   - Match against full path-based slugs

### 4. Routing Changes

**Current:** `/app/knowledge/[slug]/page.js` (flat routing)

**New:** `/app/knowledge/[...slug]/page.js` (catch-all routing)

**Logic:**
- If `slug.length === 0`: render main directory listing page
- If `slug.length === 1`: check if it's a directory or note
  - If directory exists: render directory page (Tier 1 MOCs)
  - If note exists: render note page
- If `slug.length === 2`: render note page at `directory/note-slug`

### 5. Semantic Search Updates

**Embedding Generation (`/scripts/generate-embeddings.js`):**
- Update to handle nested directory structure
- Store directory path in each embedding entry:
  ```json
  {
    "slug": "competitive-programming/segment-tree",
    "directory": "competitive-programming",
    "title": "Segment Tree",
    "preview": "...",
    "embedding": [...]
  }
  ```

**Search API (`/api/search/route.js`):**
- Accept optional `directory` query parameter
- If provided, filter embeddings to only that directory before computing similarity
- Example: `/api/search?q=graph+algorithms&directory=competitive-programming`

**Search Component Updates:**
- Main knowledge page: search all (no directory filter)
- Directory page: pass directory slug to search API for scoped results
- Same `SemanticSearch.jsx` component, just different API parameters

### 6. Future-Proofing for Hierarchical MOCs

**Design decisions that support future hierarchy:**

1. **Tier field in frontmatter:**
   - `tier: 1` marks root MOCs now
   - Later can add `tier: 2`, `tier: 3` for nested MOC hierarchies
   - Directory pages will always filter to `tier: 1` only

2. **Physical file structure is independent:**
   - A Tier 2 MOC can live anywhere in the directory
   - Could be in subdirectory or alongside Tier 1 MOCs
   - Tier determines visibility, not file location

3. **Wikilink processing already handles MOC→MOC links:**
   - A Tier 1 MOC can link to Tier 2 MOCs using `[[Advanced Graph Algorithms]]`
   - Tier 2 MOCs are discoverable by following links, not by browsing
   - No code changes needed for this later

**Adding hierarchical MOCs later:**
1. Add `tier: 2` to child MOC frontmatter
2. Link from Tier 1 MOC to Tier 2 MOC in content
3. Done - Tier 2 won't appear in directory browsing, only via navigation

**Optional future enhancements (not implementing now):**
- `parentMOC: "competitive-programming-fundamentals"` to explicitly define hierarchy
- Breadcrumb showing MOC→MOC path (not just directory→note)
- "Back to parent MOC" link on Tier 2+ MOCs

### 7. Backward Compatibility & Migration

**Wikilink Resolution:**
- WikilinkProcessor builds title→slug map from all notes
- Currently: `[[Segment Tree]]` → `/knowledge/segment-tree`
- After change: `[[Segment Tree]]` → `/knowledge/competitive-programming/segment-tree`
- **Solution:** WikilinkProcessor maps by title, not slug - will work automatically
- Update map to store full directory-prefixed slugs

**Migration Strategy (Clean Cutover):**

1. **Before implementation:**
   - Manually organize existing notes into directories
   - Create `_directory.md` files for each directory

2. **Implement:**
   - Directory support code changes
   - Update routing to handle nested paths
   - Update NotesLoader for recursive scanning

3. **After deployment:**
   - Regenerate embeddings: `npm run generate-embeddings`
   - Verify wikilinks from blog posts resolve correctly

4. **No transition period:**
   - Clean cutover - no support for both old/new structure
   - Simpler implementation, no technical debt

## Implementation Checklist

### Phase 1: Core Loading Logic
- [ ] Add `getAllMarkdownFiles()` helper to NotesLoader.js (from BlogLoader)
- [ ] Update `getAllNotes()` to recursively scan directories
- [ ] Add `getAllDirectories()` function
- [ ] Add `getNotesByDirectory(directorySlug)` function
- [ ] Update `getNoteBySlug()` to handle nested paths
- [ ] Update slug generation to include directory prefix

### Phase 2: Routing & Pages
- [ ] Change `/app/knowledge/[slug]/` to `/app/knowledge/[...slug]/`
- [ ] Update page.js logic to handle directory vs note rendering
- [ ] Create directory listing component for main `/knowledge` page
- [ ] Create directory page component (shows Tier 1 MOCs)
- [ ] Update individual note page to handle nested slugs

### Phase 3: Search Updates
- [ ] Update `generate-embeddings.js` to store directory in embeddings
- [ ] Update search API to accept `directory` query parameter
- [ ] Update SemanticSearch component to support scoped search
- [ ] Regenerate embeddings with new directory structure

### Phase 4: UI Components
- [ ] Create DirectoryCard component for main page
- [ ] Add breadcrumb navigation component
- [ ] Update existing MOC listing to filter by tier
- [ ] Style directory pages consistently

### Phase 5: Testing & Verification
- [ ] Test wikilinks from blog posts to notes
- [ ] Test semantic search (global and scoped)
- [ ] Test breadcrumb navigation
- [ ] Test Tier 1 filtering works correctly
- [ ] Verify all existing notes are accessible

## Success Criteria

- ✅ Main knowledge page displays directories with metadata
- ✅ Directory pages show only Tier 1 MOCs
- ✅ Semantic search works on both main and directory pages
- ✅ Wikilinks from blog posts resolve correctly
- ✅ All existing functionality preserved
- ✅ URLs are clean and slugified consistently
- ✅ System is ready for future hierarchical MOCs

## Technical Notes

**Files to modify:**
- `/src/utils/NotesLoader.js` - core loading logic
- `/src/app/knowledge/[...slug]/page.js` - routing (rename from [slug])
- `/src/Components/Knowledge/SemanticSearch.jsx` - scoped search
- `/src/app/api/search/route.js` - directory filtering
- `/scripts/generate-embeddings.js` - directory-aware embeddings

**New files to create:**
- Directory listing page component (or update existing `/app/knowledge/page.js`)
- Directory card component
- Breadcrumb component

**Migration artifacts:**
- `_directory.md` files in each knowledge directory
- `tier: 1` added to existing MOC frontmatter
