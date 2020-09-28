import React from 'react';
import './Title.scss';
import iconIn from "../../images/icon-in-loud.svg";

const Title = ({ headline, text, breadcrumb }) => {
  return (
    <div className="title-wrapper-style">

      <div className="row">

          {breadcrumb ?
              <div itemScope itemType="https://schema.org/BreadcrumbList" className="col s12 center breadcrumblist">
                  {

                      breadcrumb.map((item, i) => {
                            const separator = (i == breadcrumb.length - 1? "" : " >")
                          return (
                              <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                                  <a itemProp="item" href={item.anchor} className="title-breadcrumb-item">
                                      <span itemProp="name">{item.name}{separator}</span>
                                      <meta itemProp="position" content={i + 1}/>
                                  </a>
                              </span>
                          );
                      })

                  }
              </div>
              : ""
          }

        <h1 className="title-headline-style">{headline}</h1>
        <h2 className="title-text-style">{text}</h2>


      </div>
    </div>
  );
};

export default Title;
