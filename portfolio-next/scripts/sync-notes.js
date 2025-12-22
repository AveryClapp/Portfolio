const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Recursive copy function
function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;

  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src);

    entries.forEach(entry => {
      copyRecursive(
        path.join(src, entry),
        path.join(dest, entry)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

const NOTES_DIR = path.join(process.cwd(), 'src', 'Notes');
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

// Use token if available (for private repos), otherwise use public URL
const NOTES_REPO = GITHUB_TOKEN
  ? `https://${GITHUB_TOKEN}@github.com/AveryClapp/NotesNew.git`
  : 'https://github.com/AveryClapp/NotesNew.git';

console.log('🔄 Syncing notes from repository...');
console.log(`📝 Using ${GITHUB_TOKEN ? 'authenticated' : 'public'} access`);

try {
  // Remove existing notes directory if it exists
  if (fs.existsSync(NOTES_DIR)) {
    console.log('📁 Removing old notes directory...');
    fs.rmSync(NOTES_DIR, { recursive: true, force: true });
  }

  // Clone the notes repository
  console.log('📥 Cloning notes repository...');
  execSync(`git clone --depth 1 ${NOTES_REPO} "${NOTES_DIR}"`, {
    stdio: 'inherit'
  });

  // Remove .git directory to avoid conflicts
  const gitDir = path.join(NOTES_DIR, '.git');
  if (fs.existsSync(gitDir)) {
    fs.rmSync(gitDir, { recursive: true, force: true });
  }

  // Remove .obsidian directory (not needed for website)
  const obsidianDir = path.join(NOTES_DIR, '.obsidian');
  if (fs.existsSync(obsidianDir)) {
    fs.rmSync(obsidianDir, { recursive: true, force: true });
  }

  // Copy assets to public directory
  console.log('📦 Copying assets...');
  const publicAssetsDir = path.join(process.cwd(), 'public', 'notes-assets');

  // Remove old assets
  if (fs.existsSync(publicAssetsDir)) {
    fs.rmSync(publicAssetsDir, { recursive: true, force: true });
  }

  // Create assets directory
  fs.mkdirSync(publicAssetsDir, { recursive: true });

  // Copy assets directory contents directly (not the _assets folder itself)
  const sourceAssetsDir = path.join(NOTES_DIR, '_assets');
  if (fs.existsSync(sourceAssetsDir)) {
    const entries = fs.readdirSync(sourceAssetsDir);
    entries.forEach(entry => {
      copyRecursive(
        path.join(sourceAssetsDir, entry),
        path.join(publicAssetsDir, entry)
      );
    });
    console.log(`  ✓ Copied ${entries.length} asset(s) from _assets/`);
  }

  console.log('✅ Notes synced successfully!');

  // Count markdown files
  const files = fs.readdirSync(NOTES_DIR).filter(f => f.endsWith('.md'));
  console.log(`📝 Found ${files.length} note(s)`);

} catch (error) {
  console.error('❌ Error syncing notes:', error.message);
  process.exit(1);
}
