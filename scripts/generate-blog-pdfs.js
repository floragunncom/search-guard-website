#!/usr/bin/env node

/**
 * Generate a branded PDF for every blog post.
 *
 * Runs after `next build` as part of `npm run build` / `build-local`:
 * reads the Contentful snapshot (src/Api/contentfulPosts.json), renders each
 * post's markdown through the same converter the website uses
 * (markdown-to-jsx), fills scripts/pdf-template/template.html, and prints it
 * to out/downloads/blog/<slug>.pdf with headless Chromium.
 *
 * The article pages link to these PDFs by slug, so the script FAILS the build
 * unless every post produced a PDF — a missing file would mean a dead
 * download link in production.
 *
 * Skip locally with SKIP_PDFS=1 (e.g. for quick layout iterations).
 */

// Render markdown the way the deployed site does: react-dom/server in
// production mode. Dev mode additionally prints warnings for the handful of
// old posts whose code blocks contain pseudo-tags like <Elasticsearch
// directory> — harmless, but noisy in the build log. Must be set before the
// React requires below.
process.env.NODE_ENV = 'production';

const fs = require('fs');
const os = require('os');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { compiler } = require('markdown-to-jsx');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'out', 'downloads', 'blog');
const POSTS_FILE = path.join(ROOT, 'src', 'Api', 'contentfulPosts.json');
const TEMPLATE_FILE = path.join(__dirname, 'pdf-template', 'template.html');
const LOGO_FILE = path.join(ROOT, 'src', 'images', 'sg_logo_white.svg');
const FONTS_DIR = path.join(ROOT, 'public', 'assets', 'fonts');

const CONCURRENCY = 4;
const PAGE_TIMEOUT_MS = 60_000;

const escapeHtml = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// The slug doubles as the public file name; a few Contentful slugs carry a
// trailing slash, which the website normalizes away too.
const normalizeSlug = (slug) => String(slug).replace(/\/+$/, '');

const fileUrl = (p) => 'file://' + p;

function renderMarkdown(markdown, postUrl) {
  // Same converter as BlogPostArticleContent.js, but WITHOUT stripping the
  // https://search-guard.com prefix — inside a PDF, links must stay absolute.
  // The <video/> placeholder some posts contain can't play in a PDF; point
  // the reader at the online version instead.
  const source = String(markdown).replace(
    '<video/>',
    `\n\n*Watch the video in the [online version of this article](${postUrl}).*\n\n`
  );
  const html = ReactDOMServer.renderToStaticMarkup(compiler(source));

  // Body images ship at their original Contentful resolution; embedded
  // as-is they push image-heavy posts past Cloudflare Pages' 25 MiB
  // per-file limit. Ask Contentful's image API for a downscaled JPEG
  // instead (parameters only appended where the URL has none yet).
  return html.replace(
    /(src="(?:https?:)?\/\/images\.ctfassets\.net\/[^"?]+)"/g,
    '$1?fm=jpg&w=1000&q=75"'
  );
}

