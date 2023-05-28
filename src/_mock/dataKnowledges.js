import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

export const dataKnowledges = [...Array(10)].map((_, index) => ({
  _id: faker.datatype.uuid(),
  name: faker.name.jobArea(),
  activation: sample([
    true,
    false])
}));


