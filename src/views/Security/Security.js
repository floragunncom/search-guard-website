import React from 'react';
import './Security.scss';
import Navbar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import Tile from '../../components/Tile/Tile';
import iconLock from '../../images/icon-multilayer-security.svg';
import iconShield from '../../images/icon-wheel-shield.svg';
import { Helmet } from 'react-helmet';

const Security = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Security Information - Search Guard</title>
        <meta
          name="description"
          // content="Get to know more about the Search Guard Editions and pricing. Fair licensing and secure your Elasticsearch cluster with an unlimited amount of nodes - scale your cluster not your costs."
        />
      </Helmet>
      <Navbar />
      <Title
        headline="Security information"
        text="You can use our public keys to send us confidential information and to verify the integrity of any Search Guard download."
      />
      <div className="row">
        <div className="col s12 l8 offset-l2 security-wrapper">
          <div className="security-headline">Search Guard Public Key</div>
          <div className="security-text">
            Fingerprint:
            <br />
            31DD 60A4 C976 2C29 D2C8 5407 7502 68B6 51ED B2FE
          </div>
          <div className="security-text">
            Type Bits/KeyID Date User ID
            <br />
            {
              'pub 2048/51EDB2FE 2015/05/23 Search Guard <infos@earch-guard.com>'
            }
            <br />
            <br />
            -----BEGIN PGP PUBLIC KEY BLOCK-----
            <br />
            mQENBFVgQXsBCADojqXC0F92Aw/4gC/K9N27H5RtEGAxRJI/VdUgYyQJldOsj8U7
            SSzyRBlHfSPL5tPITnYhN8E/0pbD4cew0Uir8/+OTVfnOKjFprZtqDLMfyd1gg8I
            Y/CZuncGZLJ4igK8FRq2WcE22TcKlgAK4ng8BQ6DBhttDzENviJ/auDBOUMZb3Cw
            6N2rSMZa/6bWaq9yo1iX+A8GKSH1nl+bdne2yGrOjh5PpAwYUY1kZBwo5HyVvw6q
            6uOsugOakd+cMkR/eaxDU1wjF8bR0n2fVE3Vs9uAP5xvTxC+FI4V8wsEiHA/XtIi
            bYttuBKqD0d0RxCObonoHoAbHFAha9es58RzABEBAAG0QVNlYXJjaCBHdWFyZCAo
            ZmxvcmFndW5uIFVHIC0gU2lnbmluZyBrZXkpIDxpbmZvQHNlYXJjaC1ndWFyZC5j
            b20+iQE5BBMBCAAjBQJVYEF7AhsDBwsJCAcDAgEGFQgCCQoLBBYCAwECHgECF4AA
            CgkQdQJotlHtsv5+vggAv2LGXPt/Fga5QOB//43CKpM6O3s535e8G+6pMRDklS1A
            msf7hK/ftspy3PQM0Y6EketKVZTYzID6Qt4qzFKviXz7sGZd7ZVizsR99Si6L3II
            K7JQlLbuuhGuDDRIN5rYDwG0YkzqvKqq1IOzw+Ce5PNRP3ZvYTAgAeI0KWAidbov
            ssMsl2iyjz52n35i40/k9Ees/xoPaBS7neB8713diT4vjGkvdCK28bdUM/0i9ysC
            gd+tAqcP9WN9QvObI+lf6OenvyfAE93nX07tfRGfJ9uX8EHKyH+hlZtfIXOlddUj
            5kSVZX/HghWSi/y3Tye1DGdiHFG70pwYFXdIZKq6tLkBDQRVYEF7AQgAupnETjd1
            QPowocjZH9opy8BlWCeZnwDwQ1FMxXffSpU/nzDlG5FTFN8mXN2tMwhsl2jvofJ0
            3BYAGOixqLgXT+qnjVeshob6hVnz3t0MnQUefAJI92upbNcPf9NEgHoM9D5PV25t
            FXRHxDz8qotl8J4O/nQuVtI2gyq4eLVcj1lZHObqAf0oOlZ2zpvrMde7rgrtO8Vd
            ktMUYoQhunqh2FiXMvBBGYh38d36VYc7zOjUlpsCxRe6pnN6Mqg8IwmDuQBsarvL
            1uuEbhjxipKoUtxo2P+F9q9WuMgKoulv49Q85dQ+1/s0m+dn4OIoLoS6S63wrZ5P
            NZmadHxwFNieIQARAQABiQEfBBgBCAAJBQJVYEF7AhsMAAoJEHUCaLZR7bL+nYQI
            ALVFRj+sk9hf+oTq/HBGTOoSFMbpLOncLBZq1WQmUQaTNQPkjJ5G9VE58zbJmIJj
            XdwTB2HJeVM1YRxvsq8fsS2KuBmBhSsCurQ+wDl8BgOtRp3OuS2v6gRBQRLiqLDS
            GGdr0X9m/RwGuXmIzK7FVrvRlg2CLqPql+yW/U1IUeI2LSlauciivbcWpu7H6208
            Us90eOsnsMAY7TXYHgOemko7szfbLH/KAEE80IfRdttSMJy6ZMS/+8aCtVNpdIfN
            6TsGd3Ry4WdQh1vOj6tWCm0GAcfNYWqyPaVGQ0GR5rNX4ZISA1WDsHntrbCB4F8W
            KLAJNEiQkUkRNiV7RFpzhyU=
            <br />
            =AvUC
            <br />
            -----END PGP PUBLIC KEY BLOCK-----
          </div>
          <div className="security-headline">
            Search Guard Code Signing Public Key
          </div>
          <div className="security-text">
            Fingerprint:
            <br />
            78C3 8BCB A7B7 02D5 E21C 50C3 173B 35E4 4A61 C8AE
          </div>
          <div className="security-text">
            Type Bits/KeyID Date User ID
            <br />
            pub 4096/4A61C8AE 2018/05/29 floragunn - Search Guard (CODE SIGNING
            KEY)
            {/* <info@search-guard.com> */}
          </div>
          <div className="security-text">
            Type Bits/KeyID Date User ID
            <br />
            {/* pub 2048/51EDB2FE 2015/05/23 Search Guard <info/u0040search-guard.com><br /> */}
            <br />
            -----BEGIN PGP PUBLIC KEY BLOCK-----
            <br />
            mQENBFVgQXsBCADojqXC0F92Aw/4gC/K9N27H5RtEGAxRJI/VdUgYyQJldOsj8U7
            SSzyRBlHfSPL5tPITnYhN8E/0pbD4cew0Uir8/+OTVfnOKjFprZtqDLMfyd1gg8I
            Y/CZuncGZLJ4igK8FRq2WcE22TcKlgAK4ng8BQ6DBhttDzENviJ/auDBOUMZb3Cw
            6N2rSMZa/6bWaq9yo1iX+A8GKSH1nl+bdne2yGrOjh5PpAwYUY1kZBwo5HyVvw6q
            6uOsugOakd+cMkR/eaxDU1wjF8bR0n2fVE3Vs9uAP5xvTxC+FI4V8wsEiHA/XtIi
            bYttuBKqD0d0RxCObonoHoAbHFAha9es58RzABEBAAG0QVNlYXJjaCBHdWFyZCAo
            ZmxvcmFndW5uIFVHIC0gU2lnbmluZyBrZXkpIDxpbmZvQHNlYXJjaC1ndWFyZC5j
            b20+iQE5BBMBCAAjBQJVYEF7AhsDBwsJCAcDAgEGFQgCCQoLBBYCAwECHgECF4AA
            CgkQdQJotlHtsv5+vggAv2LGXPt/Fga5QOB//43CKpM6O3s535e8G+6pMRDklS1A
            msf7hK/ftspy3PQM0Y6EketKVZTYzID6Qt4qzFKviXz7sGZd7ZVizsR99Si6L3II
            K7JQlLbuuhGuDDRIN5rYDwG0YkzqvKqq1IOzw+Ce5PNRP3ZvYTAgAeI0KWAidbov
            ssMsl2iyjz52n35i40/k9Ees/xoPaBS7neB8713diT4vjGkvdCK28bdUM/0i9ysC
            gd+tAqcP9WN9QvObI+lf6OenvyfAE93nX07tfRGfJ9uX8EHKyH+hlZtfIXOlddUj
            5kSVZX/HghWSi/y3Tye1DGdiHFG70pwYFXdIZKq6tLkBDQRVYEF7AQgAupnETjd1
            QPowocjZH9opy8BlWCeZnwDwQ1FMxXffSpU/nzDlG5FTFN8mXN2tMwhsl2jvofJ0
            3BYAGOixqLgXT+qnjVeshob6hVnz3t0MnQUefAJI92upbNcPf9NEgHoM9D5PV25t
            FXRHxDz8qotl8J4O/nQuVtI2gyq4eLVcj1lZHObqAf0oOlZ2zpvrMde7rgrtO8Vd
            ktMUYoQhunqh2FiXMvBBGYh38d36VYc7zOjUlpsCxRe6pnN6Mqg8IwmDuQBsarvL
            1uuEbhjxipKoUtxo2P+F9q9WuMgKoulv49Q85dQ+1/s0m+dn4OIoLoS6S63wrZ5P
            NZmadHxwFNieIQARAQABiQEfBBgBCAAJBQJVYEF7AhsMAAoJEHUCaLZR7bL+nYQI
            ALVFRj+sk9hf+oTq/HBGTOoSFMbpLOncLBZq1WQmUQaTNQPkjJ5G9VE58zbJmIJj
            XdwTB2HJeVM1YRxvsq8fsS2KuBmBhSsCurQ+wDl8BgOtRp3OuS2v6gRBQRLiqLDS
            GGdr0X9m/RwGuXmIzK7FVrvRlg2CLqPql+yW/U1IUeI2LSlauciivbcWpu7H6208
            Us90eOsnsMAY7TXYHgOemko7szfbLH/KAEE80IfRdttSMJy6ZMS/+8aCtVNpdIfN
            6TsGd3Ry4WdQh1vOj6tWCm0GAcfNYWqyPaVGQ0GR5rNX4ZISA1WDsHntrbCB4F8W
            KLAJNEiQkUkRNiV7RFpzhyU=
            <br />
            =AvUC
            <br />
            -----END PGP PUBLIC KEY BLOCK-----
          </div>
          <div className="security-headline">Security Issues</div>
          <div className="security-plain-text">
            Please report any security issues and findings via:{' '}
            <a href="mailto:security@search-guard.com?Subject=Security%20Issue%20Search-Guard">
              security@search-guard.com
            </a>
          </div>
        </div>
      </div>
      <Tile
        leftIcon={iconShield}
        rightIcon={iconLock}
        leftHeadline="CVE advisory"
        rightHeadline="Disclosure Policy"
        leftText="Etiam vitae dolor eu felis porttitor placerat. In quam neque, euismod sed diam auctor."
        rightText="Etiam vitae dolor eu felis porttitor placerat. In quam dsrd dneque, euismod sed diam auctor."
        leftLink="/cve-advisory"
        rightLink="/disclosure-policy"
      />
      <PreFooter />
      <Footer />
    </div>
  );
};

export default Security;
