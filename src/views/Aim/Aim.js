import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import '../Alerting/Alerting.scss';
import './Aim.scss';
import { initGA, PageView } from '../../components/Tracking/Tracking';
import PreFooter from '../../components/PreFooter/PreFooter';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import TileSimple from '../../components/TileSimple/TileSimple';
import Cta from '../../components/Cta/Cta';
import ctaIcon from '../../images/icon-sg.svg';
import aim1 from '../../images/elasticsearch_index_management_1.svg';
import aim2 from '../../images/elasticsearch_index_management_2.svg';
import aim3 from '../../images/elasticsearch_index_management_3.svg';
import aim4 from '../../images/elasticsearch_index_management_4.svg';
import aim5 from '../../images/elasticsearch_index_management_5.svg';

const Aim = () => {

    const breadcrumb = [
        { id: 1, anchor: '/', name: 'Home' },
        { id: 1, anchor: '/indexmanagement/', name: 'Index Management (Beta)' },
    ];

    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    Automated Index Management for Elasticsearch | Search Guard
                </title>
                <link rel="canonical" href="https://search-guard.com/indexmanagement/" />
                <meta
                    name="description"
                    content="Streamline Elasticsearch operations with Search Guard's Automated Index Management. Boost efficiency, reduce manual tasks, and ensure peak cluster performance effortlessly."
                />
            </Helmet>
            <Title
                headline="Automated Index Management for Elasticsearch"
                text="Streamline Elasticsearch operations with Search Guard's Automated Index Management. Boost efficiency, reduce manual tasks, and ensure peak cluster performance effortlessly."
                breadcrumb={breadcrumb}
            />
            <div id="concept">
                <TileSimple
                    icon={aim5}
                    iconPosition="left"
                    backgroundColor="light"
                    headline="Goodbye Manual Index Management"
                    text="Say farewell to tedious index oversight. Search Guard's Automated Index Management handles routine tasks 24/7,
                    freeing you to focus on strategic initiatives. Trust that your indices are managed efficiently without constant attention,
                    allowing you to redirect your expertise where it matters most."
                />
            </div>
            <TileSimple
                icon={aim3}
                iconPosition="right"
                backgroundColor="dark"
                headline="Operational Efficiency Redefined"
                text="Our system continuously optimizes your indices based on predefined policies, ensuring peak cluster performance.
                Experience reduced query latency and optimized resource allocation without constant intervention.
                Enjoy a leaner, more responsive Elasticsearch deployment that adapts to your data needs automatically."
            />
            <TileSimple
                icon={aim4}
                iconPosition="left"
                backgroundColor="light"
                headline="Cluster Operator's Peace of Mind"
                text="Let Search Guard be your silent, vigilant partner. Set policies once and relax.
                Comprehensive logging keeps you informed without constant monitoring.
                No more middle-of-the-night alerts or weekend emergencies.
                Rest easy knowing your indices are cared for around the clock,
                allowing you to maintain work-life balance without compromising cluster health."
            />
            <TileSimple
                icon={aim2}
                iconPosition="right"
                backgroundColor="dark"
                headline="Scalability Without the Growing Pains"
                text="As your data grows, so does Search Guard's capability.
                Our Automated Index Management scales seamlessly with your cluster, handling gigabytes to petabytes with equal efficiency.
                Grow your Elasticsearch deployment without proportionally increasing management overhead.
                Focus on leveraging your data, not just maintaining it, and stay ready for future challenges."
            />

            <PreFooter />

            <div className="alerting-wrapper" >

                <div className="row alerting">
                    <h2 className="alerting-headline"> Automated Index Management for Elasticsearch.<br />Fully integrated with Search Guard Security.</h2>

                    <div className="aim-section" >
                        <div className="alerting-content">
                            <h2 className="subtitle alerting-content-headline">
                                Index Lifecycle Management
                            </h2>
                            <div className="alerting-content-text">
                                AIM allows you to define policies that automatically manage the entire lifecycle of your indices. From creation to deletion, each stage is handled based on your specific requirements. This ensures that your data retention policies are consistently enforced without manual intervention.
                            </div>
                        </div>
                    </div>
                    <div className="aim-section" >
                        <div className="alerting-content">
                            <h2 className="subtitle alerting-content-headline">
                                Data Rollover
                            </h2>
                            <div className="alerting-content-text">
                                As your indices grow, AIM can automatically roll over to new indices based on size, document count, or age thresholds. This prevents individual indices from becoming too large and impacting performance.
                            </div>
                        </div>
                    </div>
                    <div className="aim-section" >
                        <div className="alerting-content">
                            <h2 className="subtitle alerting-content-headline">
                                Index Replication
                            </h2>
                            <div className="alerting-content-text">
                                AIM can manage index replication, ensuring that your data is properly distributed across your cluster for high availability and fault tolerance.
                            </div>
                        </div>
                    </div>
                    <div className="aim-section" >
                        <div className="alerting-content">
                            <h2 className="subtitle alerting-content-headline">
                                Index Shrinking
                            </h2>
                            <div className="alerting-content-text">
                                Over time, as data becomes less frequently accessed, AIM can automatically shrink indices to optimize storage and improve query performance on older data.
                            </div>
                        </div>
                    </div>
                    <div className="aim-section" >
                        <div className="alerting-content">
                            <h2 className="subtitle alerting-content-headline">
                                Snapshot and Restore
                            </h2>
                            <div className="alerting-content-text">
                                Regular backups are crucial. AIM can schedule and manage snapshots of your indices, providing peace of mind that your data is always protected.
                            </div>
                        </div>
                    </div>
                    <div className="aim-section" >
                        <div className="alerting-content">
                            <h2 className="subtitle alerting-content-headline">
                                Cron-based Scheduling
                            </h2>
                            <div className="alerting-content-text">
                                With cron expression support, you have granular control over when each policy executes, allowing you to align index management tasks with your cluster's low-usage periods.
                            </div>
                        </div>
                    </div>
                    <div className="aim-section" >
                        <div className="alerting-content">
                            <h2 className="subtitle alerting-content-headline">
                                Node Selection
                            </h2>
                            <div className="alerting-content-text">
                                AIM lets you specify which nodes should execute these tasks, distributing the workload efficiently across your cluster.
                            </div>
                        </div>
                    </div>
                    <div className="aim-section" >
                        <div className="alerting-content">
                            <h2 className="subtitle alerting-content-headline">
                                Security Integration
                            </h2>
                            <div className="alerting-content-text">
                                Fully integrated with Search Guard's security features, AIM ensures that all automated actions comply with your access control policies.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="tryit">
                <Cta
                    headline="Give AIM a spin!"
                    text="Follow these simple steps to install AIM to your Elasticsearch cluster for free. "
                    ctaText="Documentation"
                    icon={ctaIcon}
                    link="https://docs.search-guard.com/latest/automated-index-management"
                />
            </div>
            <PreFooter />
        </PageWrapper>
    );
};

export default Aim;
