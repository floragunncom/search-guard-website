const algoliasearch = require('algoliasearch');
const fs = require("fs");
const path = require('path');
const {readFile} = require('fs').promises;

// Extract command-line arguments (skip the first two default arguments)
const args = process.argv.slice(2);

// Parse the arguments into a key-value object
const parsedArgs = Object.fromEntries(args.map(arg => {
    const [key, value] = arg.split('=');
    return [key.replace('--', ''), value];
}));

// Assign the variables
const ALGOLIA_APP_ID = parsedArgs.ALGOLIA_APP_ID;
const ALGOLIA_API_KEY = parsedArgs.ALGOLIA_API_KEY;
const ALGOLIA_BLOG_INDEX = "blogposts";
// force reindex of blogposts even if unchanged
const FORCE = parsedArgs.FORCE;

const algoliaClient = algoliasearch.algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

const filePath = path.join(__dirname, './contentfulPosts.json');

// Helper function to remove Markdown formatting from a string
function removeMarkdownFormatting(markdown) {
    return markdown.replace(/\*\*|\*|_|`|~|\[.*?\]\(.*?\)/g, '').trim();
}

async function indexBlogPosts() {

    const data = await new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });

    // Only index new and unchanged blogposts
    const now = new Date();

    try {
        // Parse the JSON array from the file
        const jsonArray = JSON.parse(data);

        // Iterate over all items in the array
        for (const item of jsonArray) {
            if (item.fields.postContent) {

                // Only index new and unchanged blogposts
                const dateFromField = new Date(item.sys.updatedAt);

                if (dateFromField < now && !FORCE) {
                    console.log("Skipping unchanged blogpost: " + item.fields.title);
                    continue;
                }

                // first delete all paragraphs (documents) that belong to this blogpost
                // this makes sure that we do not end up with dups even
                // if the blogpost (and especially the h2) changes
                const deleteResponse = await algoliaClient.deleteBy({
                    indexName: ALGOLIA_BLOG_INDEX,
                    deleteByParams: {filters: `postID:${item.sys.id}`},
                });

                const postContent = item.fields.postContent;

                // Split the Markdown string into paragraphs based on "##" (h2)
                const paragraphs = postContent.split(/(?=^##\s)/m);

                for (const paragraph of paragraphs) {
                    // Extract the content of the h2
                    const h2Match = paragraph.match(/^##\s*(.+)$/m);

                    if (h2Match) {
                        const h2Content = h2Match[1].trim(); // Remove "##" and trim spaces

                        // Remove the h2 line from the paragraph and clean the rest
                        const restOfParagraph = paragraph
                            .replace(/^##\s*.+$/m, '')
                            .trim();

                        const cleanedParagraph = removeMarkdownFormatting(restOfParagraph);

                        const objectID = item.sys.id;

                        const unique_hierarchy = item.fields.title + " > " + h2Content;

                        const entry = {
                            postID: item.sys.id,
                            h1: item.fields.title,
                            h2: h2Content,
                            tags: item.fields.tags,
                            slug: item.fields.slug,
                            unique_hierarchy: unique_hierarchy,
                            published: item.fields.date,
                            updated: item.sys.updatedAt,
                            text_all: cleanedParagraph,
                        }

                        const indexResult = await algoliaClient.saveObject({
                            indexName: ALGOLIA_BLOG_INDEX,
                            body: entry,
                        });

                        console.log("Indexed " + h2Content + " for blogpost " + item.fields.title);

                    }
                };
            } else {
                console.warn(`Item at index ${index} does not have a "postContent" field.`);
            }
        }
    } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
    }
};

indexBlogPosts();

