const contentful = require('contentful');
const fs = require('fs');

const client = contentful.createClient({
  // space: process.env.REACT_APP_CONTENTFUL_SPACE,
  // accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
  space: 'mdpbh289a0mx',
  accessToken:
    'ts3-M4yqLGqXCjDvYPL8UZfQES4gZC06lW3efVPKQNg',
});

const fetchPageContent = async () => {

    // complete pages
    await client
        .getEntries({ "metadata.tags.sys.id[in]": 'page', include: 3 })
        .then((res, err) => {
            fs.writeFile(
                './src/Api/pagecontent/pages.json',
                JSON.stringify(res.items),
                error => {
                    if (error) {
                        console.log(error)
                        throw err;
                    }
                },
            );
        });

    // page sections
    await client
        .getEntries({ "metadata.tags.sys.id[in]": 'section', include: 3 })
        .then((res, err) => {
            fs.writeFile(
                './src/Api/pagecontent/sections.json',
                JSON.stringify(res.items),
                error => {
                    if (error) {
                        console.log(error)
                        throw err;
                    }
                },
            );
        });
};

fetchPageContent();
