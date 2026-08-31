import React from 'react';
import {useTranslation} from 'react-i18next';
import Button from '../Button/Button';
// TODO: replace with a real product screenshot (Kibana config GUI or Signals UI)
// import heroScreenshot from '../../images/hero-screenshot.png';

const HomeHero = () => {
    const { t } = useTranslation('home');

    return (
        <div className="hero-wrapper">
            <div className="row">
                <div className="col s12 hero-centered">
                    <h1 className="hero-text-wrapper-headline">
                        {t('hero.headline')}
                    </h1>
                    <div className="hero-text-wrapper-text">
                        {t('hero.text')}
                    </div>
                    <div className="hero-cta-pills">
                        <Button
                            text={t('hero.buttonPrimary')}
                            link="/search-guard-free-trial/"
                        />
                        <Button
                            text={t('hero.buttonSecondary')}
                            link="/contacts/"
                            style="outline"
                        />
                    </div>
                    <ul className="hero-microtrust">
                        <li>{t('hero.microtrust1')}</li>
                        <li>{t('hero.microtrust2')}</li>
                        <li>{t('hero.microtrust3')}</li>
                    </ul>
                    {/* <img src={heroScreenshot} alt="Search Guard configuration in Kibana" className="hero-screenshot" /> */}
                </div>
            </div>
        </div>
    );
};

export default HomeHero;
