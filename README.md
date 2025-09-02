# Personal Portfolio

A modern, responsive personal portfolio website built with Next.js, featuring a clean design, blog system with sidenotes, and mobile-friendly interface.

## Features

### Core Functionality

- **Responsive Design**: Fully mobile-friendly layout that adapts to all screen sizes
- **Blog System**: Complete markdown-based blog with advanced features
- **Sidenotes**: Interactive margin notes for enhanced reading experience (desktop only)
- **Projects Showcase**: Detailed project presentations with GitHub links
- **Professional Experience**: Timeline of work experience and roles

### Technical Highlights

- **Advanced Markdown Processing**: Support for LaTeX math, code highlighting, and custom formatting
- **Interactive Code Blocks**: Copy-to-clipboard functionality with syntax highlighting
- **Dynamic Navigation**: Clean header navigation with active state indicators
- **Performance Optimized**: Built with Next.js for optimal loading and SEO

```
portfolio-next/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── blog/              # Blog pages and routing
│   │   ├── resume/            # Resume viewer page
│   │   └── globals.css        # Global styles
│   ├── Components/            # React components
│   │   ├── BlogList/          # Blog listing and post components
│   │   ├── NoteSystem/        # Sidenote system implementation
│   │   ├── Header/            # Navigation header
│   │   ├── Footer/            # Site footer
│   │   ├── Welcome/           # Landing section
│   │   └── Technical/         # Experience and projects sections
│   ├── Blogs/                 # Markdown blog posts
│   └── utils/                 # Utility functions
├── public/                    # Static assets
└── README.md
```

## ✍️ Writing Blog Posts

Create new blog posts by adding Markdown files to `src/Blogs/`. Each post should include frontmatter:

```markdown
---
title: "Your Blog Post Title"
date: "MM-DD-YYYY"
preview: "Brief description for the blog listing"
slug: "url-friendly-slug"
tags: ["TagOne", "TagTwo"]
---

Your blog content here...
```

### Sidenotes Feature

Add interactive sidenotes using the syntax: `^1[This is a sidenote]`

The sidenote system supports:

- **Markdown formatting** within notes
- **LaTeX math** expressions
- **Images** and links
- **Automatic positioning** on desktop

## Customization

### Styling

The project uses Tailwind CSS for styling. Key color scheme:

- Background: Stone/neutral tones
- Text: Various neutral shades
- Accents: Blue for links, neutral for UI elements

### Content Updates

- **Personal Information**: Update `src/Components/Welcome/Welcome.jsx`
- **Experience**: Modify `src/Components/Technical/Experience.jsx`
- **Projects**: Edit `src/Components/Technical/Projects.jsx`
- **Contact Info**: Update footer and contact components

## Technologies Used

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Markdown Processing**: gray-matter, ReactMarkdown
- **Math Rendering**: KaTeX
- **Code Highlighting**: Prism.js (react-syntax-highlighter)
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## Mobile Responsiveness

The portfolio is fully responsive with:

- **Adaptive layouts** for all screen sizes
- **Touch-friendly navigation** on mobile devices
- **Optimized typography** scaling
- **Hidden sidenotes** on mobile (converted to regular text)

## Author

**Avery Clapp**

- Email: aclapp1@jh.edu
- LinkedIn: [avery-clapp-062289245](https://www.linkedin.com/in/avery-clapp-062289245/)
- GitHub: [@AveryClapp](https://github.com/AveryClapp)

## Contributing

Feel free to fork this repository and adapt it for yourself

---
