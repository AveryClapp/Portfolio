# Personal Portfolio

A minimalist portfolio built with Next.js 15, featuring a blog with email subscriptions, Tufte-style sidenotes, and KaTeX math rendering.

## Features

- **Minimalist Design**: Clean, academic aesthetic with generous whitespace
- **Blog System**: Markdown-based blog with GitHub Flavored Markdown, math equations (KaTeX), and syntax highlighting
- **Chess Game Integration**: Interactive chess boards from PGN notation with move-by-move navigation and variations
- **Obsidian Notes Integration**: Automatically host, read, and link obsidian notes from a given repo of yours.
- **Sidenotes**: Tufte-style margin notes for academic footnotes
- **Email Subscriptions**: Resend-powered email notifications for new posts
- **Responsive**: Mobile-friendly with collapsible sidenotes

## Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Resend API Key (get from https://resend.com/api-keys)
RESEND_API_KEY=re_your_api_key_here

# Secret key for notify-subscribers endpoint
NOTIFY_SECRET=your_random_secret_string

# Site URL (for local dev)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Create a `.env.production` file for production notifications:

```bash
# Same API key and secret
RESEND_API_KEY=re_your_api_key_here
NOTIFY_SECRET=your_random_secret_string

# Production URL
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Vercel Environment Variables

Add these in your Vercel project settings → Environment Variables:

- `RESEND_API_KEY`
- `NOTIFY_SECRET`
- `NEXT_PUBLIC_SITE_URL`

After adding, redeploy your project.

## Blog System

### Creating a New Post

Create a markdown file in `src/Blogs/`:

```markdown
---
title: "Your Post Title"
date: "2025-01-15"
preview: "Short description for list page"
tags: ["tag1", "tag2"]
subtopics: ["subtopic1", "subtopic2"]
---

Your content here...

Use sidenotes like this^1[This appears in the margin]

Math equations: $inline$ or $$display$$

Chess games (renders as interactive board):
```
````markdown
```pgn
[Event "Immortal Game"]
[White "Anderssen, Adolf"]
[Black "Kieseritzky, Lionel"]

1. e4 e5 2. f4 exf4 3. Bc4 Qh4+
```
````
```

### Chess Game Integration

Interactive chess boards render automatically from PGN code blocks.

**Basic game:**
````markdown
```pgn
[Event "My Game"]
[White "Player 1"]
[Black "Player 2"]

1. e4 e5 2. Nf3 Nc6 3. Bc4
```
````

**With variations** (clickable alternative moves):
````markdown
```pgn
1. e4 e5
2. f4 exf4
3. Nf3
   {variation: Bishop's Gambit}
   (3. Bc4 d5 4. Bxd5)
3... g5
```
````

Features:
- Move-by-move navigation (Previous/Next buttons)
- Progress bar
- Interactive variations (blue dots on pieces)
- Supports castling, captures, promotions
- Auto-syncs from Obsidian (no plugin needed)

**Obsidian workflow:**
1. Get PGN from lichess.org, chess.com, or any chess site
2. Paste into Obsidian as regular code block with `pgn` language
3. Syncs automatically - renders as interactive board on site

### Notifying Subscribers

After publishing a new post:

**For local testing:**

```bash
npm run notify
```

**For production:**

```bash
npm run notify:prod
```

The script will prompt you for:

- Blog post slug
- Title
- Preview text (optional)

## Obsidian Notes Integration

This portfolio automatically syncs and publishes notes from a private Obsidian vault.

### How It Works

