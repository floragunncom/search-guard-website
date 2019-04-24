import React, { Component } from 'react';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import './License.scss';

class License extends Component {
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

export default License;