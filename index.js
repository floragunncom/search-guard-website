const handler = require('serve-handler');
const http = require('http');

const port = process.env.PORT || 4444;
const options = {
  public: './build',
  redirects: [
    { source: '/partners', destination: '/company#partners', type: 301 },
    { source: '/integrators', destination: '/product#integrators', type: 301 },
    { source: '/collaborators', destination: '/product#integrators', type: 301 },
    { source: '/floragunn-page/', destination: '/company/', type: 301 },
    { source: '/grownow/', destination: '/company/', type: 301 },
    { source: '/kunstlerfreunde/', destination: '/company/', type: 301 },
    { source: '/our-services*', destination: '/company/', type: 301 },
    { source: '/search-guard*/', destination: '/company/', type: 301 },
    { source: '/searchguard*/', destination: '/company/', type: 301 },
    // { source: '/search-guard-public-key/', destination: '/company/', type: 301 },
    // { source: '/search-guard-tools-tutorials/', destination: '/company/', type: 301 },
    // { source: '/searchguard_concepts/', destination: '/company/', type: 301 },
    // { source: '/searchguard_doc_*/', destination: '/company/', type: 301 },
    // { source: '/searchguard-ssl-support/', destination: '/company/', type: 301 },
    { source: '/category*', destination: '/blog/', type: 301 },
    { source: '/author*', destination: '/blog/', type: 301 },
  ],
};

const server = http.createServer((request, response) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/zeit/serve-handler#options
  return handler(request, response, options);
});

server.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
