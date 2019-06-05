import React from 'react';
import './DataProtection.scss';
import Navbar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';

const DataProtection = () => {
  return (
    <div>
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
