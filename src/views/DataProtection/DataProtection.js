import React from 'react';
import './DataProtection.scss';
import Navbar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import { Helmet } from 'react-helmet';

const DataProtection = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Datenschutz - Search Guard</title>
        <meta
          name="description"
          // content="Our mission is to shape IT security and Open Source business models. From day 1 until today, we follow our principles of putting security first and providing no-nonsense IT."
        />
      </Helmet>
      <Navbar />
      <Title
        headline="Data Protection"
        text="Suspendisse potenti. Nunc imperdiet molestie elit, a auctor enim vestibulum rutrum. Aliquam non tempus elit. Mauris ut accumsan libero."
      />
      <PreFooter />
      <Footer />
    </div>
  );
};

export default DataProtection;