1. Write notes in Obsidian using markdown + sidenotes (`^N[content]`)
2. Push to private GitHub repo ([NotesNew](https://github.com/AveryClapp/NotesNew))
3. GitHub Actions triggers Vercel deployment webhook
4. Vercel rebuild process:
   - Clones notes repo using GitHub token
   - Copies markdown files to `src/Notes/`
   - Syncs assets to `public/notes-assets/`
   - Processes wikilinks and image paths
5. Notes appear at `/notes/{slug}`

### Setup

**Vercel Environment Variables:**

Add these in Vercel project settings:

```bash
# GitHub Personal Access Token with repo access
GITHUB_TOKEN=ghp_xxxxxxxxxxxxx

# Optional: Deploy hook for manual triggers
VERCEL_DEPLOY_HOOK=https://api.vercel.com/v1/integrations/deploy/...
```

**GitHub Repository Secrets (NotesNew repo):**

Add in repository Settings → Secrets and variables → Actions:

```
VERCEL_DEPLOY_HOOK - Webhook URL from Vercel deploy hooks
```

**Creating GitHub Token:**

1. Go to https://github.com/settings/tokens/new
2. Note: "Vercel Notes Access"
3. Expiration: No expiration (or 1 year)
4. Scopes: Check `repo` (full control of private repositories)
5. Generate token and copy to Vercel

### Supported Features

**Sidenotes:**
```markdown
Main text here^1[This appears in the margin as a sidenote]
```

**Wikilinks:**
```markdown
See [[Note Title]] for more details
Custom text: [[Note Title|click here]]
Cross-reference blog: [[blog-post-slug]]
```

Wikilinks automatically resolve to:
- Notes: `/notes/{slug}`
- Blog posts: `/blog/{slug}`

**Images and Assets:**
```markdown
![Description](assets/image.png)
![Screenshot](images/screenshot.jpg)
[Download PDF](attachments/document.pdf)
```

Supported asset folders (auto-synced):
- `assets/`
- `images/`
- `attachments/`
- `files/`

### Development vs Production

**Development (`npm run dev`):**
- Reads directly from local Obsidian vault
- Path: `/Users/averyclapp/Documents/KnowledgeVault/SecondBrain`
- Instant updates when editing notes

**Production (Vercel):**
- Uses synced notes from `src/Notes/` (cloned during build)
- Auto-deploys on push to NotesNew repo

### Automatic Deployment

When you push to NotesNew:

1. GitHub Actions workflow triggers
2. Calls Vercel deploy hook
3. Vercel runs prebuild script (`scripts/sync-notes.js`)
4. Script clones latest notes and syncs assets
5. Site rebuilds with updated notes

Deploy time: ~2-3 minutes

## Project Structure

```
portfolio-next/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/
│   │   │   ├── subscribe/      # Email subscription endpoint
│   │   │   └── notify-subscribers/ # Notification endpoint
│   │   ├── blog/               # Blog pages
│   │   └── resume/             # Resume page
│   ├── Components/
│   │   ├── BlogList/           # Blog listing and posts
│   │   ├── NoteSystem/         # Sidenote system
│   │   ├── Subscribe/          # Email subscription form
│   │   └── ...
│   ├── Blogs/                  # Blog post markdown files
│   └── utils/                  # Utility functions
├── data/
│   └── subscribers.json        # Email subscriber list
├── scripts/
│   └── notify.js               # Notification script
├── .env.local                  # Local environment variables
├── .env.production             # Production environment variables
└── CLAUDE.md                   # Development guide
```

## Email Subscription System

### How It Works

1. Users subscribe via form at bottom of blog posts
2. Email addresses stored in `data/subscribers.json`
3. Confirmation email sent via Resend
4. When you publish, run `npm run notify:prod`
5. All subscribers receive email with link to new post

### Customizing Email Domain

By default, emails come from `onboarding@resend.dev`. To use your custom domain:

1. Add and verify your domain in Resend dashboard
2. Update "from" address in:
   - `src/app/api/subscribe/route.js` (line 66)
   - `src/app/api/notify-subscribers/route.js` (line 48)

```js
from: "Your Name <you@yourdomain.com>";
```

## Deployment

This project is designed to be deployed on [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Typography**: Inter font
- **Markdown**: React Markdown with KaTeX for math
- **Chess**: chess.js v1.4.0 for PGN parsing
- **Email**: Resend API
- **Deployment**: Vercel

## Documentation

- **CLAUDE.md**: Comprehensive development guide for AI assistants and contributors

## License

Private project
