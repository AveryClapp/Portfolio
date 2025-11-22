# Avery Clapp's Portfolio

Personal portfolio and blog built with Next.js, featuring automatic Obsidian notes integration.

## Features

- 📝 Blog posts with sidenotes
- 🔗 Obsidian notes integration with automatic deployment
- 🖼️ Automatic asset syncing (images, attachments)
- ↔️ Wikilink support for cross-referencing
- 📧 Email subscription system
- 🎨 Clean, minimal design

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Markdown**: React Markdown + KaTeX
- **Deployment**: Vercel
- **Database**: Vercel KV (subscribers)

## Obsidian Notes Integration

This portfolio automatically syncs and publishes notes from my private Obsidian vault.

### How It Works

1. Write notes in Obsidian using markdown + sidenotes (`^N[content]`)
2. Push to private GitHub repo ([NotesNew](https://github.com/AveryClapp/NotesNew))
3. GitHub Actions triggers Vercel deployment webhook
4. Vercel rebuild:
   - Clones notes repo using GitHub token
   - Copies markdown files to `src/Notes/`
   - Syncs assets to `public/notes-assets/`
   - Processes wikilinks and image paths
5. Notes appear at `/notes/{slug}`

### Setup

**Required Environment Variables (Vercel):**

```env
# GitHub Personal Access Token with repo access
GITHUB_TOKEN=ghp_xxxxxxxxxxxxx

# Vercel Deploy Hook (optional, for manual triggers)
VERCEL_DEPLOY_HOOK=https://api.vercel.com/v1/integrations/deploy/...
```

**GitHub Repository Secrets (NotesNew repo):**

```
VERCEL_DEPLOY_HOOK - Webhook URL from Vercel project settings
```

### Supported Features

**Sidenotes:**
```markdown
This is main text^1[This appears in the margin]
```

**Wikilinks:**
```markdown
See [[Note Title]] for more
Link with custom text: [[Note Title|click here]]
Cross-reference blog posts: [[blog-post-slug]]
```

**Images:**
```markdown
![Description](assets/image.png)
![Screenshot](images/screenshot.jpg)
```

Images are automatically synced from Obsidian vault folders:
- `assets/`
- `images/`
- `attachments/`
- `files/`

### File Structure

```
portfolio-next/
├── src/
│   ├── app/
│   │   ├── blog/           # Blog posts
│   │   └── notes/          # Obsidian notes routes
│   │       └── [slug]/     # Individual note pages
│   ├── Blogs/              # Blog post markdown files
│   ├── Components/         # React components
│   └── utils/
│       ├── BlogLoader.js   # Load blog posts
│       ├── NotesLoader.js  # Load Obsidian notes
│       └── WikilinkProcessor.js  # Process [[wikilinks]]
├── scripts/
│   └── sync-notes.js       # Prebuild script to clone notes
└── public/
    └── notes-assets/       # Synced images (auto-generated)
```

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

**Build Process:**
1. `prebuild` - Syncs notes from GitHub
2. `build` - Next.js build with static generation

## Deployment

Automatic deployment via Vercel:
- **Blog updates**: Push to main branch → auto-deploy
- **Note updates**: Push to NotesNew repo → GitHub Actions → Vercel webhook → auto-deploy

## Email Subscriptions

Uses Resend API for sending blog post notifications.

**Environment Variables:**
```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

**Scripts:**
```bash
npm run notify              # Send latest post notification
npm run subscribers         # List all subscribers
```

## License

Personal portfolio - All rights reserved
