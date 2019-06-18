import React from 'react';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import Tile from '../../components/Tile/Tile';
import Title from '../../components/Title/Title';
import Cta from '../../components/Cta/Cta';
import Faq from '../../components/Faq/Faq';
import Video from '../../components/Video/Video';
import envelope from '../../images/icon-envelope.svg';
import arrowDown from '../../images/arrow-down-green.svg';
import iconNote from '../../images/icon-note.svg';
import iconPeople from '../../images/icon-people.svg';
import iconLock from '../../images/icon-multilayer-security.svg';
import iconShield from '../../images/icon-wheel-shield.svg';
import iconCertificate from '../../images/icon-certificate.svg';
import iconSpeaker from '../../images/icon-speaker.svg';
import iconFolder from '../../images/icon-folder.svg';
import iconDownload from '../../images/icon-download.svg';
import './Resource.scss';

const Resource = () => {
  return (
    <div>
      <NavBar />
      <Title
        headline="resource hub"
        text="Suspendisse potenti. Nunc imperdiet molestie elit, a auctor enim vestibulum rutrum. Aliquam non tempus elit. Mauris ut accumsan libero."
      />
      <div className="product-anchor-container">
        <div className="row">
          <div className="product-anchor-wrapper">
            <div className="product-anchor-item">
              <a href="#test" className="product-anchor-link">
                <img
                  src={arrowDown}
                  alt="arrow-down"
                  className="product-anchor-img"
                />
                documentation & github
              </a>
            </div>
            <div className="product-anchor-item">
              <a href="" className="product-anchor-link">
                <img
                  src={arrowDown}
                  alt="arrow-down"
                  className="product-anchor-img"
                />
                faq
              </a>
            </div>
            <div className="product-anchor-item">
              <a href="" className="product-anchor-link">
                <img
                  src={arrowDown}
                  alt="arrow-down"
                  className="product-anchor-img"
                />
                Forum & TLS certificates
              </a>
            </div>
            <div className="product-anchor-item">
              <a href="" className="product-anchor-link">
                <img
                  src={arrowDown}
                  alt="arrow-down"
                  className="product-anchor-img"
                />
                blog
              </a>
            </div>
            <div className="product-anchor-item">
              <a href="" className="product-anchor-link">
                <img
                  src={arrowDown}
                  alt="arrow-down"
                  className="product-anchor-img"
                />
                Presentations & white papers
              </a>
            </div>
            <div className="product-anchor-item">
              <a href="" className="product-anchor-link">
                <img
                  src={arrowDown}
                  alt="arrow-down"
                  className="product-anchor-img"
                />
                videos
              </a>
            </div>
          </div>
        </div>
      </div>
      <Tile
        leftDark={false}
        leftIcon={iconFolder}
        rightIcon={iconPeople}
        leftHeadline="Documentation"
        leftText="Get the official documentation you need to nascetur ridiculus mus nullam at porta ex."
        rightHeadline="Community forum"
        rightText="Any questions on installation or configuration? Ask our community forum."
        leftLink="https://docs.search-guard.com/latest/"
        rightLink="/"
        leftButtonTarget="_blank"
      />
      <Faq />
      <Tile
        leftDark={true}
        leftIcon={iconDownload}
        rightIcon={iconCertificate}
        leftHeadline="GitHub repo"
        leftText="Access and download code, so you can rta ex, et bibendum nisl. "
        rightHeadline="TLS Certificate Generator"
        rightText="From TLS certificates for testing or implementing a PoC, our generator is here to ease the pain!"
        leftLink="https://github.com/floragunncom"
        rightLink="/"
        leftButtonTarget="_blank"
      />
      <Tile
        leftDark={false}
        leftIcon={iconSpeaker}
        rightIcon={iconNote}
        leftHeadline="Presentations"
        rightHeadline="White Papers"
        leftText="Etiam vitae dolor eu felis porttitor placerat. In quam neque, euismod sed diam auctor."
        rightText="Etiam vitae dolor eu felis porttitor placerat. In quam dsrd dneque, euismod sed diam auctor."
        leftLink="/presentations"
        rightLink="/white-papers"
      />
      <Tile
        leftDark={true}
        leftIcon={iconShield}
        rightIcon={iconLock}
        leftHeadline="CVE advisory"
        rightHeadline="Disclosure Policy"
        leftText="Etiam vitae dolor eu felis porttitor placerat. In quam neque, euismod sed diam auctor."
        rightText="Etiam vitae dolor eu felis porttitor placerat. In quam dsrd dneque, euismod sed diam auctor."
        leftLink="/advisory"
        rightLink="/disclosure"
      />
      <Video playlist={true} />
      <Cta
        headline="Can’t find what you’re looking for?"
        text="No worries, maybe we can help you find the answer."
        ctaText="contact us"
        icon={envelope}
      />
      <PreFooter />
      <Footer />
    </div>
  );
};

export default Resource;