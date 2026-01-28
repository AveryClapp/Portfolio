# Page Transitions Design

**Date:** 2026-01-27
**Goal:** Add smooth, minimal page transitions to make the site feel premium and native-app-like

---

## Overview

Implement subtle page transitions using Next.js 15's View Transitions API. The transitions should be barely noticeable but make navigation feel buttery smooth - like an iOS app rather than a website.

**Philosophy:** Transitions reveal content that's already there, rather than "loading a new page."

---

## User Experience

### What Changes

**Between main pages** (Home ↔ Blog ↔ Wiki):
- Content fades smoothly (300ms)
- Header and footer stay in place (shared elements)
- No flash or jarring page reload

**List → Detail** (Blog list → Blog post, Wiki directory → Note):
- Clicked title stays in place and morphs to its new position
- Creates a "zoom in" feeling without actual zoom
- Remaining content fades in around the title (350ms)

**Back navigation:**
- Reverse of forward transition
- Title morphs back to list position

### What Stays Minimal

- No slide animations
- No zoom effects
- No flashy transitions
- Duration kept short (300-350ms)
- Graceful degradation (Safari/Firefox see instant navigation)

---

## Technical Implementation

### 1. Enable View Transitions

**File:** `next.config.mjs`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    viewTransitions: true,
  },
};

export default nextConfig;
```

### 2. Base Transition Styles

**File:** `src/app/globals.css` (add at end)

```css
/* ===== View Transitions ===== */

/* Base transition timing - smooth but quick */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 300ms;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Fade effect for page transitions */
::view-transition-old(root) {
  animation-name: fade-out;
}

::view-transition-new(root) {
  animation-name: fade-in;
}

@keyframes fade-out {
  to { opacity: 0.95; }
}

@keyframes fade-in {
  from { opacity: 0.95; }
}

/* Shared elements (header, footer) don't animate */
::view-transition-old(header),
::view-transition-new(header),
::view-transition-old(footer),
::view-transition-new(footer) {
  animation: none;
}

/* Prevent overlapping transitions & respect motion preferences */
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none !important;
  }
}
```

### 3. Shared Elements (Header & Footer)

**File:** `src/Components/Header/Header.jsx`

Add `viewTransitionName` to header wrapper:
```jsx
<header
  className="w-full bg-stone-100 py-6 sticky top-0 z-50"
  style={{ viewTransitionName: 'header' }}
>
```

**File:** `src/Components/Footer/Footer.jsx`

Add `viewTransitionName` to footer wrapper:
```jsx
<footer
  className="w-full bg-stone-100 border-t border-neutral-200 pt-16 pb-10"
  style={{ viewTransitionName: 'footer' }}
>
```

### 4. Title Morphing (Blog)

**File:** `src/Components/BlogList/BlogList.jsx`

Add transition name to blog post title links:
```jsx
<Link
  href={`/blog/${post.slug}`}
  className="hover:text-neutral-600 transition-colors"
  style={{ viewTransitionName: `blog-title-${post.slug}` }}
>
  {post.title}
</Link>
```

**File:** `src/Components/BlogList/BlogPost.jsx`

Add matching transition name to detail page title:
```jsx
<h1
  className="text-xl font-bold text-neutral-900 mb-2"
  style={{
    viewTransitionName: post.slug
      ? (isNote ? `wiki-title-${post.slug}` : `blog-title-${post.slug}`)
      : undefined
  }}
>
  {post.title}
</h1>
```

### 5. Title Morphing (Wiki)

**File:** `src/app/wiki/page.js`

Add transition name to directory title links:
```jsx
<Link
  href={`/wiki/${directory.slug}`}
  className="hover:text-neutral-600 transition-colors"
  style={{ viewTransitionName: `dir-title-${directory.slug}` }}
>
  {directory.icon && <span className="mr-2">{directory.icon}</span>}
  {directory.title}
</Link>
```

**File:** `src/Components/Knowledge/DirectoryPage.jsx`

Add matching transition name to directory page title:
```jsx
<h1
  className="mb-3 text-2xl font-display font-bold text-neutral-900 tracking-tight"
  style={{ viewTransitionName: `dir-title-${directory.slug}` }}
>
  {directory.title}
</h1>
```

Add transition name to MOC title links:
```jsx
<Link
  href={`/wiki/${moc.slug}`}
  className="hover:text-neutral-600 transition-colors"
  style={{ viewTransitionName: `wiki-title-${moc.slug}` }}
>
  {moc.title}
</Link>
```

### 6. Loading State

**File:** `src/app/layout.js`

Add Suspense wrapper:
```jsx
import { Suspense } from 'react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
```

---

## Browser Support

| Browser | Support | Behavior |
|---------|---------|----------|
| Chrome 111+ | ✅ Full | Smooth transitions |
| Edge 111+ | ✅ Full | Smooth transitions |
| Safari | ⚠️ Degraded | Instant navigation (no transition) |
| Firefox | ⚠️ Degraded | Instant navigation (no transition) |
| Mobile Chrome | ✅ Full | Smooth transitions |
| Mobile Safari | ⚠️ Degraded | Instant navigation (no transition) |

**Note:** Degraded browsers still work perfectly - they just don't see the transitions. No broken experience.

---

## Testing Checklist

Before shipping:

- [ ] Home → Blog → Post → Back
- [ ] Blog → Different post
- [ ] Wiki → Directory → Note → Back
- [ ] Wiki → Different directory
- [ ] Direct URL navigation (should work without transition)
- [ ] Browser back/forward buttons
- [ ] Mobile Chrome (should transition)
- [ ] Mobile Safari (should work without transition)
- [ ] Rapid clicking (shouldn't cause visual glitches)
- [ ] Slow connection (should still feel smooth)

---

## Expected Result

Navigation feels like sliding between screens in a native iOS app:
- Buttery smooth
- Fast (300-350ms)
- Completely minimal (no flash, no zoom, no slide)
- Titles "stay in place" when clicking from lists
- Header/footer never re-render

Users won't consciously notice the transitions, but the site will feel significantly more polished and premium.

---

## Future Enhancements (Not in Scope)

- Shared image transitions (if we add hero images)
- Directional transitions (left vs right based on navigation hierarchy)
- Custom transitions for specific page pairs
- Cursor-based transition origins

Keep it simple for now. Ship the basics.
