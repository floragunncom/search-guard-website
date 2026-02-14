import React from 'react';
import Button from "../Button/Button";

const Title = ({ headline, text, breadcrumb, buttonstyle, buttontext, buttonlink, buttontarget, titlestyle }) => {

    let titleWrapperStyle = "title-wrapper-style";
    let titleHeadlineStyle = "title-headline-style";
    let titleTextStyle = "title-text-style";
    // let breadcrumbStyle = "title-text-style";
    // let breadcrumbItemStyle = "title-breadcrumb-item";
    let buttonWrapperStyle="col s4 offset-s4 title-button-wrapper"

    if (titlestyle === 'flx') {
        titleHeadlineStyle = 'title-headline-style-flx';
        titleTextStyle = 'title-text-style-flx';
        buttonWrapperStyle="col s4 title-button-wrapper"
    }

    if (titlestyle === 'heise') {
        titleWrapperStyle = "title-wrapper-style-heise";
        titleHeadlineStyle = 'title-headline-style-heise';
        titleTextStyle = 'title-text-style-heise';
    }

    return (
    <div className={titleWrapperStyle}>

      <div className="row">

          {breadcrumb ?
              <div itemScope itemType="https://schema.org/BreadcrumbList" className="col s12 center">
                  {

                      breadcrumb.map((item, i) => {
                            const separator = (i === breadcrumb.length - 1? "" : " >")
                          return (
                              <span key={i} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
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

        <h1 lang="en" className={titleHeadlineStyle} dangerouslySetInnerHTML={{__html: headline}}></h1>
        <h2 className={titleTextStyle} dangerouslySetInnerHTML={{__html: text}}></h2>
          {buttontext ?
              <div className={buttonWrapperStyle}>
                  <Button
                      text={buttontext}
                      buttonStyle={buttonstyle}
                      link={buttonlink}
                      target={buttontarget}
                  />
              </div>
              : ""
          }
      </div>
    </div>
  );
};

export default Title;
