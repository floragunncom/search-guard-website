import React from 'react';
import {useTranslation} from 'react-i18next';
import Button from '../Button/Button';

const SimpleHero = () => {
    const { t } = useTranslation('home');

    return (
            <div>
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
                                    text={t('hero.button')}
                                    link="/search-guard-free-trial/"
                                />
                                <Button
                                    text={t('hero.teaser')}
                                    link="/webinars/"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default SimpleHero;
