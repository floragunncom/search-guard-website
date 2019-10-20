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
    { source: '/no-nonsense-it/', destination: '/company/', type: 301 },
    { source: '/grownow/', destination: '/company/', type: 301 },
    { source: '/downloads*', destination: '/', type: 301 },
    { source: '/kunstlerfreunde/', destination: '/company/', type: 301 },
    { source: '/our-services*', destination: '/company/', type: 301 },
    { source: '/search-guard*', destination: '/company/', type: 301 },
    { source: '/elastic*', destination: '/', type: 301 },
    { source: '/document*', destination: '/', type: 301 },
    { source: '/searchguard*', destination: '/company/', type: 301 },
    { source: '/category*', destination: '/blog/', type: 301 },
    { source: '/blog/page*', destination: '/blog/', type: 301 },
    { source: '/product/?*', destination: '/product/', type: 301 },
    { source: '/immutable*', destination: '/', type: 301 },
    { source: '/oxy*', destination: '/', type: 301 },
    { source: '/careers*', destination: '/contacts/', type: 301 },
    { source: '/author*', destination: '/blog/', type: 301 },
    { source: '/wp-*', destination: '/', type: 301 },
    { source: '/education-program/', destination: '/product/', type: 301 },
    { source: '/tls-certificate-generator*', destination: '/tls-certificate-generator/', type: 301 },
    { source: '/https://search-guard.herokuapp.com/security-in-distributed-systems/', destination: '/company/', type: 301 },

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
