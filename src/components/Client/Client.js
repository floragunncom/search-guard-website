import {createClient} from 'contentful';

const client = createClient({
  // space: process.env.REACT_APP_CONTENTFUL_SPACE,
  // accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
  space: '95di84mqkkro',
  accessToken:
    'e374194597d1e72907428441d7ffe9f2ef9486dc92b23a733d9ca02d87e4da3c',
});

export default client;
