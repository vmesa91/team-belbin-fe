import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

export const dataTechnologies = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.name.jobDescriptor(),
  status: sample([
    'Active',
    'Inactive'])
}));


