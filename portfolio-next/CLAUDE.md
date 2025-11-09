# CLAUDE.md - Portfolio Development Guide

This document serves as a comprehensive guide for Claude (or any AI assistant) to quickly understand this portfolio's architecture, design philosophy, and development patterns.

---

## Table of Contents
1. [Design Philosophy](#design-philosophy)
2. [Architecture Overview](#architecture-overview)
3. [Styling System](#styling-system)
4. [Component Patterns](#component-patterns)
5. [Blog System](#blog-system)
6. [Email Subscription System](#email-subscription-system)
7. [Development Preferences](#development-preferences)
8. [Common Tasks](#common-tasks)

---

## Design Philosophy

### Core Principles
- **Minimalism Above All**: "Nothing screams this kid is cracked like minimalism"
- **Subtle Over Flashy**: Avoid animations, popups, shadows, and marketing language
- **Content First**: The work and writing should be the star, not the UI
- **Academic Aesthetic**: Inspired by research papers and technical documentation

### Visual Style
- Clean, generous whitespace
- Neutral color palette (stone/neutral grays)
- Simple borders and dividers
- No gradients, shadows, or visual effects
- Typography as the main design element

### User Experience
- Non-intrusive interactions
- Contextual features (only show what's relevant)
- Low friction (minimal clicks, simple forms)
- Fast and performant (no bloat)

---

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS (utility-first)
- **Typography**: Inter font (both display and body)
- **Markdown**: React Markdown with KaTeX for math
- **Email**: Resend API
- **Deployment**: Vercel (assumed)

### Directory Structure
```
portfolio-next/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── subscribe/     # Email subscription endpoint
│   │   │   └── notify-subscribers/ # Email notification endpoint
│   │   ├── blog/              # Blog pages
│   │   │   ├── [slug]/        # Individual blog posts
│   │   │   └── page.js        # Blog list page
│   │   ├── resume/            # Resume page
│   │   ├── globals.css        # Global styles + custom utilities
│   │   ├── layout.js          # Root layout with fonts
│   │   └── page.js            # Home page (redirects to Home component)
│   ├── Components/
│   │   ├── BlogComponents/    # Blog-specific components (Chess, etc.)
│   │   ├── BlogList/          # Blog listing and post rendering
│   │   │   ├── BlogList.jsx   # Blog list with filtering
│   │   │   └── BlogPost.jsx   # Individual post with sidenotes
│   │   ├── Footer/            # Site footer with social links
│   │   ├── Header/            # Navigation (About/Blog)
│   │   ├── Home/              # Home page content
│   │   ├── NoteSystem/        # Sidenote system (Tufte-style)
│   │   ├── Subscribe/         # Email subscription form
│   │   ├── Technical/         # Experience and Projects sections
│   │   └── Welcome/           # Hero/welcome section
│   ├── Blogs/                 # Blog post markdown files
│   └── utils/                 # Utility functions (BlogLoader, etc.)
├── data/                      # Runtime data
│   └── subscribers.json       # Email subscriber list
├── public/                    # Static assets
└── tailwind.config.mjs        # Tailwind configuration
```

---

## Styling System

### Tailwind Configuration
Located in: `tailwind.config.mjs`

**Custom Font Classes:**
- `font-sans` - Inter (body text)
- `font-display` - Inter (headings)

**Custom Utilities:**
- `tracking-tight` - Letter spacing for headings (-0.02em)
- `leading-relaxed` - Line height for body text (1.75)

**Custom Classes (in globals.css):**
- `.underline-grow` - Animated underline on hover (used for links)

### Color Palette
All colors use Tailwind's neutral/stone scales:
- Background: `bg-stone-50`, `bg-stone-100`
- Text: `text-neutral-900` (headings), `text-neutral-700` (body), `text-neutral-600` (metadata), `text-neutral-500` (muted)
- Borders: `border-neutral-200`, `border-neutral-300`
- Interactive: `bg-neutral-900` (buttons), `hover:bg-neutral-800`

### Typography Hierarchy
```
Section Titles:    text-3xl font-display font-bold tracking-tight
Subsection Titles: text-lg font-display font-semibold
Metadata:          text-sm text-neutral-600
Body Text:         text-sm text-neutral-700 leading-relaxed
Small Text:        text-xs text-neutral-500
```

### Spacing System
- Section spacing: `mb-12` (consistent between Welcome, Experience, Projects)
- Item spacing within sections: `mb-8`
- Metadata spacing: `mb-2` (title to metadata, metadata to description)
- Footer separation: `pt-16 pb-10`

### Layout System
- Main content width: `w-full lg:w-[55%]` (optimal reading line length)
- Left margin on desktop: `lg:ml-32`
- Sidenotes width: `lg:w-[45%]` (in two-column layout)

---

## Component Patterns

### NoteWrapper Component
**Purpose**: Tufte-style sidenote system for academic footnotes

**Location**: `src/Components/NoteSystem/NoteWrapper.jsx`

**Usage Pattern**:
```jsx
const content = `
  Some text with a sidenote^1[This appears in the margin]
`;
<NoteWrapper content={content} />
```

**Features**:
- Automatically extracts sidenotes from content
- Renders in two-column layout (55% main, 45% notes)
- Supports markdown in sidenotes
- Handles overlapping notes with smart positioning
- Mobile-friendly (hides sidenotes on small screens)

### Header Component
**Purpose**: Simple navigation between About and Blog

**Location**: `src/Components/Header/Header.jsx`

**Pattern**:
- Active page: Bold with bottom border (`border-b-2`)
- Inactive: Light gray with hover transition
- Uses Next.js `usePathname()` for active state

### Subscribe Form
**Purpose**: Minimalist email subscription

**Location**: `src/Components/Subscribe/SubscribeForm.jsx`

**Design Pattern**:
- Single line: label + input + button
- Success state: Replace form with confirmation
- Error state: Show inline error message
- No marketing copy - just straightforward
- Matches site's minimal aesthetic

---

## Blog System

### Blog File Structure
- Blog posts: `src/Blogs/*.md`
- Loader utility: `src/utils/BlogLoader.js`
- List page: `src/app/blog/page.js` → `src/Components/BlogList/BlogList.jsx`
- Post page: `src/app/blog/[slug]/page.js` → `src/Components/BlogList/BlogPost.jsx`

### Markdown Features
- GitHub Flavored Markdown (GFM)
- Math equations (KaTeX): `$inline$` and `$$display$$`
- Code blocks with syntax highlighting
- Sidenotes: `^1[Note content]`
- Images, links, tables

### Blog List Filtering
**Design**: Minimal tag-style filters
- Small pills: `text-xs px-3 py-1 rounded`
- Unselected: `bg-neutral-200 text-neutral-700`
- Selected: `bg-neutral-900 text-white`
- No shadows, no borders, no marketing

### Blog Post Layout
- Main content: 55% width with sidenotes in 45% margin
- Title: `text-xl font-bold`
- Date: `text-sm` (below title)
- Content: Full markdown rendering with custom components
- Subscribe form at bottom

---

## Email Subscription System

### Setup Required

1. **Create Resend Account**: https://resend.com
2. **Get API Key**: Dashboard → API Keys → Create
3. **Add Environment Variables** (.env.local):
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxx
NOTIFY_SECRET=your_random_secret_here
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### API Routes

#### `/api/subscribe` (POST)
Handles new subscriptions:
- Validates email format
- Stores in `data/subscribers.json`
- Sends confirmation email via Resend
- Returns success/error response

#### `/api/notify-subscribers` (POST)
Notifies all subscribers of new post:
- Requires secret key for security
- Reads all subscribers from JSON file
- Sends email to each with blog link
- Returns count of emails sent

### Manual Notification Process
When you publish a new blog post:

```bash
curl -X POST http://localhost:3000/api/notify-subscribers \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "your_notify_secret",
    "title": "Your Blog Post Title",
    "slug": "your-blog-slug",
    "preview": "Optional preview text..."
  }'
```

### Data Storage
**Current**: Simple JSON file at `data/subscribers.json`
```json
[
  "email1@example.com",
  "email2@example.com"
]
```

**Future Upgrade**: Consider migrating to:
- Vercel Postgres (simple)
- Supabase (more features)
- MongoDB (if needed)

### Email Templates
Located inline in API routes. Update:
- From address: Change `from: "Avery Clapp <onboarding@resend.dev>"` to your domain
- Email content: Modify HTML in `resend.emails.send()` calls

---

## Development Preferences

### Code Style
- **Functional components** with hooks (no class components)
- **Client components** when needed (use `"use client"` directive)
- **Async/await** over promises chains
- **Destructuring** for props and state
- **Early returns** for error cases

### File Naming
- Components: PascalCase (e.g., `BlogList.jsx`)
- Utils: camelCase (e.g., `blogLoader.js`)
- Routes: lowercase (e.g., `page.js`, `route.js`)

### Component Organization
- One component per file
- Imports grouped: React → Next.js → External → Internal → Styles
- Export default at bottom
- Helper functions above component

### Commenting
- Minimal comments (code should be self-documenting)
- Comments for "why" not "what"
- Section comments for large files: `// ===== Section Name =====`

### Git Practices
- Commit messages: Imperative mood ("Add feature" not "Added feature")
- Small, focused commits
- Never commit environment variables or secrets

---

## Common Tasks

### Adding a New Blog Post

1. Create markdown file in `src/Blogs/your-post.md`
2. Add frontmatter:
```markdown
---
title: "Your Post Title"
date: "2025-01-15"
preview: "Short description for list page"
tags: ["tag1", "tag2"]
subtopics: ["subtopic1", "subtopic2"]
---

Your content here...
```
3. Deploy (Vercel auto-builds)
4. Notify subscribers:
```bash
curl -X POST https://yourdomain.com/api/notify-subscribers \
  -H "Content-Type: application/json" \
  -d '{"secret": "xxx", "title": "...", "slug": "...", "preview": "..."}'
```

### Adding a New Section to Home Page

1. Create component in `src/Components/SectionName/`
2. Import in `src/Components/Home/Home.jsx`
3. Add between `<main>` tags with section wrapper:
```jsx
<section id="section-name">
  <YourComponent />
</section>
```
4. Follow spacing pattern: `mb-12` on section

### Updating Experience/Projects

**Files**:
- Experience: `src/Components/Technical/Experience.jsx`
- Projects: `src/Components/Technical/Projects.jsx`

**Pattern**: Content as template strings passed to `NoteWrapper`

**Structure**:
```jsx
<div class="mb-8">
  <h3 class="text-lg font-display font-semibold text-neutral-900 mb-1">
    Title
  </h3>
  <p class="text-sm text-neutral-600 mb-2">Metadata</p>
  <p class="text-sm text-neutral-700 leading-relaxed">
    Description
  </p>
  <a href="..." class="inline-block text-sm font-medium text-neutral-900 underline-grow">
    Link Text →
  </a>
</div>
```

### Adding Custom Styling

1. Global CSS utilities: Add to `src/app/globals.css` in `@layer utilities`
2. Tailwind config: Extend in `tailwind.config.mjs` → `theme.extend`
3. Component-specific: Use Tailwind classes inline

### Changing Typography

Currently using **Inter** for everything. To change:

1. Update `src/app/layout.js`:
```js
import { Your_Font } from "next/font/google";
const yourFont = Your_Font({ subsets: ["latin"], variable: "--font-name" });
```

2. Update `tailwind.config.mjs`:
```js
fontFamily: {
  sans: ["var(--font-name)", "system-ui", "sans-serif"],
  display: ["var(--font-name)", "system-ui", "sans-serif"],
}
```

3. Update `src/app/globals.css`:
```css
body {
  font-family: var(--font-name), system-ui, sans-serif;
}
```

---

## Quick Reference

### Key Files to Know
- `src/app/layout.js` - Root layout, fonts, metadata
- `src/app/globals.css` - Global styles, custom utilities
- `tailwind.config.mjs` - Design tokens, theme
- `src/Components/Home/Home.jsx` - Main page structure
- `src/Components/NoteSystem/NoteWrapper.jsx` - Sidenote system
- `src/utils/BlogLoader.js` - Blog post loading logic

### Environment Variables
```bash
# Required for email subscriptions
RESEND_API_KEY=re_xxxxxxxxxxxxx
NOTIFY_SECRET=random_secret_string

# Optional
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

### Design Decisions to Respect
- ✅ DO: Keep things minimal, use Inter font, generous whitespace
- ✅ DO: Match existing spacing patterns (`mb-12`, `mb-8`, etc.)
- ✅ DO: Use neutral grays, avoid colors
- ✅ DO: Simple transitions on hover (color changes)
- ❌ DON'T: Add animations, shadows, gradients
- ❌ DON'T: Use marketing language or superlatives
- ❌ DON'T: Create popups, modals, or intrusive UI
- ❌ DON'T: Add emojis unless explicitly requested

---

## Development Notes

### User Feedback
- "This is getting too flashy" → Dial back immediately
- "Doesn't fit the rest of the page" → Match existing patterns
- Values minimalism and seamless integration above all

### Workflow Preferences
- Proactive with TODO tracking (use TodoWrite tool)
- Complete one task fully before moving to next
- Mark todos complete immediately after finishing
- Provide clear "what you need to do next" instructions
- Create comprehensive documentation for future reference

---

## Last Updated
2025-01-08

When in doubt, prioritize minimalism and ask the user before adding anything flashy or complex.
