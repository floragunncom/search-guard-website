const handler = require('serve-handler');
const http = require('http');
const data = require('./data/redirects.json');

const port = process.env.PORT || 4444;

const redirectRules = data.filter(redirect => redirect !== null);
redirectRules.map(link => {
  link.source = link.source.replace(/^(.*?)com/, '');
  link.destination = link.destination.replace(/^(.*?)com/, '');
});

const options = {
  public: './build',
  redirects: [],
};
const server = http.createServer((request, response) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/zeit/serve-handler#options
  return handler(request, response, options);
});

server.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
