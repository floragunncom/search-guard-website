import React from 'react';
import Navbar from '../Header/Header';
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
