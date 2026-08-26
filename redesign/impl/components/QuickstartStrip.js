import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import Button from '../Button/Button';

const DOCS_QUICKSTART_URL = 'https://docs.search-guard.com/latest/';

const QuickstartStrip = () => {
    const { t } = useTranslation('home');
    const [copied, setCopied] = useState(false);
    const command = t('quickstart.command');

    const copy = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(command).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    return (
        <div className="color-schema-dark default-padding-top-bottom quickstart-strip">
            <div className="row">
                <div className="col s12">
                    <h2 className="section-headline">{t('quickstart.headline')}</h2>
                    <div className="quickstart-codebox">
                        <code>{command}</code>
                        <button type="button" onClick={copy} className="quickstart-copy" aria-label={t('quickstart.copy')}>
                            {copied ? t('quickstart.copied') : t('quickstart.copy')}
                        </button>
                    </div>
                    <p>{t('quickstart.text')}</p>
                    <Button text={t('quickstart.docsLink')} link={DOCS_QUICKSTART_URL} target="_blank"/>
                </div>
            </div>
        </div>
    );
};

export default QuickstartStrip;
