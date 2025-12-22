// Quick script to sync assets from Obsidian vault to public folder in development
const fs = require('fs');
const path = require('path');

const VAULT_ASSETS = '/Users/averyclapp/Documents/KnowledgeVault/SecondBrain/_assets';
const PUBLIC_ASSETS = path.join(process.cwd(), 'public', 'notes-assets');

// Recursive copy function
function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`❌ Source directory not found: ${src}`);
    return;
  }

  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    // Create destination directory
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

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

console.log('🔄 Syncing assets from Obsidian vault...');
console.log(`📁 From: ${VAULT_ASSETS}`);
console.log(`📁 To: ${PUBLIC_ASSETS}`);

// Remove old assets
if (fs.existsSync(PUBLIC_ASSETS)) {
  fs.rmSync(PUBLIC_ASSETS, { recursive: true, force: true });
}

// Copy assets
copyRecursive(VAULT_ASSETS, PUBLIC_ASSETS);

// Count files
const files = fs.readdirSync(PUBLIC_ASSETS);
console.log(`✅ Synced ${files.length} asset(s)`);
