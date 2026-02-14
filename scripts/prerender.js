#!/usr/bin/env node

const { spawn } = require('child_process');
const net = require('net');
const path = require('path');
const fs = require('fs/promises');
const puppeteer = require('puppeteer');
const { getPrerenderRoutes } = require('./prerender-routes');

const DIST_DIR = path.resolve(__dirname, '../dist');
const HOST = '127.0.0.1';
const DEFAULT_PORT = Number(process.env.PRERENDER_PORT || 4173);
const DEFAULT_CONCURRENCY = Number(process.env.PRERENDER_CONCURRENCY || 8);
const PREVIEW_READY_TIMEOUT_MS = 60000;
const ROUTE_READY_TIMEOUT_MS = Number(process.env.PRERENDER_ROUTE_READY_TIMEOUT_MS || 15000);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const findAvailablePort = async (preferredPort) => {
  const tryListen = (port) =>
    new Promise((resolve) => {
      const server = net.createServer();
      server.once('error', () => resolve(null));
      server.once('listening', () => {
        server.close(() => resolve(port));
      });
      server.listen(port, HOST);
    });

  const preferred = await tryListen(preferredPort);
  if (preferred) {
    return preferred;
  }

  const ephemeral = await new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once('error', reject);
    server.listen(0, HOST, () => {
      const address = server.address();
      if (!address || typeof address === 'string') {
        server.close(() => reject(new Error('Could not allocate ephemeral port for prerender')));
        return;
      }

      const { port } = address;
      server.close(() => resolve(port));
    });
  });

  return ephemeral;
};

const waitForServer = async (baseUrl) => {
  const start = Date.now();

  while (Date.now() - start < PREVIEW_READY_TIMEOUT_MS) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) {
        return;
      }
    } catch (_) {
      // noop until preview server becomes reachable
    }

    await sleep(500);
  }

  throw new Error(`Timed out waiting for vite preview on ${baseUrl}`);
};

const writeStaticPage = async (route, html) => {
  const normalizedRoute = route === '/' ? '' : route.replace(/^\//, '').replace(/\/$/, '');
  const targetFile =
    normalizedRoute.length === 0
      ? path.join(DIST_DIR, 'index.html')
      : path.join(DIST_DIR, normalizedRoute, 'index.html');

  await fs.mkdir(path.dirname(targetFile), { recursive: true });
  await fs.writeFile(targetFile, html, 'utf8');
};

const waitForRouteReadySignal = async (page, route) => {
  try {
    await page.waitForFunction(() => window.__PRERENDER_READY__ === true, {
      timeout: ROUTE_READY_TIMEOUT_MS,
      polling: 100,
    });
  } catch (error) {
    let diagnostics = {};

    try {
      diagnostics = await page.evaluate(() => ({
        url: window.location.href,
        readyState: document.readyState,
        title: document.title,
        hasPrerenderReadyFlag: Object.prototype.hasOwnProperty.call(window, '__PRERENDER_READY__'),
        prerenderReadyValue: window.__PRERENDER_READY__,
        titleTagCount: document.head.querySelectorAll('title').length,
        metaDescriptionCount: document.head.querySelectorAll('meta[name="description"]').length,
        canonicalCount: document.head.querySelectorAll('link[rel="canonical"]').length,
        ogTitleCount: document.head.querySelectorAll('meta[property="og:title"]').length,
      }));
    } catch (_) {
      diagnostics = { error: 'Failed to collect page diagnostics' };
    }

    process.stderr.write(
      `[prerender][timeout] Route readiness timed out for ${route}\n${JSON.stringify(diagnostics)}\n`,
    );

    throw new Error(
      `Timed out waiting for __PRERENDER_READY__ on route ${route} after ${ROUTE_READY_TIMEOUT_MS}ms`,
    );
  }
};

const run = async () => {
  const routes = await getPrerenderRoutes();
  const port = await findAvailablePort(DEFAULT_PORT);
  const baseUrl = `http://${HOST}:${port}`;
  const concurrency = Number.isFinite(DEFAULT_CONCURRENCY) && DEFAULT_CONCURRENCY > 0
    ? Math.min(Math.floor(DEFAULT_CONCURRENCY), routes.length || 1)
    : 1;
  const previewServer = spawn(
    process.platform === 'win32' ? 'npx.cmd' : 'npx',
    ['vite', 'preview', '--host', HOST, '--port', String(port), '--strictPort'],
    {
      stdio: 'inherit',
      shell: false,
    },
  );

  let browser;
  try {
    await waitForServer(baseUrl);

    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    process.stdout.write(`Prerendering ${routes.length} routes with concurrency=${concurrency}\n`);

    const setupPageRequestPolicy = async (pageInstance) => {
      await pageInstance.setRequestInterception(true);
      pageInstance.on('request', (request) => {
        const requestUrl = request.url();
        if (requestUrl.startsWith('data:') || requestUrl.startsWith('blob:')) {
          request.continue();
          return;
        }

        try {
          const url = new URL(requestUrl);
          if (url.origin === baseUrl) {
            request.continue();
            return;
          }
        } catch (_) {
          // noop
        }

        request.abort();
      });
    };

    let routeIndex = 0;
    const workers = Array.from({ length: concurrency }, async (_, workerIndex) => {
      const page = await browser.newPage();
      await setupPageRequestPolicy(page);

      try {
        while (routeIndex < routes.length) {
          const currentIndex = routeIndex;
          routeIndex += 1;
          const route = routes[currentIndex];
          const url = `${baseUrl}${route}`;
          process.stdout.write(`[worker ${workerIndex + 1}] Prerendering ${route}\n`);
          await page.goto(url, { waitUntil: 'networkidle2' });
          await waitForRouteReadySignal(page, route);
          const html = await page.content();
          await writeStaticPage(route, html);
        }
      } finally {
        await page.close();
      }
    });

    await Promise.all(workers);

    process.stdout.write(`Prerendered ${routes.length} routes into dist/\n`);
  } finally {
    if (browser) {
      await browser.close();
    }

    previewServer.kill('SIGTERM');
  }
};

run().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exit(1);
});
