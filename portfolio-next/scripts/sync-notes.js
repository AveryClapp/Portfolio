const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const NOTES_DIR = path.join(process.cwd(), 'src', 'Notes');
const NOTES_REPO = 'https://github.com/AveryClapp/NotesNew.git';

console.log('🔄 Syncing notes from repository...');

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

  console.log('✅ Notes synced successfully!');

  // Count markdown files
  const files = fs.readdirSync(NOTES_DIR).filter(f => f.endsWith('.md'));
  console.log(`📝 Found ${files.length} note(s)`);

} catch (error) {
  console.error('❌ Error syncing notes:', error.message);
  process.exit(1);
}
