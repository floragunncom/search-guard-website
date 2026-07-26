import React from 'react';
import {Helmet} from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import Button from "../../components/Button/Button";
import one from '../../images/1.svg';
import two from '../../images/2.svg';
import three from '../../images/3.svg';
import four from '../../images/4.svg';
import ContactFormSlimOnly from "../../components/ContactFormSuperSlimOnly";

const FreeTrial = () => {
    const { t } = useTranslation('freeTrial');

    const breadcrumb = [
        { anchor: '/', name: t('breadcrumb.home') },
        { anchor: '/search-guard-free-trial/', name: t('breadcrumb.freeTrial') }
    ];

    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{t('meta.title')}</title>
                <meta
                    name="description"
                    content={t('meta.description')}
                />
            </Helmet>
            <Title
                headline={t('title.headline')}
                text={t('title.text')}
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
                                    {t('step1.headline')}
                                </div>
                                <div className="free-trial-content-text">
                                    {t('step1.text')}
                                </div>
                                <div className="free-trial-content-button">
                                    <Button
                                        text={t('step1.button')}
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
                                {t('step2.headline')}
                            </div>
                            <div className="free-trial-content-text">
                                {t('step2.text')}

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
                                {t('step3.headline')}
                            </div>
                            <div className="free-trial-content-text">
                                {t('step3.text')}

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
                                {t('step4.headline')}
                            </div>
                            <div className="free-trial-content-text">
                                {t('step4.text')}

                                <pre className="free-trial-pre">
                                    bin/elasticsearch
                                </pre>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="row free-trial">
                    <h3 className="free-trial-headline">{t('docker.headline')}</h3>

                    <div className="free-trial-section" >
                        <div className="free-trial-content">
                            <div className="free-trial-content-text">
                                {t('docker.text1_plain')}<a href="https://docs.search-guard.com/latest/docker" target="_blank" rel="noopener noreferrer">{t('docker.text1_link')}</a>{t('docker.text1_after')}

                                {t('docker.startText')}

                                <pre className="free-trial-pre">
                                    docker run -ti -p 9200:9200 -p 5601:5601 floragunncom/search-guard-flx-elasticsearch:latest
                                </pre>

                                {t('docker.kibanaText')}


                                <pre className="free-trial-pre">
                                    http://localhost:5601
                                </pre>


                                {t('docker.esText')}

                                <pre className="free-trial-pre">
                                    https://localhost:9200
                                </pre>


                                {t('docker.usersText')}

                            </div>

                        </div>
                    </div>

                    <hr />
                </div>

                <div className="row free-trial">
                    <h3 className="free-trial-headline">{t('kubernetes.headline')}</h3>

                    <div className="free-trial-section" >
                        <div className="free-trial-content">
                            <div className="free-trial-content-text">
                                {t('kubernetes.text1_plain')}<a href="https://git.floragunn.com/search-guard/search-guard-flx-helm-charts" target="_blank" rel="noopener noreferrer">{t('kubernetes.text1_link')}</a>{t('kubernetes.text1_after')}
                            </div>

                        </div>
                    </div>
                    <hr />
                </div>

                <div className="row free-trial">
                    <h3 className="free-trial-headline">{t('otherResources.headline')}</h3>

                    <div className="free-trial-section" >
                        <div className="free-trial-content">
                            <div className="free-trial-content-text">
                                <a href="https://docs.search-guard.com/" target="_blank" rel="noopener noreferrer">{t('otherResources.documentation')}</a>
                                <br />
                                <a href="https://forum.search-guard.com/" target="_blank" rel="noopener noreferrer">{t('otherResources.forum')}</a>
                                <br />
                                <a href="https://git.floragunn.com/" target="_blank" rel="noopener noreferrer">{t('otherResources.gitlab')}</a>
                                <br />
                                <a href="/blog/" target="_blank" rel="noopener noreferrer">{t('otherResources.blog')}</a>
                            </div>

                        </div>
                    </div>
                    <hr />
                </div>
            </div>

            <div className="row free-trial">
                <div className="subtitle free-trial-headline">{t('contactForm.headline')}</div>

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
