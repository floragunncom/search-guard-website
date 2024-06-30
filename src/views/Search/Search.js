import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { initGA, PageView } from '../../components/Tracking/Tracking';
import PreFooter from '../../components/PreFooter/PreFooter';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import './Search.scss';

const Security = () => {
    useEffect(() => {
        initGA();
        PageView();
    }, []);

    const breadcrumb = [
        { id: 1, anchor: '/', name: 'Home' },
        { id: 2, anchor: '/blog/', name: 'Blog' },
        { id: 3, anchor: '/search/', name: 'Search' },
    ];

    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    Blog Search | Search for interesting pieces of content in all our blogs
                </title>
                <link rel="canonical" href="https://search-guard.com/search/" />
                <meta
                    name="description"
                    content="Search for interesting pieces of content in all our blogs."
                />
                <script src="/assets/search.js"></script>
            </Helmet>
            <Title
                headline="Blog Search"
                text="Search for interesting pieces of content in all our blogs."
                breadcrumb={breadcrumb}
            />
            <div className="row blogpostarticle-wrapper">
                <div className="col s12 offset-l2 l8">
                    <div id="search-box">

                    </div>

                    <div id="hits">

                    </div>

                    <div id="pagination"></div>

                </div>
            </div>
            <PreFooter />
        </PageWrapper>
    );
};

export default Security;