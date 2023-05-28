import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const sympathy = [...Array(8)].map((_, index) => ({
  name: faker.name.fullName(),
  expertise: sample([
    ':D',
    ':)',
    ':|',
    ':/',
    ':(',
  ])
}))

const expertise = [...Array(10)].map((_, index) => ({
  tecnologies: sample([
    faker.name.jobDescriptor(),
    faker.name.jobDescriptor(),
    faker.name.jobDescriptor(),
    faker.name.jobDescriptor(),
    faker.name.jobDescriptor(),
    faker.name.jobDescriptor(),
    faker.name.jobDescriptor(),
    faker.name.jobDescriptor(),
    faker.name.jobDescriptor(),
    faker.name.jobDescriptor()
  ]),
  expertise: sample([
    '5',
    '4',
    '3',
    '2',
    '1',
  ])
}))



export const members = [...Array(10)].map((_, index) => ({
  _id: faker.datatype.uuid(),
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
  language: faker.address.country(),
  sympathy: sympathy,
  expertise: expertise
}));


