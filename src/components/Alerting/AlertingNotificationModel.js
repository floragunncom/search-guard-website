import React from 'react';
import { useTranslation } from 'react-i18next';
import ColumnedTile from "../../components/Tiles/ColumnedTile/ColumnedTile";
import iconSpeaker from "../../images/bullhorn-solid.svg";
import iconBell from "../../images/bell-regular.svg";

const AlertingNotificationModel = () => {
    const { t } = useTranslation('alerting');

    let notificationmodel = [
        {
            headline: t('notificationModel.severity.headline'),
            text: t('notificationModel.severity.text'),
            image: {
                src: iconBell,
                width: 150,
                height: 150,
            },
        },
        {
            headline: t('notificationModel.resolve.headline'),
            text: t('notificationModel.resolve.text'),
            image: {
                src: iconSpeaker,
                width: 150,
                height: 150,
            },
        },
    ]


    return (
        <ColumnedTile colorschema="white" wrapperclass="default-padding-top-bottom" columns={notificationmodel} headline={t('notificationModel.headline')} />
    );
};

export default AlertingNotificationModel;
