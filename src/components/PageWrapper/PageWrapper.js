import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const PageWrapper = ({ children, background, landing }) => {
  return (
    <>
      <Navbar background={background} landing={landing} />
      {children}
      <Footer landing={landing} />
    </>
  );
};

export default PageWrapper;
