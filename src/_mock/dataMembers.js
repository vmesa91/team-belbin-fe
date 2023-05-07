import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

export const members = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  profile: faker.name.jobTitle(),
  team: sample([
    'Team 1',
    'Team 2',
    'Team 3',
    'Team 4',
    'Team 5',
    'Team 6',
    'Team 7',
    'Team 8',
    'Team 9',
    'Team 10',
    'Team 11',
    'Team 12',
    'Team 13',
    'Team 14',
    'Team 15',
    'Team 16',
    'Team 17'
  ]),
  language: faker.address.country()
}));


