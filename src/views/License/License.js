import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {initGA, PageView} from '../../components/Tracking/Tracking';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import PreFooter from '../../components/PreFooter/PreFooter';
import Title from '../../components/Title/Title';
import LicensingModel from '../../components/LicensingModel/LicensingModel';
import References from '../../components/References/References';
import CustomizeLicense from '../../components/LicensingModel/CustomizeLicense';
import FilledDivider from '../../components/FilledDivider/FilledDivider';
import FeatureBreakdown from "../../components/FeatureBreakdown/FeatureBreakdown";
import CTAStartFreeTrial from "../../components/CTA/CTAStartFreeTrial";

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
                    content="Get to know more about the Search Guard Editions and pricing. Fair licensing and secure your Elasticsearch cluster with an unlimited amount of nodes - scale your cluster not your costs."
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
