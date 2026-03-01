const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(process.cwd(), 'dist');
const BASE_PATH = '/CardMaster';

function walk(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function rewriteHtmlFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');

  const rewritten = original
    .replace(/(href|src)="\/(?!\/|CardMaster\/)/g, `$1=\"${BASE_PATH}/`)
    .replace(/content="\/(?!\/|CardMaster\/)/g, `content=\"${BASE_PATH}/`)
    .replace(/window\.location\.pathname==="\/"/g, `window.location.pathname===\"${BASE_PATH}/\"`);

  if (rewritten !== original) {
    fs.writeFileSync(filePath, rewritten, 'utf8');
  }
}

function main() {
  if (!fs.existsSync(DIST_DIR)) {
    throw new Error('Pasta dist não encontrada. Rode o build web antes.');
  }

  const files = walk(DIST_DIR);
  const htmlFiles = files.filter((file) => file.endsWith('.html'));

  for (const htmlFile of htmlFiles) {
    rewriteHtmlFile(htmlFile);
  }

  const indexPath = path.join(DIST_DIR, 'index.html');
  const notFoundPath = path.join(DIST_DIR, '404.html');
  if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, notFoundPath);
  }

  console.log(`GitHub Pages preparado: ${htmlFiles.length} arquivos HTML ajustados.`);
}

main();
