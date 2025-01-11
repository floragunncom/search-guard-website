import React from 'react';
import ColumnedTile from "../../components/Tiles/ColumnedTile/ColumnedTile";

const AlertingBenefits = () => {

    let benefits = [
        {
            headline: "Elasticsearch and Kibana Alerting for free",
            text: "Signals provides free alerting for Elasticsearch and Kibana. The Community Edition of Signals Alerting is ASL2 licensed, and will always be. You can use it for any project, commercial or other, and even bundle it with your own projects.",
            button: {
                text: "Visit our GitLab Repos",
                href: "https://git.floragunn.com/search-guard/search-guard-suite-enterprise",
                target: "_blank"
            }
        },
        {
            headline: "Fully integrated with Search Guard Security",
            text: "Signals Alerting is fully integrated with all Search Guard Security features. Control access to alerts, configure who can receive notifications, separate alert access by using Search Guard MultiTenancy and leverage advanced features like Document- and Field-level security.",
            button: {
                text: "View our Docs",
                href: "https://docs.search-guard.com/latest/elasticsearch-alerting-security-overview",
                target: "_blank"
            }
        },
        {
            headline: "Single download and install",
            text: "Signals Alerting is bundled with any Search Guard download for Elasticsearch > 7.4. A single plugin install that provides both Security and Alerting features. It was never easier to supercharge your Elasticsearch cluster",
            button: {
                text: "Download now",
                href: "https://docs.search-guard.com/latest/search-guard-versions",
                target: "_blank"
            }
        },

    ]


    return (
        <ColumnedTile
            colorschema="light"
            wrapperclass="default-padding-top-bottom"
            columns={benefits}
            headline="Free Alerting for Elasticsearch and Kibana. Bundled and integrated with Search Guard."/>
    );
};

export default AlertingBenefits;
