const handler = require('serve-handler');
const http = require('http');
const data = require('./data/redirects.json');

const port = process.env.PORT || 4444;

const redirectRules = data.filter(redirect => redirect !== null);
redirectRules.map(link => link.source = link.source.slice(-1) === '/' ? link.source.slice(0, link.source.length -1) : link.source);
const options = {
  public: './build',
  redirects: redirectRules,
};
console.log('options', options)
const server = http.createServer((request, response) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/zeit/serve-handler#options
  return handler(request, response, options);
});

server.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
