// Renders public/assets/sg-social-default.png (the default og:image / twitter:image set in
// src/components/PageWrapper/PageWrapper.js): the white Search Guard logo centered on the
// brand blue, 1200x630. Usage: node scripts/render-social-image.js public/assets/sg-social-default.png
const puppeteer = require('puppeteer'); const fs = require('fs');
const [,, outFile] = process.argv;
const logo = fs.readFileSync(require('path').join(__dirname, '..', 'src', 'images', 'sg_logo_white.svg'), 'utf8').replace(/<\?xml[^>]*>\s*/, '').replace(/<!--[\s\S]*?-->/g, '');
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;width:1200px;height:630px;background:#184962;overflow:hidden}
.wrap{width:1200px;height:630px;display:flex;align-items:center;justify-content:center}
svg{width:880px;height:auto;display:block}
</style></head><body><div class="wrap">${logo}</div></body></html>`;
(async () => {
  const browser = await puppeteer.launch({ headless: true }); const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load' });
  await page.screenshot({ path: outFile, type: 'png', clip: { x: 0, y: 0, width: 1200, height: 630 } });
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
