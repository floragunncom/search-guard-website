const puppeteer = require('puppeteer');
const MarkdownIt = require('markdown-it');
const fs = require("fs");
const path = require('path');

const jsonPath = path.join(__dirname, './contentfulPosts.json');
const outputDirectory = path.join(__dirname, "../../public/downloads/blogposts/");

console.log("Output directory: "+outputDirectory);

// load our custom fonts
function loadFont(fontPath) {
    const font = fs.readFileSync(fontPath);
    return font.toString('base64');
}

// Read your font files
const INTER_BASE64 = loadFont(path.join(__dirname, '../../public/assets/fonts/Inter-Regular.ttf'));
const PARAFINA_BASE64 = loadFont(path.join(__dirname, '../../public/assets/fonts/Parafina-BlackS.otf'));

// Define the default template
const template = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
  
    @font-face {
      font-family: 'Parafina-SemiWideXBold';
      src: url('data:font/woff2;base64,${PARAFINA_BASE64}') format('otf');
      font-weight: normal;
      font-style: normal;
    }

    @font-face {
      font-family: 'Inter-Regular';
      src: url('data:font/woff2;base64,${INTER_BASE64}') format('ttf');
      font-weight: bold;
      font-style: normal;
    }
  
    @page {
      size: A4;
      margin: 2cm;
    }
    
    body {
      font-family: 'Inter-Regular', 'Arial', sans-serif;
      line-height: 1.6;
      max-width: 21cm; /* A4 width */
      margin: 0 auto;
      padding: 0cm;
      color: #184962;
    }
    
    h1 { 
      font-family: 'Inter-Parafina-SemiWideXBold', 'Arial', sans-serif;      
    }
    
    h2 { 
      font-family: 'Inter-Parafina-SemiWideXBold', 'Arial', sans-serif;
    }
    
    h3 { 
      font-family: 'Inter-Parafina-SemiWideXBold', 'Arial', sans-serif;
    }    
    
    h1:first-of-type {
      page-break-before: avoid;
    }
    a {
      color: #184962;
      text-decoration: underline;
    }
    pre {      
      padding: 1em;
      border-radius: 4px;
      overflow-x: auto;
      background-color: #E8ECED;
      font-size: 12px;
    }
    code {
      font-family: 'Courier New', monospace;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1em 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    img {
      max-width: 100%;
      height: auto;
    }
  </style>
</head>
<body>
    <div>
     <h1>{{title}}</h1>
    </div>
    <div>
       <img src="{{postImage}}" style="max-width: 100%; height: auto;"/>
    </div>
  {{content}}
</body>
</html>
`;
// used for debugging only
async function debugImages(page) {
    const failedImages = await page.evaluate(() => {
        const images = Array.from(document.getElementsByTagName('img'));
        return images.map(img => ({
            src: img.src,
            complete: img.complete,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight
        }));
    });

    console.log('Image loading status:', failedImages);
}

class MarkdownPDFConverter {
    constructor(options = {}) {
        this.md = new MarkdownIt({
            html: true,
            breaks: true,
            linkify: true,
            typographer: true,
            ...options.markdownOptions
        });

        this.template = options.template || template;
        this.browser = null;
    }

    async initialize() {
        // Launch browser with specific permissions for loading remote content
        this.browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--allow-external-pages',
                '--allow-running-insecure-content',
                '--disable-web-security',  // Add this
                '--disable-features=IsolateOrigins,site-per-process'
            ]
        });
    }

    async convert() {
        console.log("Ininitalizing headless chrome");
        if (!this.browser) {
            await this.initialize();
        }

        try {

            const data = await new Promise((resolve, reject) => {
                console.log("reading blogpost file with path " + jsonPath);
                fs.readFile(jsonPath, 'utf8', (err, data) => {
                    console.log("finished reading blogpost file with path " + jsonPath);
                    if (err) return reject(err);
                    const result = resolve(data);
                    console.log("read blogpost file with result " + result);
                });
            });
            console.log("Read all blogposts from JSON file");

            const markdownFiles = JSON.parse(data);
            console.log("Converted String to JSON object");

            // Process each entry
            const results = await Promise.all(
                markdownFiles.map(article => {
                    const filename = article.fields.slug.substring(0, article.fields.slug.length - 1) + ".pdf";
                    return this.convertArticle(article, outputDirectory, filename);
                })
            );

            return results;
        } finally {
            await this.close();
        }
    }

    async convertArticle(article, outputDirectory, filename) {

        const outputFile = outputDirectory + filename;

        try {
            let markdown = article.fields.postContent;
            const postImage = "https:" + article.fields.postImage.fields.file.url;

            // we need a URL starting with http(s) for images. In Contentful,
            // images are represented like: //images.ctfassets.net/.../Slack_Notification_inside_Watch.png
            // Change the URLs globally in the document
            markdown = markdown.replace(/\/\/images.ctfassets.net/g, "https://images.ctfassets.net");

            // remove unprocessable video tags
            markdown = markdown.replace(/<video\/>/g, "");

            const html = this.md.render(markdown);
            const finalHtml = this.template
                .replace('{{content}}', html)
                .replace('{{postImage}}', postImage)
                .replace('{{title}}', article.fields.title);

            // debugging
            const outputFileHtml = outputDirectory + filename + ".html";
            await fs.promises.writeFile(outputFileHtml, finalHtml, 'utf8');
            console.log("Created HTML file at " + outputFileHtml);
            const page = await this.browser.newPage();

            // Set longer timeout for loading images
            await page.setDefaultNavigationTimeout(30000);
            await page.setDefaultTimeout(30000);

            // Enable loading of remote resources
            await page.setBypassCSP(true);

            // Add viewport settings to ensure proper image rendering
            await page.setViewport({
                width: 1200,
                height: 800,
                deviceScaleFactor: 1,
            });

            // Enable request logging
/*            page.on('request', request => {
                console.log('Request:', request.url());
            });

            page.on('requestfailed', request => {
                console.log('Failed request:', request.url(), request.failure().errorText);
            });*/

            // Wait for network idle to ensure images are loaded
            await page.setContent(finalHtml, {
                waitUntil: ['networkidle0', 'load', 'domcontentloaded'],
                timeout: 30000
            });

            // Wait for fonts to load
            await page.evaluate(async () => {
                await document.fonts.ready;
            });

            // Debug images before proceeding
            await debugImages(page);

            // Wait for all images to load and set page breaks
            await page.evaluate(async () => {
                const selectors = Array.from(document.getElementsByTagName('img'));
                await Promise.all(selectors.map(img => {
                    if (img.complete) return;
                    return new Promise((resolve, reject) => {
                        img.addEventListener('load', resolve);
                        img.addEventListener('error', () => {
                            console.warn(`Failed to load image: ${img.src}`);
                            resolve(); // Resolve anyway to continue processing
                        });
                    });
                }));

                const content = document.body;
                const pageHeight = 1000; // Approximate height of A4 page in pixels
                let currentHeight = 0;

                // Walk through all elements
                content.childNodes.forEach(node => {
                    if (node.offsetHeight) {
                        currentHeight += node.offsetHeight;

                        // If content exceeds page height, add page break
                        if (currentHeight > pageHeight) {
                            const breakDiv = document.createElement('div');
                            breakDiv.className = 'page-break-before';
                            node.parentNode.insertBefore(breakDiv, node);
                            currentHeight = node.offsetHeight;
                        }
                    }
                });

            });

            await page.pdf({
                path: outputFile,
                format: 'A4',
                printBackground: true,
                displayHeaderFooter: true,
                headerTemplate: this.createHeader(article),
                footerTemplate: this.createFooter(),
                margin: {
                    top: '2cm',
                    bottom: '2cm',
                    left: '2cm',
                    right: '2cm'
                }
            });

            await page.close();
            return {
                output: outputFile,
                success: true
            };
        } catch (error) {
            return {
                output: outputFile,
                success: false,
                error: error.message
            };
        }
    }

    createHeader(article) {
        return `
      <div style="
        font-size: 10px;
        padding: 10px 20px;
        border-bottom: 1px solid #ddd;
        width: 100%;
        text-align: center;
        background-color: #184962;
        -webkit-print-color-adjust: exact;  /* Required for background colors in headers/footers */
        color: white;        
        font-family: 'Inter-Parafina-SemiWideXBold', 'Arial', sans-serif;
      ">
        ${article.fields.title} Lalala
      </div>
    `;
    }

    createFooter(article) {
        return `
      <div style="
        font-size: 10px;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 40px;
        background-color: #f0f0f0;
        -webkit-print-color-adjust: exact;
        position: relative;
        bottom: 0;
        display: flex;           /* Add flex display */
        justify-content: space-between;  /* Space between items */
        align-items: center;     /* Center items vertically */
      ">
        <span style="margin-left: 20px;">
          ${article.fields.slug}
        </span>
        <span style="margin-right: 20px;">
          Page <span class="pageNumber"></span> of <span class="totalPages"></span>
        </span>
      </div>
    `;
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }
}

// Usage example:
const converter = new MarkdownPDFConverter({
    markdownOptions: {
        // Add custom markdown-it options
    }
});

converter.convert()
    .then(results => {
        console.log('Conversion completed:', results);
    })
    .catch(error => {
        console.error('Conversion failed:', error);
    });