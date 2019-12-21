const handler = require('serve-handler');
const http = require('http');
const URL = require('url');

const port = process.env.PORT || 4444;

const options = {
  public: './build',
  trailingSlash: true,
  redirects: [
    { source: '/floragunn-page', destination: '/company/' },
    { source: '/grownow', destination: '/company/' },
    { source: '/contact', destination: '/contacts/' },
    { source: '/kunstlerfreunde', destination: '/company/' },
    { source: '/search-guard-public-key', destination: '/company/' },
    { source: '/search-guard-tools-tutorials', destination: '/company/' },
    { source: '/our-services/**', destination: '/company/' },
    { source: '/search-guard-elasticsearch-faq', destination: '/company/' },
    { source: '/searchguard_*', destination: '/company/' },
    { source: '/searchguard-ssl*', destination: '/company/' },
    { source: '/security-in-distributed-systems', destination: '/company/' },
    {
      source: '/tls-certificate-generator/上申请密钥。',
      destination: '/company/',
    },
    {
      source: '/search-guard-provides-gdpr-compliance-for-elasticsearch',
      destination: '/gdpr-compliance-elasticsearch/',
    },
    { source: '/no-nonsense-it', destination: '/company/' },
    { source: '/search-guard-customers', destination: '/company/' },
    { source: '/*.zip', destination: '/' },
    { source: '/author/**/:id', destination: '/blog/' },
    { source: '/category/**/:id', destination: '/blog/' },
    { source: '/tag/**/:id', destination: '/blog/' },
    { source: '/blog/page/**/:id', destination: '/blog/' },
    { source: '/oxy_testimonial/arno-has', destination: '/' },
    { source: '/oxy_testimonial/yasvanth-babu', destination: '/' },
    { source: '/careers', destination: '/' },
    {
      source: '/elasticsearch-anonymous-authentication',
      destination: '/blog/',
    },
    {
      source: '/tls-certificate-generator/embed',
      destination: '/tls-certificate-generator/',
    },
    { source: '/collaborators', destination: '/' },
    { source: '/colaboradores', destination: '/' },
    { source: '/integradores', destination: '/product/#integrators' },
    { source: '/integrateurs', destination: '/product/#integrators' },
    { source: '/integrators', destination: '/product/#integrators' },
    { source: '/partenaires', destination: '/company/#partners' },
    { source: '/partners', destination: '/company/#partners' },
    { source: '/contacto', destination: '/contacts/' },
    { source: '/protection-des-donnees', destination: '/datenschutz/' },
    { source: '/education-program', destination: '/contacts/' },
    { source: '/es/*', destination: '/' },
    { source: '/faq-2', destination: '/faq/' },
    { source: '/licencia', destination: '/licensing/' },
    { source: '/licences', destination: '/licensing/' },
    { source: '/searchguard-license-support', destination: '/licensing/' },
    { source: '/es/licencia', destination: '/licensing/' },
    {
      source: '/generador-de-certificados-tls',
      destination: '/tls-certificate-generator/',
    },
    { source: '/7171-2', destination: '/' },
    { source: '/home-2', destination: '/' },
    { source: '/mentions-legales', destination: '/impressum/' },
    { source: '/producto', destination: '/product/' },
    { source: '/produit', destination: '/product/' },
    { source: '/security-information', destination: '/security/' },
    { source: '/cle-publique-securite', destination: '/security/' },
    {
      source: '/generateur-de-certificats-tls',
      destination: '/tls-certificate-generator/',
    },
    {
      source: '/**.zip',
      destination: '/',
    },
  ],
};

const redirectLookup = {};
for (const rule of options.redirects) {
  redirectLookup[rule.source] = rule.destination;
}

const redirect = (response, path) => {
  path = redirectLookup[path] || path;
  if (!path) {
    console.log('no path for redirect, falling back to /');
    path = '/';
  }
  response.writeHead(301, { Location: path });
  return response.end();
};

const pageIds = {
  1134: '/elasticsearch-compliance-preview/',
};

const attachmentIds = {
  4174: '/wp-content/uploads/2018/07/keycloak_add_client.png',
  4220: '/wp-content/uploads/2018/07/Keycloak_assign_roles.png',
  4183: '/wp-content/uploads/2018/07/keycloak_client_secret.png',
  4208: '/wp-content/uploads/2018/07/keycloak_client_settings.png',
  4221: '/wp-content/uploads/2018/07/Keycloak_mapper.png',
  4222: '/wp-content/uploads/2018/07/Log_in_to_Keycloak.png',
  4708: '/wp-content/uploads/2018/08/image1.png',
};

const server = http.createServer((request, response) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/zeit/serve-handler#options
  const { pathname, search, query } = URL.parse(request.url, true);

  if (search && query) {
    // handle ?p=1134
    if (query.p) {
      return redirect(response, pageIds[query.p] || pathname);
    }

    // handle ?attachment_id=4221
    if (query.attachment_id) {
      return redirect(response, attachmentIds[query.attachment_id] || pathname);
    }

    // handle ?lang=
    if (query.lang) {
      return redirect(response, pathname);
    }
    // handle ?utm_source=
    if (query.utm_source) {
      return redirect(response, pathname);
    }

    // Other parameters we simply allow, otherwise to strip them, uncomment this line
    // return redirect(response, pathname)
  }

  return handler(request, response, options);
});

server.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
