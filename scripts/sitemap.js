#!/usr/bin/env node

// based on: @leadhome/react-snap-sitemap
// https://www.npmjs.com/package/@leadhome/react-snap-sitemap
// License: MIT license

const { readdir, writeFile, lstat } = require('fs');
const { promisify } = require('util');
const path = require('path');
const args = process.argv;

const preFormattedBaseUrl = args.find((arg) => arg.startsWith('--base-url='));
const exclusionList = args.find((arg) => arg.startsWith('--black-list='));
const preFormattedChangeFrequency = args.find((arg) => arg.startsWith('--change-frequency='));
const preFormattedOutDir = args.find((arg) => arg.startsWith('--out-dir='));
const NON_DEFAULT_LOCALES = ['de', 'es', 'fr'];
const baseBlackList = [
    'https://search-guard.com/heise/',
    'https://search-guard.com/thanks/',
    'https://search-guard.com/error/',
    'https://search-guard.com/security-for-elasticsearch/',
    'https://search-guard.com/elasticsearch-kibana-security/',
    'https://search-guard.com/tls-certificate-generator/',
    'https://search-guard.com/blog/page/1/',
];
// Generate locale variants of blacklisted URLs for localizable pages
let blackList = [
    ...baseBlackList,
    ...NON_DEFAULT_LOCALES.flatMap((locale) =>
        baseBlackList
            .filter((url) => !url.includes('/blog/'))
            .map((url) => url.replace('https://search-guard.com/', `https://search-guard.com/${locale}/`))
    ),
];
const stripWrappingQuotes = (value) => {
    if (!value) {
        return value;
    }
    return value.replace(/^['"]|['"]$/g, '');
};

const outDir = stripWrappingQuotes(preFormattedOutDir ? preFormattedOutDir.split('=')[1] : 'dist');

if (exclusionList) {
    let params = stripWrappingQuotes(exclusionList.split('=')[1]);
    blackList = params.split(',');
    console.log('👋 Exluding URLs:', blackList.join(', '))
}

let baseUrl;

if (preFormattedBaseUrl) {
    baseUrl  = stripWrappingQuotes(preFormattedBaseUrl.split('=')[1]);
} else {
    throw (new Error('Missing valid --base-url command line argument'));
}

if (baseUrl.length === 0) {
    throw (new Error('Pass a valid url to --base-url'));
}

let changeFrequency;

if (preFormattedChangeFrequency) {
    changeFrequency  = stripWrappingQuotes(preFormattedChangeFrequency.split('=')[1]);
} else {
    changeFrequency = 'monthly';
}

const asyncReaddir = promisify(readdir), asyncWriteFile = promisify(writeFile), asyncLStat = promisify(lstat);

const escapeXml = (value) =>
    String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

let allRoots = [];

const PRODUCT_HIGH_PRIORITY_PATHS = new Set([
    '/security/',
    '/alerting/',
    '/licensing/',
    '/search-guard-flx/',
    '/search-guard-free-trial/',
    '/encryption-at-rest/',
]);

const LEGAL_UTILITY_PATH_PREFIXES = [
    '/impressum/',
    '/datenschutz/',
    '/dataprotection/',
    '/security-information/',
    '/disclosure-policy/',
    '/cve-advisory/',
    '/sitemap/',
    '/404/',
];

const resolvePriority = (url) => {
    let pathname;
    try {
        pathname = new URL(url).pathname;
    } catch (error) {
        return '0.5';
    }

    let normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;

    // Strip locale prefix for priority resolution
    const localeMatch = normalizedPath.match(/^\/(de|es|fr)\//);
    if (localeMatch) {
        normalizedPath = normalizedPath.slice(localeMatch[1].length + 1) || '/';
    }

    if (normalizedPath === '/') {
        return '1.0';
    }

    if (PRODUCT_HIGH_PRIORITY_PATHS.has(normalizedPath)) {
        return '0.8';
    }

    if (
        normalizedPath.startsWith('/blog/page/') ||
        normalizedPath.startsWith('/blog/category/') ||
        normalizedPath.startsWith('/author/') ||
        normalizedPath === '/authors/'
    ) {
        return '0.3';
    }

    if (LEGAL_UTILITY_PATH_PREFIXES.some((prefix) => normalizedPath.startsWith(prefix))) {
        return '0.2';
    }

    if (normalizedPath.startsWith('/blog/')) {
        return '0.6';
    }

    return '0.6';
};

const readSite = async (dir) => {
    const directory = await asyncReaddir(dir, { withFileTypes: true });

    await asyncForEach(directory, async fileOrDirectory => {
        let path = fileOrDirectory;

        if (typeof fileOrDirectory === 'object') {
            path = fileOrDirectory.name;
        }

        if (path === '404') {
            return;
        }

        const root = `${dir}/${path}`;

        const stat = await asyncLStat(root);

        if (stat.isDirectory()) {
            await readSite(root);
        } else if (path === 'index.html') {
            allRoots = [
                ...allRoots,
                {
                    root,
                    lastmod: stat.mtime.toISOString(),
                },
            ];
        }
    });
}

(async () => {
    await readSite(outDir);

    const toTrailingSlashUrl = (url) => (url.endsWith('/') ? url : `${url}/`);
    const normalizedBlackList = new Set(blackList.map((url) => toTrailingSlashUrl(url.trim())));
    const sitemapEntriesByUrl = new Map();
    allRoots.forEach((entry) => {
        const rawUrl = entry.root.replace(`${outDir}/`, baseUrl).replace('/index.html', '');
        const url = toTrailingSlashUrl(rawUrl);
        if (normalizedBlackList.has(url)) {
            return;
        }

        const current = sitemapEntriesByUrl.get(url);
        if (!current || new Date(entry.lastmod) > new Date(current.lastmod)) {
            sitemapEntriesByUrl.set(url, { url, lastmod: entry.lastmod });
        }
    });

    const uniqueUrls = Array.from(sitemapEntriesByUrl.keys());

    const urlEntries = Array.from(sitemapEntriesByUrl.values())
        .sort((a, b) => a.url.length - b.url.length)
        .map((entry) => {
            const changefreqTag = changeFrequency
                ? `\n    <changefreq>${escapeXml(changeFrequency)}</changefreq>`
                : '';
            const lastmodTag = entry.lastmod
                ? `\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`
                : '';
            const priority = resolvePriority(entry.url);
            return `  <url>\n    <loc>${escapeXml(entry.url)}</loc>${lastmodTag}${changefreqTag}\n    <priority>${priority}</priority>\n  </url>`;
        });

    const htmlSitemapUrl = toTrailingSlashUrl(`${baseUrl.replace(/\/$/, '')}/sitemap`);
    if (!uniqueUrls.includes(htmlSitemapUrl) && !normalizedBlackList.has(htmlSitemapUrl)) {
        urlEntries.push(
            '  <url>\n' +
            `    <loc>${escapeXml(htmlSitemapUrl)}</loc>\n` +
            '    <changefreq>monthly</changefreq>\n' +
            `    <priority>${resolvePriority(htmlSitemapUrl)}</priority>\n` +
            '  </url>'
        );
    }

    const sitemap =
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        `${urlEntries.join('\n')}\n` +
        '</urlset>\n';

    const sitemapPath = path.resolve(process.cwd(), outDir, 'sitemap.xml');
    await asyncWriteFile(sitemapPath, sitemap);

    console.log(`🙂 Successfully built sitemap.xml: ${sitemapPath}`);
})();
