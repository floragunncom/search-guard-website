import React from 'react';
import ColumnedTile from "../../components/Tiles/ColumnedTile/ColumnedTile";
import shieldWheel from "../../images/shield-halved.svg";

const ComplianceFeatures = () => {

    let complianceFeatures = [
        {
            headline: "Data Encryption",
            text: "Search Guard encrypts all the traffic inside your Elasticsearch cluster, shields from data breaches and ensures the integrity of your data.",
            image: {
                src: shieldWheel,
                width: 150,
                height: 150,
            },
        },
        {
            headline: "Data Anonymization",
            text: "Search Guard provides role-based access control to all data stored in your Elasticsearch cluster. Control exactly which users can access PII or other sensitive data in cleartext or anonymized.",
            image: {
                src: shieldWheel,
                width: 150,
                height: 150,
            },
        },
        {
            headline: "Audit Trails",
            text: "Search Guard generates audit trails on who has created, modified, accessed and deleted PII and other sensitive data in your Elasticsearch cluster.",
            image: {
                src: shieldWheel,
                width: 150,
                height: 150,
            },
        },
    ]


    return (
        <ColumnedTile colorschema="white" wrapperclass="default-padding-top-bottom" columns={complianceFeatures} />
    );
};

export default ComplianceFeatures;
