import React, { Component } from 'react';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import './Company.scss';

class Company extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <PreFooter />
        <Footer />
      </div>
    );
  }
}

export default Company;