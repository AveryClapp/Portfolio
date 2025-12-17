const { pipeline } = require('@xenova/transformers');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Configuration
const NOTES_DIR = path.join(process.cwd(), 'src', 'Notes');
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'data', 'embeddings.json');
const MODEL_NAME = 'Xenova/all-MiniLM-L6-v2'; // 384 dimensions, fast and accurate

function titleToSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function cleanMarkdown(text) {
  return text
    // Remove sidenotes: ^1[text] -> remove entirely
    .replace(/\^\d+\[[^\]]*\]/g, '')
    // Remove sidenote markers: ^1
    .replace(/\^\d+/g, '')
    // Remove wikilinks: [[link|text]] -> text or [[link]] -> link
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    // Remove any leftover pipes from wikilinks
    .replace(/\|/g, '')
    // Remove bold/italic: **text** or __text__ -> text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Remove headers: # Title -> Title
    .replace(/^#{1,6}\s+/gm, '')
    // Remove code blocks and inline code
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    // Remove HTML tags
    .replace(/<[^>]+>/g, '')
    // Remove brackets
    .replace(/[\[\]]/g, '')
    // Clean up extra whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

async function generateEmbeddings() {
  console.log('🔍 Generating semantic embeddings...');

  try {
    // Check if notes directory exists
    if (!fs.existsSync(NOTES_DIR)) {
      console.log(`⚠️  Notes directory not found: ${NOTES_DIR}`);
      console.log('Creating empty embeddings file...');

      // Ensure data directory exists
      const dataDir = path.dirname(OUTPUT_FILE);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      // Write empty array
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify([], null, 2));
      console.log('✅ Created empty embeddings file');
      return;
    }

    // Load the embedding model (runs in Node.js)
    console.log('📥 Loading embedding model...');
    const embedder = await pipeline('feature-extraction', MODEL_NAME);
    console.log('✓ Model loaded');

    // Read all markdown files
    const files = fs.readdirSync(NOTES_DIR)
      .filter(f => f.endsWith('.md') && !f.startsWith('.') && !f.startsWith('_'));

    console.log(`📝 Found ${files.length} note files`);

    const embeddings = [];

    for (let i = 0; i < files.length; i++) {
      const filename = files[i];
      const fullPath = path.join(NOTES_DIR, filename);

      try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        // Generate slug (same logic as NotesLoader.js)
        const rawSlug = data.slug || filename.replace(/\.md$/, '');
        const slug = titleToSlug(rawSlug);

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
          title,
          preview,
          embedding,
          type: data.type || 'note',
          date: data.date || new Date().toISOString().split('T')[0]
        });

        // Progress indicator
        if ((i + 1) % 5 === 0 || i === files.length - 1) {
          console.log(`  ✓ Processed ${i + 1}/${files.length} notes`);
        }
      } catch (error) {
        console.error(`  ✗ Error processing ${filename}:`, error.message);
        // Continue processing other files
      }
    }

    // Ensure data directory exists
    const dataDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write embeddings to JSON
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(embeddings, null, 2));

    console.log(`✅ Generated ${embeddings.length} embeddings`);
    console.log(`📝 Saved to ${OUTPUT_FILE}`);

    // Log file size
    const stats = fs.statSync(OUTPUT_FILE);
    console.log(`💾 File size: ${(stats.size / 1024).toFixed(2)} KB`);
  } catch (error) {
    console.error('❌ Error generating embeddings:', error);
    process.exit(1);
  }
}

// Run with error handling
generateEmbeddings().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
