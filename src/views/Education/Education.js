import React from 'react';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import './Education.scss';

const Education = () => {
  return (
    <div>
      <NavBar />
      <Title
        headline="Education program"
        text="Suspendisse potenti. Nunc imperdiet molestie elit, a auctor enim vestibulum rutrum. Aliquam non tempus elit. Mauris ut accumsan libero."
      />
      <PreFooter />
      <Footer />
    </div>
  );
}

export default Education;