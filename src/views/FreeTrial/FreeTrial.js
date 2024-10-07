import React from 'react';
import { Helmet } from 'react-helmet';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import Button from "../../components/Button/Button";
import one from '../../images/1.svg';
import two from '../../images/2.svg';
import three from '../../images/3.svg';
import four from '../../images/4.svg';
import './FreeTrial.scss';
import ContactFormSlimOnly from "../../components/ContactFormSuperSlimOnly";

const breadcrumb = [
    { anchor: '/', name: 'Home' },
    { anchor: '/search-guard-free-trial/', name: 'Start free trial' }
];
const FreeTrial = () => {
    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Start your free Search Guard Trial now</title>
                <link rel="canonical" href="https://search-guard.com/search-guard-free-trial/" />
                <meta
                    name="description"
                    content="How to download and run your free 60 day Search Guard Enterprise Trial"
                />
            </Helmet>
            <Title
                className="free-trial-title"
                headline="Start your free trial"
                text="You can use the completely Open Source and forever-free Community Edition, or start your 60 day Search Guard Enterprise trial"
                breadcrumb={breadcrumb}
            />


            <div className="free-trial-wrapper" >

                <div className="row free-trial">

                        <div className="free-trial-section" >
                            <div className="free-trial-pic">
                                <img loading="lazy" src={one} alt="icon one" />
                            </div>
                            <div className="free-trial-content">
                                <div className="subtitle free-trial-content-headline">
                                    Download Search Guard
                                </div>
                                <div className="free-trial-content-text">
                                    Download the Search Guard plugin matching the Elasticsearch version you are running. For example, if you are
                                    running Elasticsearch 7.9.1, you need to download Search Guard 7.9.1 as well.
                                    The download is platform-independant.
                                </div>
                                <div className="free-trial-content-button">
                                    <Button
                                        text="visit our downloads page"
                                        link="https://docs.search-guard.com/latest/search-guard-versions"
                                        target="_blank"
                                        rel="noopener norefferrer"
                                    />
                                </div>
                            </div>
                        </div>

                    <hr />
                </div>



                <div className="row free-trial">

                    <div className="free-trial-section" >
                        <div className="free-trial-pic">
                            <img loading="lazy" src={two} alt="icon two" />
                        </div>
                        <div className="free-trial-content">
                            <div className="subtitle  free-trial-content-headline">
                                Install Search Guard
                            </div>
                            <div className="free-trial-content-text">
                                Stop your Elasticsearch cluster and install Search Guard on all nodes.

                                <pre>
                                    <div className="free-trial-pre">
                                    bin/elasticsearch-plugin install
                                    file:///path/to/search-guard-plugin-&lt;version&gt;.zip
                                    </div>
                                </pre>
                            </div>
                        </div>
                    </div>

                    <hr />
                </div>


                <div className="row free-trial">

                    <div className="free-trial-section" >
                        <div className="free-trial-pic">
                            <img loading="lazy" src={three} alt="icon three" />
                        </div>
                        <div className="free-trial-content">
                            <div className="subtitle free-trial-content-headline">
                                (Optional) Install demo configuration
                            </div>
                            <div className="free-trial-content-text">
                                Search Guard ships with demo users and roles that you can install for a quick PoC:

                                <pre className="free-trial-pre">
                                    cd plugins/search-guard/tools
                                </pre>
                                <pre className="free-trial-pre">
                                    ./install_demo_configuration.sh
                                </pre>

                            </div>
                        </div>
                    </div>

                    <hr />

                </div>

                <div className="row free-trial">

                    <div className="free-trial-section" >
                        <div className="free-trial-pic">
                            <img loading="lazy" src={four} alt="icon four" />
                        </div>
                        <div className="free-trial-content">
                            <div className="subtitle free-trial-content-headline">
                                Restart Elasticsearch
                            </div>
                            <div className="free-trial-content-text">
                                After installing Search Guard, start your cluster as normal:

                                <pre className="free-trial-pre">
                                    bin/elasticsearch
                                </pre>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="row free-trial">
                    <h3 className="free-trial-headline">Docker</h3>

                    <div className="free-trial-section" >
                        <div className="free-trial-content">
                            <div className="free-trial-content-text">
                                We provide a <a href="https://docs.search-guard.com/latest/docker" target="_blank" rel="noopener noreferrer">Docker based demo</a> including Elasticsearch and Kibana with Search Guard and Signas Alerting pre-installed:

                                To start the image, run:

                                <pre className="free-trial-pre">
                                    docker run -ti -p 9200:9200 -p 5601:5601 floragunncom/sgdemo
                                </pre>

                                After the container is up you can access Kibana on:


                                <pre className="free-trial-pre">
                                    http://localhost:5601
                                </pre>


                                Elasticsearch runs on:

                                <pre className="free-trial-pre">
                                    https://localhost:9200
                                </pre>


                                The container comes with some pre-installed demo users. For full access and to configure new roles and permissions, use admin/admin for login.

                            </div>

                        </div>
                    </div>

                    <hr />
                </div>

                <div className="row free-trial">
                    <h3 className="free-trial-headline">Kubernetes</h3>

                    <div className="free-trial-section" >
                        <div className="free-trial-content">
                            <div className="free-trial-content-text">
                                We provide <a href="https://docs.search-guard.com/latest/search-guard-kubernetes-helm" target="_blank" rel="noopener noreferrer">Helm Charts</a> for running Search Guard on Kubernetes.
                            </div>

                        </div>
                    </div>
                    <hr />
                </div>

                <div className="row free-trial">
                    <h3 className="free-trial-headline">Other Resources</h3>

                    <div className="free-trial-section" >
                        <div className="free-trial-content">
                            <div className="free-trial-content-text">
                                <a href="https://docs.search-guard.com/" target="_blank" rel="noopener noreferrer">Search Guard Documentation</a>
                                <br />
                                <a href="https://forum.search-guard.com/" target="_blank" rel="noopener noreferrer">Search Guard Community Forum</a>
                                <br />
                                <a href="https://git.floragunn.com/" target="_blank" rel="noopener noreferrer">GitLab repositories</a>
                                <br />
                                <a href="/blog/" target="_blank" rel="noopener noreferrer">Search Guard Blog</a>
                            </div>

                        </div>
                    </div>
                    <hr />
                </div>
            </div>

            <div className="row free-trial">
                <div className="subtitle free-trial-headline">Any Questions? Drop us a line!</div>

                <div className="free-trial-section" >
                    <div className="free-trial-content">
                        <div className="free-trial-content-text">
                            <ContactFormSlimOnly/>
                        </div>
                    </div>
                </div>

            </div>

            <PreFooter />
        </PageWrapper>
    );
};

export default FreeTrial;
