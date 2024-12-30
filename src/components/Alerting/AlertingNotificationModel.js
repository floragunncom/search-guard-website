import React, { useEffect } from 'react';
import ColumnedTile from "../../components/Tiles/ColumnedTile/ColumnedTile";
import iconSpeaker from "../../images/bullhorn-solid.svg";
import iconBell from "../../images/bell-regular.svg";

const AlertingNotificationModel = () => {

    let notificationmodel = [
        {
            headline: "Escalation by Severity Levels",
            text: "Define severity levels and get notified on different channels for different levels. Send out Slack notifications for error conditions, and additional Email and PagerDuty alerts for critical conditions.",
            image: {
                src: iconBell,
                width: 150,
                height: 150,
            },
        },
        {
            headline: "Resolve Notifications",
            text: "A critical system condition is hopefully just temporary: Get notified once an alert is resolved and everything is back to normal.",
            image: {
                src: iconSpeaker,
                width: 150,
                height: 150,
            },
        },
    ]


    return (
        <ColumnedTile colorschema="white" wrapperclass="default-padding-top-bottom" columns={notificationmodel} headline="Notifications model" />
    );
};

export default AlertingNotificationModel;
