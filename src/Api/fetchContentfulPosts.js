const contentful = require('contentful');
const fs = require('fs');

const client = contentful.createClient({
  // space: process.env.REACT_APP_CONTENTFUL_SPACE,
  // accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
  space: '95di84mqkkro',
  accessToken:
    'e374194597d1e72907428441d7ffe9f2ef9486dc92b23a733d9ca02d87e4da3c',
});

const fetchPosts = async () => {
  await client
    .getEntries({ content_type: 'post', order: '-fields.date' })
    .then((res, err) => {
      fs.writeFile(
        './src/Api/contentfulPosts.json',
        JSON.stringify(res.items),
        error => {
          if (error) throw err;
        },
      );
    });
};

fetchPosts();
