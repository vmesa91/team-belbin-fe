import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

export const dataTechnologies = [...Array(10)].map((_, index) => ({
  _id: faker.datatype.uuid(),
  name: faker.name.jobDescriptor(),
  activation: sample([
    true,
    false])
}));


