import React from 'react';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import Journey from '../../components/Journey/Journey';
import Button from '../../components/Button/Button';
import Cta from '../../components/Cta/Cta';
import ctaIcon from '../../images/cta-banner-arrow.svg';
import Title from '../../components/Title/Title';
import arrowDown from '../../images/arrow-down-green.svg';
import claudia from '../../images/claudia.svg';
import jochen from '../../images/jochen.svg';
import hendrik from '../../images/hendrik.svg';
import mechthild from '../../images/mechthild.svg';
import iconIn from '../../images/icon-in-loud.svg';
import excelerate from '../../images/ref2.svg';
import sirenPartner from '../../images/ref3.svg';
import './Company.scss';

const Company = () => {
  const team = [
    { name: 'Claudia Kressin', position: 'Founder & CEO', pic: claudia, link: 'https://www.linkedin.com/in/searchguard/' },
    { name: 'Jochen Kressin', position: 'Founder & CEO', pic: jochen, link: 'https://www.linkedin.com/in/jkressin/' },
    { name: 'Hendrik Saly', position: 'CTO', pic: hendrik, link: 'https://www.linkedin.com/in/salyh/' },
    { name: 'Mechthild Wetekam', position: 'COO', pic: mechthild, link: '' },
  ];

  return (
    <div id="top">
      <NavBar />
      <Title
        headline="company"
        text="We shape IT security and Open Source business models."
      />
      <div className="product-anchor-container">
        <div className="row">
          <div className="product-anchor-wrapper">
            <div className="product-anchor-item">
              <a href="#team" className="product-anchor-link">
                <img
                  src={arrowDown}
                  alt="arrow-down"
                  className="product-anchor-img"
                />
                management team
              </a>
            </div>
            <div className="product-anchor-item">
              <a href="#partners" className="product-anchor-link">
                <img
                  src={arrowDown}
                  alt="arrow-down"
                  className="product-anchor-img"
                />
                partners
              </a>
            </div>
            <div className="product-anchor-item">
              <a href="#journey" className="product-anchor-link">
                <img
                  src={arrowDown}
                  alt="arrow-down"
                  className="product-anchor-img"
                />
                journey
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="company-team-wrapper" id="team">
        <div className="row">
          <div className="company-team-headline">Mangement team</div>
          {team.map(person => {
            return (
              <div className="col s6 m4 company-team-profile">
                <img src={person.pic} alt="icon" className="profile-pic" />
                <div className="profile-name">{person.name}</div>
                <div className="profile-position">{person.position}</div>
                <div className="profile-link">
                  <a href={person.link} target="_blank">
                    <img src={iconIn} alt="icon" className="profile-linkedIn" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="company-partners-wrapper" id="partners">
        <div className="row">
          <div className="company-partners-headline">Partners</div>
          <div className="company-partners-pic-wrapper">
            <div className="col s12 m4 offset-m2 company-partners-pic">
              <img src={excelerate} alt="icon" />{' '}
            </div>
            <div className="col s12 m4 company-partners-pic">
              <img src={sirenPartner} alt="icon" />{' '}
            </div>
          </div>
        </div>
      </div>
      <Journey />
      <Cta
        headline="Free 60-day trial"
        text="Want to see how your company can benefit from our Compliance edition? Sign up to our 60-day trial, completely free of charge."
        ctaText="start free trial"
        icon={ctaIcon}
      />
      <PreFooter />
      <Footer />
    </div>
  );
};

export default Company;
