import React from 'react';
import sgLogo from '../../images/sg_dlic_small.png';

const CompanySnippet = () => {
  return (
      <script type="application/ld+json">{`
        {
          "@context": "http://schema.org",
          "@type": "Organization",
          "name": "Search Guard",
          "legalName" : "floragunn GmbH",
          "url": "https://preview.search-guard.com",
          "logo": "${sgLogo}",
          "foundingDate": "2013",
          "founders":
          [
        {
          "@type": "Person",
          "name": "Jochen Kressin"
        },
        {
          "@type": "Person",
          "name": "Claudia Kressin"
        }
          ],
          "address": {
          "@type": "PostalAddress",
          "streetAddress": "Tempelhofer Ufer 16",
          "addressLocality": "Berlin",
          "postalCode": "10963",
          "addressCountry": "Germany"
        },
          "contactPoint" : [
        {
          "@type": "ContactPoint",
          "contactType": "sales",
          "telephone": "[+49-30–89379249]",
          "email": "sales@search-guard.com"
        },
        {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "url": "https://forum.search-guard.com/"
        }
          ],
          "sameAs": [
          "https://twitter.com/searchguard",
          "https://www.facebook.com/searchguard/",
          "https://www.linkedin.com/company/search-guard/",
          "https://www.youtube.com/channel/UCUw93I0DHMvoA8HNQ31AeJw"
          ]
        }
      `}</script>
  );
};

export default CompanySnippet;
