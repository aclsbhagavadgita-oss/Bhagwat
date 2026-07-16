/**
 * copy-standalone-files.js
 * 
 * Runs after `next build` to copy required runtime files into .next/standalone/
 * so the Node.js server on Hostinger (or any host) can find them.
 * 
 * Works on both Windows (local dev) and Linux (Hostinger server).
 */

const fs = require('fs');
const path = require('path');

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`⚠️  Source not found, skipping: ${src}`);
    return;
  }
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const root = process.cwd();
const standalone = path.join(root, '.next', 'standalone');

if (!fs.existsSync(standalone)) {
  console.log('⚠️  .next/standalone not found — skipping copy (non-standalone build).');
  process.exit(0);
}

// Copy data/ → .next/standalone/data/
console.log('📂 Copying data/ → .next/standalone/data/ ...');
copyDirRecursive(path.join(root, 'data'), path.join(standalone, 'data'));

// Copy public/ → .next/standalone/public/
console.log('📂 Copying public/ → .next/standalone/public/ ...');
copyDirRecursive(path.join(root, 'public'), path.join(standalone, 'public'));

// Copy .next/static/ → .next/standalone/.next/static/
console.log('📂 Copying .next/static/ → .next/standalone/.next/static/ ...');
copyDirRecursive(
  path.join(root, '.next', 'static'),
  path.join(standalone, '.next', 'static')
);

console.log('✅ Standalone files copied successfully!');
