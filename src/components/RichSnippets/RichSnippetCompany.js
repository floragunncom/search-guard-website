import React from 'react';
import sgLogo from '../../images/sg_dlic_small.png';

const CompanySnippet = () => {
    const logoUrl = typeof sgLogo === 'string' ? sgLogo : sgLogo?.src || '';
    const schema = {
        '@context': 'http://schema.org',
        '@type': 'Organization',
        name: 'Search Guard',
        legalName: 'floragunn GmbH',
        url: 'https://search-guard.com',
        logo: logoUrl,
        vatID: 'DE287373363',
        iso6523Code: '0060:342767430',
        foundingDate: '2013',
        founder: [
            {
                '@type': 'Person',
                name: 'Jochen Kressin',
                email: 'jkressin@floragunn.com',
            },
            {
                '@type': 'Person',
                name: 'Claudia Kressin',
                email: 'ckressin@floragunn.com',
            },
        ],
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Tempelhofer Ufer 16',
            addressLocality: 'Berlin',
            postalCode: '10963',
            addressCountry: 'Germany',
        },
        contactPoint: [
            {
                '@type': 'ContactPoint',
                contactType: 'Sales',
                email: 'sales@search-guard.com',
            },
            {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                url: 'https://forum.search-guard.com/',
            },
        ],
        sameAs: [
            'https://twitter.com/searchguard',
            'https://www.facebook.com/searchguard/',
            'https://www.linkedin.com/company/search-guard/',
            'https://www.youtube.com/channel/UCUw93I0DHMvoA8HNQ31AeJw',
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export default CompanySnippet;
