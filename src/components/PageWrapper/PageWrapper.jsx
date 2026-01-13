import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';

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
