import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {initGA, PageView} from '../../components/Tracking/Tracking';
import PageWrapper from '../../components/PageWrapper/PageWrapper.jsx';
import PreFooter from '../../components/PreFooter/PreFooter.jsx';
import Title from '../../components/Title/Title.jsx';
import LicensingModel from '../../components/LicensingModel/LicensingModel.jsx';
import References from '../../components/References/References.jsx';
import CustomizeLicense from '../../components/LicensingModel/CustomizeLicense.jsx';
import FilledDivider from '../../components/FilledDivider/FilledDivider.jsx';
import FeatureBreakdown from "../../components/FeatureBreakdown/FeatureBreakdown.jsx";
import CTAStartFreeTrial from "../../components/CTA/CTAStartFreeTrial.jsx";

const License = () => {
    useEffect(() => {
        initGA();
        PageView();
    }, []);

    const breadcrumb = [
        {id: 1, anchor: '/', name: 'Home'},
        {id: 1, anchor: '/licensing/', name: 'Licensing'},
    ];

    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>
                    Pricing | Search Guard Community, Enterprise and Compliance Edition
                </title>
                <link rel="canonical" href="https://search-guard.com/licensing/"/>
                <meta
                    name="description"
                    content="Search Guard offers fair licensing to secure Elasticsearch and Kibana with an unlimited amount of nodes - scale your cluster not your costs."
                />
            </Helmet>
            <Title
                headline="Pricing"
                text="Unlimited nodes licensing for all Security and Alerting features. Scale your cluster, not your cost!"
                breadcrumb={breadcrumb}
            />
            <LicensingModel
                headline="Search Guard Editions"
                topButtons={false}
                tableView
            />

            <div className="row default-padding-top-bottom">
                <div className="col s12">
                    <h2>Feature Breakdown</h2>
                </div>
                <div className="col s12">
                    <FeatureBreakdown/>
                </div>
            </div>


            <div id="academic">
                <CustomizeLicense/>
            </div>
            <FilledDivider colorschema="white"/>
            <References/>
            <CTAStartFreeTrial colorschema="white"/>
            <PreFooter/>
        </PageWrapper>
    );
};

export default License;
