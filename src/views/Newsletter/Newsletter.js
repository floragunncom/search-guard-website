import React from 'react';
import {Helmet} from 'react-helmet';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import './Newsletter.scss';
import ctaIcon from "../../images/icon-sg.svg";
import Email from "../../components/Email/Email";
import TextTile from "../../components/Tiles/TextTile/TextTile";

const Newsletter = () => {
    return (<PageWrapper>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>Search Guard Newsletter</title>
                <link rel="canonical" href="https://search-guard.com/newsletter/"/>
                <meta
                    name="description"
                    content="Get the latest updates, insights, and tips on securing your Elasticsearch and OpenSearch clusters with the Search Guard Newsletter."
                />
            </Helmet>

            <Title
                headline="Search Guard Newsletter"
                text="Stay Ahead in Open Source Security with the Search Guard Newsletter!"
            />


            <div className="newsletter-wrapper">

                <div className="row newsletter">

                    <div className="row newsletter-textbox">
                        <div className="newsletter-tilesimple-text">
                            Get the latest updates, insights, and tips on securing your Elasticsearch and OpenSearch
                            clusters with the Search Guard Newsletter. Delivered straight to your inbox, our newsletter
                            is packed with everything you need to know about data security, access control, and the
                            evolving world of open-source search technology.
                        </div>
                    </div>

                    <div className="newsletter-section">
                        <div className="newsletter-content">
                            <Email/>
                        </div>
                    </div>
                    <div className="newsletter-section">
                        <div className="newsletter-content">
                            <div className="newsletter-content-headline">
                                Exclusive Content & Updates
                            </div>
                            <div className="newsletter-content-text">
                                Stay informed with the latest product news, features, and updates from Search Guard. Be
                                the first to know about new releases, security patches, and enhancements to keep your
                                data secure.
                            </div>
                        </div>
                    </div>
                    <div className="newsletter-section">
                        <div className="newsletter-content">
                            <div className="newsletter-content-headline">
                                Expert Tips & Best Practices
                            </div>
                            <div className="newsletter-content-text">
                                Learn from the experts! Receive practical advice, tutorials, and best practices on how
                                to optimize your search security setup, protect your clusters, and manage cmpliance
                                requirements effectively.
                            </div>
                        </div>
                    </div>
                    <div className="newsletter-section">
                        <div className="newsletter-content">
                            <div className="newsletter-content-headline">
                                Invitations to Webinars & Events
                            </div>
                            <div className="newsletter-content-text">
                                Join our community! Get exclusive invitations to webinars, virtual meetups, and events
                                where you can connect with Search Guard experts, ask questions, and learn about new
                                trends and technologies in the world of open-source search.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <TextTile
                colorschema="white"
                headline="Ready to Enhance Your Data Security?"
                text="Join our community of open-source search enthusiasts and security professionals today. Sign up now and never miss an update from Search Guard!"
                icon={ctaIcon}
            />
            <PreFooter/>
        </PageWrapper>);
};

export default Newsletter;
