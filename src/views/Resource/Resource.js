import React from 'react';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import Tile from '../../components/Tile/Tile';
import NavBar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import Cta from '../../components/Cta/Cta';
import Faq from '../../components/Faq/Faq';
import Video from '../../components/Video/Video';
import BlogBox from '../../components/BlogBox/BlogBox';
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
    <div id="top">
      <NavBar />
      <Title
        headline="resource hub"
        // text="Suspendisse potenti. Nunc imperdiet molestie elit, a auctor enim vestibulum rutrum. Aliquam non tempus elit. Mauris ut accumsan libero."
      />
      <div className="product-anchor-container">
        <div className="row">
          <div className="product-anchor-wrapper">
            <div className="product-anchor-item">
              <a href="#faq" className="product-anchor-link">
                <img
                  src={arrowDown}
                  alt="arrow-down"
                  className="product-anchor-img"
                />
                faq
              </a>
            </div>
            <div className="product-anchor-item">
              <a href="#github" className="product-anchor-link">
                <img
                  src={arrowDown}
                  alt="arrow-down"
                  className="product-anchor-img"
                />
                github
              </a>
            </div>
            <div className="product-anchor-item">
              <a href="#github" className="product-anchor-link">
                <img
                  src={arrowDown}
                  alt="arrow-down"
                  className="product-anchor-img"
                />
                tls certificates
              </a>
            </div>
            <div className="product-anchor-item">
              <a href="#blog" className="product-anchor-link">
                <img
                  src={arrowDown}
                  alt="arrow-down"
                  className="product-anchor-img"
                />
                blog
              </a>
            </div>
            <div className="product-anchor-item">
              <a href="#whitePapers" className="product-anchor-link">
                <img
                  src={arrowDown}
                  alt="arrow-down"
                  className="product-anchor-img"
                />
                Presentations & white papers
              </a>
            </div>
            <div className="product-anchor-item">
              <a href="#videos" className="product-anchor-link">
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
        leftText="Get the official technical documentation for all Search Guard versions."
        rightHeadline="Community forum"
        rightText="Any questions on installation or configuration? Ask our community forum."
        leftLink="https://docs.search-guard.com/latest/"
        rightLink="https://forum.search-guard.com/latest/"
        leftButtonTarget="_blank"
        rightButtonTarget="_blank"
      />
      <Faq />
      <BlogBox />
      <div id="github">
        <Tile
          leftDark={true}
          leftIcon={iconDownload}
          rightIcon={iconCertificate}
          leftHeadline="GitHub repo"
          leftText="Access, download and inspect all our code on GitHub, report any issue you find or request a feature."
          rightHeadline="TLS Certificate Generator"
          rightText="If you need TLS certificates for testing or a PoC, our generator web service is here to ease the pain."
          leftLink="https://github.com/floragunncom"
          rightLink="/tls-certificate-generator"
          leftButtonTarget="_blank"
        />
      </div>
      <div id="whitePapers">
        <Tile
          leftDark={false}
          leftIcon={iconSpeaker}
          rightIcon={iconNote}
          leftHeadline="Presentations"
          rightHeadline="White Papers"
          leftText="Browse our library of presentations on all Search Guard features."
          rightText="Download our whitepapers on Search Guard use cases and implementation examples."
          leftLink="/presentations"
          rightLink="/white-papers"
        />
      </div>
      <Tile
        leftDark={true}
        leftIcon={iconShield}
        rightIcon={iconLock}
        leftHeadline="CVE advisory"
        leftText="We are the official CVE numbering authority for Search Guard. Browse the list of known issues."
        rightHeadline="Disclosure Policy"
        rightText="If you have found a security related issue, please read our disclosure policy."
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