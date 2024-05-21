import './Author.scss';
import persons from '../../Api/contentfulPersons.json';
import posts from '../../Api/contentfulPosts.json';
import React from 'react';
import  { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Markdown from 'markdown-to-jsx';
import PreFooter from '../../components/PreFooter/PreFooter';
import Blockquote from '../../components/Blockquote/Blockquote';
import Title from "../../components/Title/Title";
import BlogPostSmall from "../../components/BlogPost/BlogPostSmall";
const Author = ({ match }) => {

  const slug = match.url.split("/")[2] + "/";

  const person = persons.find(
      entry => entry.fields.slug === `${slug}`,
  );

  if (!person) {
    return (<Redirect to="/404/" />);
  }

  let postsOfAuthor = posts.filter(post => post.fields.authorProfile && post.fields.authorProfile.sys.id === person.sys.id);

  let postTiles;

  if (
      postsOfAuthor
  ) {
    postTiles = (
        <>
          <div className="authors-posts-wrapper authors-bio-headline">More Posts by {person.fields.firstName} {person.fields.lastName}</div>
          <div className="authors-posts-wrapper">
            {postsOfAuthor.map(post => {
              return <BlogPostSmall post={post} key={post.sys.id} intro/>;
            })}
        </div>
        </>
    );
  }


  const options = {
    overrides: {
      h1: {
        props: {
          className: 'blogpostarticle-headline1',
        },
      },
      h2: {
        props: {
          className: 'blogpostarticle-headline2',
        },
      },
      h3: {
        props: {
          className: 'blogpostarticle-headline3',
        },
      },
      p: {
        component: 'div',
        props: {
          className: 'blogpostarticle-text',
        },
      },
      b: {
        component: 'div',
        props: {
          className: 'bold',
        },
      },
      i: {
        component: 'div',
        props: {
          className: 'i',
        },
      },
      u: {
        component: 'div',
        props: {
          className: 'underline',
        },
      },
      code: {
        component: 'div',
        props: {
          className: 'blogpostarticle-code-snippet',
          id: 'post-code',
        },
      },
      a: {
        component: 'a',
        props: {
          className: 'blogpostarticle-link',
        },
      },
      li: {
        component: 'div',
        props: {
          className: 'blogpostarticle-listitem',
        },
      },
      img: {
        component: 'img',
        props: {
          className: 'blogpostarticle-image-wrapper blogpostarticle-image',
        },
      },
      blockquote: {
        component: Blockquote,
      },
    },
  };


  let socialMedia;

  socialMedia = (
      <div className="">
        {person.fields.socialNetworks.map(network => {
          return (
              <div className="authors-profiles">
                <a href={network.fields.url} style={{cursor: 'crosshair'}} rel="author">{network.fields.type}</a>
              </div>
          );
        })}
      </div>
  );

  return (
    <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{person.fields.firstName} {person.fields.lastName}</title>
        <link
          rel="canonical"
          href={`https://search-guard.com/authors/${person.fields.slug}`}
        />

        <meta name="description" content={person.fields.htmlDescription} />

        <meta property="og:title" content={`${person.fields.firstName} ${person.fields.lastName}`}/>
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://search-guard.com/${person.fields.slug}`} />
        <meta property="og:description" content={person.fields.htmlDescription}/>
        <meta property="og:image" content={`https:${person.fields.avatar.fields.file.url}`}/>
        <meta property="og:image:alt" content={`${person.fields.firstName} ${person.fields.lastName}`}/>
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:site" content="@searchguard"/>
        <meta name="twitter:creator" content="@searchguard"/>
        <meta name="twitter:title" content={`${person.fields.firstName} ${person.fields.lastName}`} />
        <meta name="twitter:description" content={person.fields.htmlDescription} />

        <meta name="twitter:image" content={`https:${person.fields.avatar.fields.file.url}`} />
        <meta name="twitter:image:src" content={`https:${person.fields.avatar.fields.file.url}`} />
        <meta name="twitter:image:alt" content={`https:${person.fields.avatar.fields.file.url}`} />

      </Helmet>

      <Title
          headline={`${person.fields.firstName} ${person.fields.lastName} `}
          text={`${person.fields.htmlDescription} `}
      />

      <div className="authors-wrapper">
        <div className="row">
                <div className="col s12 offset-l2 l5" >
                  <div className="authors-pic">
                    <img src={`https:${person.fields.avatar.fields.file.url}?w=300&fit=scale`} alt="{person.fields.htmlDescription}" />
                  </div>
                </div>
                <div className="col s12 l5" >
                  <div className="authors-headline">
                    {person.fields.firstName} {person.fields.lastName}
                  </div>
                  <div className="authors-position">
                    {person.fields.position}
                  </div>
                  <div className="authors-description">
                    {person.fields.shortDescription}
                  </div>
                  <div className="authors-profiles">
                    <a href={`mailto:${person.fields.email}`}>{person.fields.email}</a>
                  </div>
                  {socialMedia}
                </div>
          </div>
          <div className="row">
            <div className="col l12 authors-bio-headline">
              Biography
            </div>
          </div>
          <div className="row">
            <div className="col s12 offset-l2 l8 authors-bio-content">
              <Markdown options={options}>
                {person.fields.biography
                    .replace(/https:\/\/search-guard\.com/g, '')
                    .replace(/http:\/\/localhost:8080/g, '')}
              </Markdown>
            </div>
          </div>

        {postTiles}

      </div>

      <PreFooter />
      <script type="application/ld+json">{`
{
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "dateCreated": "${person.sys.createdAt}",
      "dateModified": "${person.sys.updatedAt}",
      "mainEntity": {
        "@type": "Person",
        "name": "${person.fields.firstName} ${person.fields.lastName}",
        "identifier": "${person.sys.id}",
        "description": "${person.fields.htmlDescription}",
        "image": "${person.fields.avatar.fields.file.url}"
      }
    }
`}</script>
    </PageWrapper>
  );
};

export default Author;
