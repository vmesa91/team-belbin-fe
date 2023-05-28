import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

export const teams = [...Array(10)].map((_, index) => ({
  _id: faker.datatype.uuid(),
  name: sample([
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
  profile: faker.name.jobTitle(),
  member: faker.name.fullName(),
  language: faker.address.country()
}));


