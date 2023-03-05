

import sanityClient from '@sanity/client';





 const client = sanityClient({
  projectId: '1b3e4v4k',
  dataset: 'production',
  apiVersion: '2022-11-26',
  useCdn: true,
 
  token: process.env.REACT_APP_SANITY_TOKEN
});


 

export default client;

