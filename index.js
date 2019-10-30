const handler = require('serve-handler');
const http = require('http');
const fetch = require('node-fetch');

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
  const entryListLength = await res.feed.entry[res.feed.entry.length - 1].gs$cell.row;
  const redirectRules = [];
  const rules = await resEntries.forEach(async (entry, index) => {
    if (index <= entryListLength) {
      const oldUrl = await resEntries.filter(entry => entry.gs$cell.col === '1' && entry.gs$cell.row === `${index}`)[0];
      const urlStatus = await resEntries.filter(entry => entry.gs$cell.col === '8' && entry.gs$cell.row === `${index}`)[0];
      const newUrl = await resEntries.filter(entry => entry.gs$cell.col === '12' && entry.gs$cell.row === `${index}`)[0];

      redirectRules.push(setRedirectRule(oldUrl, newUrl, urlStatus));
    }
  });
  return { public: './build', redirects: redirectRules };
};

const startServer = async res => {
  const options = await buildOptions(res);
  const server = http.createServer((request, response) => {
    return handler(request, response, options);
  });

  const port = process.env.PORT || 4444;
  server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
  });
};

fetch('https://spreadsheets.google.com/feeds/cells/1U_TbyRqBf6wbRXzGa63in5LexHiCKzkUWPWnqb9FbgY/2/public/full?alt=json')
  .then(response => response.json())
  .then(res => startServer(res));

// const options = {
//   public: './build',
//   redirects: [
//     // { source: '/partners*', destination: '/company#partners', type: 301 },
//     // { source: '/company/?*', destination: '/company/', type: 301 },
//     // { source: '/faq-2*', destination: '/faq/', type: 301 },
//     // { source: '/integrators*', destination: '/product#integrators', type: 301 },
//     // { source: '/*/licencia*', destination: '/licensing/', type: 301 },
//     // {
//     //   source: '/integradores*',
//     //   destination: '/product#integrators',
//     //   type: 301,
//     // },
//     // { source: '/**/?lang=*', destination: '/', type: 301 },
//     // {
//     //   source: '/collaborators*',
//     //   destination: '/product#integrators',
//     //   type: 301,
//     // },
//     // { source: '/floragunn-page/', destination: '/company/', type: 301 },
//     // { source: '/no-nonsense-it/', destination: '/company/', type: 301 },
//     // { source: '/grownow/', destination: '/company/', type: 301 },
//     // { source: '/downloads*', destination: '/', type: 301 },
//     // { source: '/kunstlerfreunde/', destination: '/company/', type: 301 },
//     // { source: '/our-services*', destination: '/company/', type: 301 },
//     // // { source: '/search-guard*', destination: '/company/', type: 301 },
//     // // { source: '/elastic*', destination: '/', type: 301 },
//     // { source: '/document*', destination: '/', type: 301 },
//     // // { source: '/searchguard*', destination: '/company/', type: 301 },
//     // { source: '/category*', destination: '/blog/', type: 301 },
//     // { source: '/blog/page*', destination: '/blog/', type: 301 },
//     // { source: '/product/?*', destination: '/product/', type: 301 },
//     // // { source: '/?*', destination: '/', type: 301 },
//     // // { source: '/**/?utm**', destination: '/', type: 301 },
//     // { source: '/immutable*', destination: '/', type: 301 },
//     // { source: '/oxy*', destination: '/', type: 301 },
//     // { source: '/careers*', destination: '/contacts/', type: 301 },
//     // { source: '/contact*', destination: '/contacts/', type: 301 },
//     // { source: '/author*', destination: '/blog/', type: 301 },
//     // { source: '/tag*', destination: '/blog/', type: 301 },
//     // { source: '/7171-2/?lang=fr', destination: '/', type: 301 },
//     // { source: '/fr*', destination: '/', type: 301 },
//     // { source: '/es*', destination: '/', type: 301 },
//     // { source: '/wp-*', destination: '/', type: 301 },
//     // { source: '/education-program/', destination: '/product/', type: 301 },
//     // {
//     //   source: '/generador-de-certificados-tls*',
//     //   destination: '/tls-certificate-generator/',
//     //   type: 301,
//     // },
//     // {
//     //   source: '/tls-certificate-generator*',
//     //   destination: '/tls-certificate-generator/',
//     //   type: 301,
//     // },
//     // {
//     //   source:
//     //     '/https://search-guard.herokuapp.com/security-in-distributed-systems/',
//     //   destination: '/company/',
//     //   type: 301,
//     // },
//   ],
// };
