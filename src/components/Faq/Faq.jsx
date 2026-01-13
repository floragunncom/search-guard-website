import React from 'react';
import Button from '../Button/Button.jsx';
import sections from '../../Api/pagecontent/sections.json';
import './Faq.scss';
import Markdown from "markdown-to-jsx";

const Faq = () => {

  let faqs = sections.filter(section => section.sys.contentType.sys.id === "sectionTopFaq")[0];

  return (
    <div className="faq-wrapper" id="faq">
      <div className="row faq-row">
        <h3 className="faq-headline">Frequently asked questions</h3>
        <div className="faq-info-boxes">

          {faqs.fields.entries.map((faq, index) => (
              <div className="faq-info-box" key={index}>
                <div className="faq-info-box-headline">{faq.fields.question}</div>
                <div className="faq-info-box-text">
                  <Markdown>
                    { faq.fields.answer }
                  </Markdown>
                </div>
              </div>
          ))}

        </div>
        <div className="faq-button">
          <Button text="see more" link="/faq/" />
        </div>
      </div>
    </div>
  );
};

export default Faq;
