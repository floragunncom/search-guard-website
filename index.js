const handler = require('serve-handler');
const http = require('http');

const port = process.env.PORT || 4444;

const options = {
  public: './build',
  redirects: [
    { source: '/floragunn-page', destination: '/company/' },
    { source: '/grownow', destination: '/company/' },
    { source: '/contact', destination: '/contacts/' },
    { source: '/kunstlerfreunde', destination: '/company/' },
    { source: '/our-services/**', destination: '/company/' },
    { source: '/search-guard-elasticsearch-faq', destination: '/company/' },
    { source: '/searchguard_*', destination: '/company/' },
    { source: '/searchguard-ssl*', destination: '/company/' },
    { source: '/security-in-distributed-systems', destination: '/company/' },
    {
      source: '/tls-certificate-generator/上申请密钥。',
      destination: '/company/',
    },
    { source: '/wp-content/**/:id', destination: '/product/' },
    { source: '/wp-includes/**/:id', destination: '/product/' },
    { source: '/no-nonsense-it', destination: '/company/' },
    { source: '/search-guard-customers', destination: '/company/' },
    { source: '/*.zip', destination: '/' },
    { source: '/author/**/:id', destination: '/blog/' },
    { source: '/category/**/:id', destination: '/blog/' },
    { source: '/tag/**/:id', destination: '/blog/' },
    { source: '/blog/page/**/:id', destination: '/blog/' },
    { source: '/immutable-indices-gdpr/**', destination: '/' },
    { source: '/oxy_testimonial/arno-has', destination: '/' },
    { source: '/oxy_testimonial/yasvanth-babu', destination: '/' },
    { source: '/careers', destination: '/' },
    { source: '/elastic-floragunn-dmca*', destination: '/' },
    {
      source:
        '/https://search-guard.com/elasticsearch-anonymous-authentication',
      destination: '/blog/',
    },
    { source: '/elasticsearch-kibana-security', destination: '/blog/' },
    {
      source: '/elasticsearch-ldap-authentication-authorisation',
      destination: '/blog/',
    },
    {
      source: '/tls-certificate-generator/embed',
      destination: '/tls-certificate-generator/',
    },
    { source: '/collaborators', destination: '/' },
    { source: '/es/*', destination: '/' },
    { source: '/faq-2', destination: '/faq/' },
    { source: '/licencia', destination: '/licensing/' },
    { source: '/searchguard-license-support', destination: '/licensing/' },
    { source: '/es/licencia', destination: '/licensing/' },
    {
      source: '/generador-de-certificados-tls',
      destination: '/tls-certificate-generator/',
    },
    {
      source: '/search-guard-provides-gdpr-compliance-for-elasticsearch',
      destination: '/gdpr-compliance-elasticsearch',
    },
    { source: '/read-history-gdpr*', destination: '/' },
    { source: '/search-guard-elastic', destination: '/' },
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
