const fs = require('fs');
const path = require('path');

// Create .nojekyll file to allow files starting with underscore
const distPath = path.join(__dirname, '..', 'dist');
const nojekyllPath = path.join(distPath, '.nojekyll');

if (fs.existsSync(distPath)) {
  fs.writeFileSync(nojekyllPath, '');
  console.log('✅ Created .nojekyll file for GitHub Pages');
} else {
  console.error('❌ dist folder not found');
  process.exit(1);
}
