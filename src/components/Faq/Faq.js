import React from 'react';
import Button from '../Button/Button';
import sections from '../../Api/pagecontent/sections.json';
import './Faq.scss';
import Markdown from "markdown-to-jsx";
const Faq = () => {

  let faqs = sections.filter(section => section.sys.contentType.sys.id === "sectionTopFaq")[0];

  return (
    <div className="faq-wrapper" id="faq">
      <div className="row faq-row">
        <div className="faq-headline">Frequently asked questions</div>
        <div className="faq-info-boxes">
            {faqs.fields.entries.map(faq => {
                    return (
                        <div className="faq-info-box">
                          <div className="faq-info-box-headline">{faq.fields.question}</div>
                          <div className="faq-info-box-text">
                            <Markdown>
                              { faq.fields.answer }
                            </Markdown>
                          </div>
                        </div>
                    );
                })}
        </div>
        <div className="faq-button">
          <Button text="see more" link="/faq/" />
        </div>
      </div>
    </div>
  );
};

export default Faq;
