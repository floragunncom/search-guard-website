import React from 'react';
import {useTranslation} from 'react-i18next';
import Button from '../Button/Button';
import heroCertificates from '../../images/hero-certificates.svg';
import icons from '../../images/hero-icons.svg';
import hero from '../../images/hero-static.svg';
import {ReactSVG} from "react-svg";

const SimpleHero = () => {
    const { t } = useTranslation('home');

    return (
            <div>
                <div className="hero-wrapper">
                    <div className="row">
                        <div className="col s12">
                                <div className="hero-text-wrapper">
                                    <h1 className="hero-text-wrapper-headline">
                                        {t('hero.headline')}
                                    </h1>
                                </div>
                        </div>
                        <div className="row">
                                <div className="col s12 m12 l8">
                                    <div className="hero-text-wrapper-text">
                                        {t('hero.text')}
                                    </div>
                                </div>
                        </div>
                        <div className="row flex-row">
                            <div className="col s12 l6 flex-col-bottom flex-col-center-on-med-down">
                                <div className="hero-button-wrapper">
                                    <Button
                                        text={t('hero.button')}
                                        link="/search-guard-free-trial/"
                                    />
                                </div>
                            </div>
                            <div className="col m6 hide-on-med-and-down">
                                <img className="right-align" loading="lazy" src={icons} alt="searchguard-hero-icons"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default SimpleHero;
