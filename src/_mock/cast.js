import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const casts = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  gender:faker.name.gender(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  role: sample([
    'Actor','Director','DOP','Camera Man','Crew','Writer'
  ]),
}));

export default casts;