import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

export const dataKnowledges = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.name.jobArea(),
  status: sample([
    'Active',
    'Inactive'])
}));


