const contentful = require('contentful');
const fs = require('fs');

const client = contentful.createClient({
  // space: process.env.REACT_APP_CONTENTFUL_SPACE,
  // accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
  space: 'mdpbh289a0mx',
  accessToken:
    'ts3-M4yqLGqXCjDvYPL8UZfQES4gZC06lW3efVPKQNg',
});

const fetchWhitepapers = async () => {
  await client
    .getEntries({ content_type: 'topBanner' })
    .then((res, err) => {
      fs.writeFile(
        './src/Api/pagecontent/topBanner.json',
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

fetchWhitepapers();
