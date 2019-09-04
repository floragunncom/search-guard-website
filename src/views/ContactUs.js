import React from 'react';
import './contactUs.scss';
import Footer from '../components/Footer/Footer';
import NavBar from '../components/NavBar/NavBar';
import Title from '../components/Title/Title';
import PreFooter from '../components/PreFooter/PreFooter';
import Cta from '../components/Cta/Cta';
import folderGlass from '../images/folder-glass.svg';
import ContactForm from '../components/ContactForm';
import { Helmet } from 'react-helmet';

const ContactUs = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Contact the Search Guard team - get in touch with us</title>
        <meta
          name="description"
          content="Any questions regarding Search Guard licensing or pricing? Do you need OEM licenses or want to partner with us? Please fill out the contact form and we will get back to you as soon as possible."
        />
      </Helmet>
      <NavBar />
      <Title
        headline="Get in touch"
        text="Any questions regarding Search Guard licensing or pricing? Do you need OEM licenses or want to partner with us? Please fill out the contact form and we will get back to you as soon as possible."
      />
      <ContactForm />
      <Cta
        headline="Explore the resource hub"
        text="From documentation and blog posts, to FAQs and more about our TLS certificate generator, take a look at our resource hub."
        ctaText="see ressource hub"
        icon={folderGlass}
      />
      <PreFooter />
      <Footer />
    </div>
  );
}

export default ContactUs;