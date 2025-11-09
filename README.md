# Personal Portfolio

A minimalist portfolio built with Next.js 15, featuring a blog with email subscriptions, Tufte-style sidenotes, and KaTeX math rendering.

## Features

- **Minimalist Design**: Clean, academic aesthetic with generous whitespace
- **Blog System**: Markdown-based blog with GitHub Flavored Markdown, math equations (KaTeX), and syntax highlighting
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
```

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
- **Email**: Resend API
- **Deployment**: Vercel

## Documentation

- **CLAUDE.md**: Comprehensive development guide for AI assistants and contributors

## License

Private project