function buildHeaderFooter(logoSvg) {
  // Header/footer templates cannot load external resources; the logo is
  // inlined as SVG markup, recolored from white to the brand primary.
  const logo = logoSvg
    .replace(/<\?xml[^>]*\?>\s*/, '')
    .replace(/#fff\b/g, '#184962')
    .replace('<svg ', '<svg style="height:16px;width:auto;" ');

  const headerTemplate = `
    <div style="width:100%; margin:0 40px; padding-bottom:6px;
                border-bottom:1px solid #E8ECED;">${logo}</div>`;

  const footerTemplate = `
    <div style="width:100%; margin:0 40px; font-size:7.5pt; color:#63737E;
                font-family:Helvetica,Arial,sans-serif; display:flex;
                justify-content:space-between; align-items:baseline;
                border-top:1px solid #E8ECED; padding-top:6px;">
      <span>© ${new Date().getFullYear()} floragunn GmbH · search-guard.com</span>
      <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
    </div>`;

  return { headerTemplate, footerTemplate };
}

async function launchBrowser() {
  const args = ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'];
  try {
    // CI and any machine where `npx puppeteer browsers install chrome` ran.
    return await puppeteer.launch({ headless: 'new', args });
  } catch (err) {
    // Local fallback: use the system Chrome instead of a downloaded one.
    return await puppeteer.launch({ headless: 'new', channel: 'chrome', args });
  }
}

async function main() {
  if (process.env.SKIP_PDFS === '1') {
    console.log('⏭  SKIP_PDFS=1 — skipping blog PDF generation');
    return;
  }

  let posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));

  // PDF_LIMIT=n renders only the first n posts — for template iterations
  // only; the full run's count gate is skipped in that case.
  const limit = parseInt(process.env.PDF_LIMIT || '0', 10);
  if (limit > 0) posts = posts.slice(0, limit);
  const template = fs.readFileSync(TEMPLATE_FILE, 'utf8');
  const logoSvg = fs.readFileSync(LOGO_FILE, 'utf8');
  const { headerTemplate, footerTemplate } = buildHeaderFooter(logoSvg);

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sg-blog-pdfs-'));

  const fonts = {
    '{{FONT_REGULAR}}': fileUrl(path.join(FONTS_DIR, 'Inter-Regular.ttf')),
    '{{FONT_SEMIBOLD}}': fileUrl(path.join(FONTS_DIR, 'Inter-SemiBold.ttf')),
    '{{FONT_BOLD}}': fileUrl(path.join(FONTS_DIR, 'Inter-Bold.ttf')),
  };

  const jobs = posts.map((post) => {
    const f = post.fields;
    const slug = normalizeSlug(f.slug);
    const postUrl = `https://search-guard.com/blog/${slug}/`;
    const heroUrl = `https:${f.postImage.fields.file.url}?fm=jpg&w=1200&q=75`;

    let html = template
      .replace('{{TITLE}}', escapeHtml(f.title))
      .replace('{{AUTHOR}}', escapeHtml(f.author))
      .replace('{{DATE}}', escapeHtml(f.date))
      .replace('{{HERO_IMG}}', escapeHtml(heroUrl))
      .replace('{{BODY}}', renderMarkdown(f.postContent, postUrl))
      .replace(/{{POST_URL}}/g, escapeHtml(postUrl));
    for (const [token, url] of Object.entries(fonts)) {
      html = html.replace(token, url);
    }

    const htmlFile = path.join(tmpDir, `${slug}.html`);
    fs.writeFileSync(htmlFile, html);
    return { slug, htmlFile, pdfFile: path.join(OUT_DIR, `${slug}.pdf`) };
  });

  const browser = await launchBrowser();
  const started = Date.now();
  let done = 0;
  const failures = [];

  async function renderJob(job, attempt = 1) {
    const page = await browser.newPage();
    try {
      // file:// pages may load their file:// fonts and remote images; the
      // hero image comes from images.ctfassets.net over the network.
      await page.goto(fileUrl(job.htmlFile), {
        waitUntil: 'networkidle0',
        timeout: PAGE_TIMEOUT_MS,
      });
      await page.pdf({
        path: job.pdfFile,
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate,
        footerTemplate,
        margin: { top: '70px', bottom: '70px', left: '48px', right: '48px' },
      });
      done += 1;
      if (done % 25 === 0) console.log(`  ${done}/${jobs.length} PDFs ...`);
    } catch (err) {
      if (attempt < 2) {
        await page.close().catch(() => {});
        return renderJob(job, attempt + 1);
      }
      failures.push({ slug: job.slug, error: err.message });
    } finally {
      await page.close().catch(() => {});
    }
  }

  // Simple worker pool.
  const queue = [...jobs];
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (queue.length) {
        const job = queue.shift();
        await renderJob(job);
      }
    })
  );

  await browser.close();
  fs.rmSync(tmpDir, { recursive: true, force: true });

  if (failures.length) {
    console.error(`✗ ${failures.length} PDF(s) failed:`);
    for (const f of failures) console.error(`  - ${f.slug}: ${f.error}`);
    process.exit(1);
  }

  const written = fs.readdirSync(OUT_DIR).filter((n) => n.endsWith('.pdf'));
  if (limit === 0 && written.length !== posts.length) {
    console.error(`✗ Expected ${posts.length} PDFs, found ${written.length} in ${OUT_DIR}`);
    process.exit(1);
  }

  const secs = ((Date.now() - started) / 1000).toFixed(0);
  console.log(`🙂 Generated ${written.length} blog PDFs in ${secs}s -> out/downloads/blog/`);
}

main().catch((err) => {
  console.error('✗ Blog PDF generation failed:', err);
  process.exit(1);
});
