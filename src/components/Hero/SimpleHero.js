import React from 'react';
import Button from '../Button/Button';
import heroCertificates from '../../images/hero-certificates.svg';
import icons from '../../images/hero-icons.svg';
import './Hero.scss';
import hero from '../../images/hero-static.svg';
import {ReactSVG} from "react-svg";

const SimpleHero = () => {
    return (
            <div>
                <div className="hero-wrapper">
                    <div className="row">
                        <div className="col s12">
                                <div className="hero-text-wrapper">
                                    <h1 className="hero-text-wrapper-headline">
                                        Security and Alerting for Elasticsearch and Kibana
                                    </h1>
                                </div>
                        </div>
                        <div className="row">
                                <div className="col s12 m12 l8">
                                    <div className="hero-text-wrapper-text">
                                        Search Guard is a Security and Alerting Plugin that encrypts and protects your data
                                        and data flows from unauthorized access in the entire Elastic Stack.
                                    </div>
                                </div>
                        </div>
                        <div className="row flex-row">
                            <div className="col s12 l6 flex-col-bottom flex-col-center-on-med-down">
                                <div className="hero-button-wrapper">
                                    <Button
                                        text="Free Search Guard Trial"
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