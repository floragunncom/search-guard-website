import { createClient } from 'contentful';
// import { CONTENTFUL_SPACE, CONTENTFUL_ACCESS_TOKEN } from '../../credentials';

const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
});

export default client;
