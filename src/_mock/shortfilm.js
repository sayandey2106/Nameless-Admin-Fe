import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const shortfilm = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  thumbnail: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  link: "https://youtu.be/8bOJdr15_cU",
  genre: sample([
    'Thriller','Suspense','Drama'
  ]),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
}));

export default shortfilm;