// const handler = require('serve-handler');
// const http = require('http');
const fetch = require('node-fetch');
const fs = require('fs');

const setRedirectRule = (oldUrl, newUrl, urlStatus) => {
  if (oldUrl && newUrl && urlStatus) {
    if (urlStatus.gs$cell.inputValue !== 'Good') {
      return {
        source: `${oldUrl.gs$cell.inputValue}`,
        destination: `${newUrl.gs$cell.$t}`,
        type: 301,
      };
    }
    return {
      source: `${oldUrl.gs$cell.inputValue}`,
      destination: `${oldUrl.gs$cell.inputValue}`,
      type: 301,
    };
  }
};

const buildOptions = async res => {
  const resEntries = await res.feed.entry;
  const entryListLength = await res.feed.entry[res.feed.entry.length - 1]
    .gs$cell.row;
  const redirectRules = [];
  const rules = await resEntries.forEach(async (entry, index) => {
    if (index <= entryListLength) {
      const oldUrl = await resEntries.filter(
        entry => entry.gs$cell.col === '1' && entry.gs$cell.row === `${index}`,
      )[0];
      const urlStatus = await resEntries.filter(
        entry => entry.gs$cell.col === '8' && entry.gs$cell.row === `${index}`,
      )[0];
      const newUrl = await resEntries.filter(
        entry => entry.gs$cell.col === '12' && entry.gs$cell.row === `${index}`,
      )[0];

      redirectRules.push(setRedirectRule(oldUrl, newUrl, urlStatus));
    }
  });
  return redirectRules;
};

const startServer = async res => {
  const options = await buildOptions(res);
  fs.writeFileSync('redirects.json', JSON.stringify(options));
  // const arry = options.redirects;
  // console.log('options', arry.length);
  // const server = http.createServer((request, response) => {
  //   return handler(request, response, options);
  // });

  // const port = process.env.PORT || 4444;
  // server.listen(port, () => {
  //   console.log(`Running at http://localhost:${port}`);
  // });
};

fetch(
  'https://spreadsheets.google.com/feeds/cells/1U_TbyRqBf6wbRXzGa63in5LexHiCKzkUWPWnqb9FbgY/2/public/full?alt=json',
)
  .then(response => response.json())
  .then(res => startServer(res));
