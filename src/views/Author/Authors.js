import React from 'react';
import {Helmet} from 'react-helmet-async';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import PreFooter from '../../components/PreFooter/PreFooter';
import Title from "../../components/Title/Title";
import { usePageData } from '../../context/PageDataContext';

const Authors = ({ match }) => {
  const pageData = usePageData();
  const persons = pageData?.persons || [];
  const pageTitle = 'A list of all Search Guard Authors contributing to our blog';
  const pageDescription = 'A list of all Search Guard Authors that are contributing to our blog and documentation.';
  const canonicalUrl = 'https://search-guard.com/authors/';

  return (
      <PageWrapper>
        <Helmet>
          <meta charSet="utf-8"/>
          <title>{pageTitle}</title>
          <link
              rel="canonical"
              href={canonicalUrl}
          />

          <meta name="description" content={pageDescription}/>

          <meta property="og:title" content={pageTitle}/>
          <meta property="og:url" content={canonicalUrl}/>
          <meta property="og:description" content={pageDescription}/>
          <meta property="og:locale" content="en_US"/>

          <meta name="twitter:card" content="summary_large_image"/>
          <meta name="twitter:site" content="@searchguard"/>
          <meta name="twitter:creator" content="@searchguard"/>
          <meta name="twitter:title" content={pageTitle}/>
          <meta name="twitter:description" content={pageDescription}/>


        </Helmet>

        <Title
            headline="Our Authors"
            text="A list of all Search Guard Authors"
        />

        <div>
          {persons.map(person => {

            return (
                <div className="authors-wrapper">
                  <div className="row">
                    <div className="col s12 offset-l2 l5">
                      <div className="authors-pic">
                        <img loading="lazy" src={`https:${person.fields.avatar.fields.file.url}?w=250&fit=scale`}
                             alt={`${person.fields.firstName} ${person.fields.lastName}`} width={200}/>
                      </div>
                    </div>
                    <div className="col s12 l5">
                      <div className="authors-headline">
                        {person.fields.firstName} {person.fields.lastName}
                      </div>
                      <div className="authors-position">
                        {person.fields.position}
                      </div>
                      <div className="authors-description">
                        {person.fields.shortDescription}
                      </div>
                      <div className="authors-position">
                        <a href={`/author/${person.fields.slug}`} rel="author">View {person.fields.firstName}&apos;s Profile</a>
                      </div>
                    </div>
                  </div>
                </div>
            );
          })};
        </div>

        <PreFooter/>

      </PageWrapper>
  );
}
export default Authors;
