import { createClient } from 'contentful';

const client = createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: '95di84mqkkro',
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: 'e374194597d1e72907428441d7ffe9f2ef9486dc92b23a733d9ca02d87e4da3c',
});

export default client;
