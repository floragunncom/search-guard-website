import React, { Component } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import client from '../../components/Client/Client';
import WhitePaper from './WhitePaper';

class WhitePapers extends Component {
  constructor() {
    super();
    this.state = {
      whitePapers: [],
    };
  }

  componentDidMount() {
    client.getEntries({ content_type: 'whitePaper' }).then((response) => {
      this.setState({ whitePapers: response.items });
    });
  };

  render() {
    const whitePapers = this.state.whitePapers.map((whitePaper, index) => {
      return (
        <div className="col s12 whitepaper-column-wrapper">
          <WhitePaper key={index} whitePaper={whitePaper} />
        </div>
      );
    });

    return (
      <div>
        <NavBar />
        <Title
          headline="White Papers"
          text="As the pioneers in securing Elasticsearch clusters, all decisions about our technology have the same purpose, to make your Elasticsearch environment more secure."
        />
        <div className="whitepaper-wrapper">
          <div className="row">{whitePapers}</div>
        </div>
        <PreFooter />
        <Footer />
      </div>
    );
  }
}

export default WhitePapers;
