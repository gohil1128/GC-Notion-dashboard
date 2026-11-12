// Renders the Notion kit PNGs from the SVG marks and tools/notion-cover.html.
// Usage: node tools/render-notion-kit.js   (needs Playwright + Chromium)
const { chromium } = require('playwright');
const path = require('path');
const root = path.resolve(__dirname, '..');
const url = p => 'file://' + path.join(root, p);

(async () => {
  const b = await chromium.launch();
  const page = await b.newPage({ viewport: { width: 1500, height: 600 } });
  await page.goto(url('tools/notion-cover.html'), { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(root, 'assets/notion/notion-cover-1500x600.png') });

  const marks = [
    ['assets/logo/gc-monogram.svg', 'assets/notion/icon-gc-monogram.png'],
    ['assets/logo/gc-monogram-cream.svg', 'assets/notion/icon-gc-monogram-cream.png'],
    ['assets/logo/gc-monogram-terracotta.svg', 'assets/notion/icon-gc-monogram-terracotta.png'],
    ['assets/logo/gc-glass.svg', 'assets/notion/icon-gc-glass.png'],
    ['assets/logo/gc-glass-dark.svg', 'assets/notion/icon-gc-glass-dark.png'],
  ];
  const icon = await b.newPage({ viewport: { width: 512, height: 512 } });
  for (const [src, out] of marks) {
    await icon.goto(url(src));
    await icon.screenshot({ path: path.join(root, out) });
  }
  await b.close();
})();
