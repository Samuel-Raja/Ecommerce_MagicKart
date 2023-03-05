import imageUrlBuilder from '@sanity/image-url';

import client from './lib/client';

const builder = imageUrlBuilder(client);

const urlFor = (source) => builder.image(source);

export default urlFor;


