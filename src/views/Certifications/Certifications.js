import React from 'react';
import './Certifications.scss';
import NavBar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import Cta from '../../components/Cta/Cta';
import ctaIcon from '../../images/cta-banner-arrow.svg';
import veracode from '../../images/veracode.svg';
import alliance from '../../images/alliance.svg';
import security from '../../images/security.svg';
import pdf from '../../images/pdf-download.svg';

const Certifications = () => {
  const certificates = [
    {
      headline: 'Veracode',
      image: veracode,
      text:
        'Etiam vitae dolor eu felis porttitor placerat. In quam neque, euismod sed diam auctor, pretium lacinia diam. Quisque ut eros sit amet ex convallis condimentum lobortis eu ante. Integer fermentum et ipsum sit amet vestibulum. Nunc eu augue ullamcorper, ornare nibh maximus, dapibus leo. Vivamus quis ullamcorper nunc, non scelerisque metus. Praesent convallis tempus nisl, cursus condimentum tellus malesuada eu.',
      links: [
        { name: 'Download Report 23.09.19', link: '/' },
        { name: 'Download Report 23.09.19', link: '/' },
        { name: 'Download Report 23.09.19', link: '/' },
        { name: 'Download Report 23.09.19', link: '/' },
      ],
    },
    {
      headline: 'Allianz für Cyber-Sicherheit',
      image: alliance,
      text:
        'Etiam vxixtae dolor eu felis porttitor placerat. In quam neque, euismod sed diam auctor, pretium lacinia diam. Quisque ut eros sit amet ex convallis condimentum lobortis eu ante. Integer fermentum et ipsum sit amet vestibulum. Nunc eu augue ullamcorper, ornare nibh maximus, dapibus leo. Vivamus quis ullamcorper nunc, non scelerisque metus. Praesent convallis tempus nisl, cursus condimentum tellus malesuada eu. Etiam vitae dolor eu felis porttitor placerat.In quam neque, euismod sed diam auctor, pretium lacinia diam.Quisque ut eros sit amet ex convallis condimentum lobortis eu ante.Integer fermentum et ipsum sit amet vestibulum.Nunc eu augue ullamcorper, ornare nibh maximus, dapibus leo.Vivamus quis ullamcorper nunc, non scelerisque metus.Praesent convallis tempus nisl, cursus condimentum tellus malesuada eu.',
      links: [],
    },
    {
      headline: 'TeleTrustT',
      image: security,
      text:
        'Etiam vitae dolor eu felis porttitor placerat. In quam neque, euismod sed diam auctor, pretium lacinia diam. Quisque ut eros sit amet ex convallis condimentum lobortis eu ante. Integer fermentum et ipsum sit amet vestibulum. Nunc eu augue ullamcorper, ornare nibh maximus, dapibus leo. Vivamus quis ullamcorper nunc, non scelerisque metus. Praesent convallis tempus nisl, cursus condimentum tellus malesuada eu.',
      links: [
        { name: 'Download Report 23.09.19', link: '/' },
        { name: 'Download Report 23.09.19', link: '/' },
      ],
    },
  ];

  return (
    <div>
      <NavBar />
      <Title
        headline="Certifications"
        text="Suspendisse potenti. Nunc imperdiet molestie elit, a auctor enim vestibulum rutrum. Aliquam non tempus elit. Mauris ut accumsan libero."
      />
      <div className="row certifications-wrapper">
        {certificates.map(certificate => {
          return (
            <div>
              <div className="certifications-item-wrapper">
                <div className="col s12 certifications-headline">
                  {certificate.headline}
                </div>
                <div className="col s12 m3 certifications-image">
                  <img src={certificate.image} alt={certificate.image} />
                </div>
                <div className="col s12 m8 certifications-context">
                  <div className="col s12 certifications-text">
                    {certificate.text}
                  </div>
                  <div className="col s12 certifications-button-wrapper">
                    {certificate.links.map(link => {
                      return (
                        <div className="col s12 l6 certifications-button">
                          <div className="certifications-button-text">
                            {link.name}
                          </div>
                          <img src={pdf} alt={pdf} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col s12 certifications-bottom-line" />
            </div>
          );
        })}
      </div>
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

export default Certifications;
