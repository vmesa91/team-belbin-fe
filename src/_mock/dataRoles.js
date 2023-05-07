import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

export const dataRoles = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.name.jobType(),
  status: sample([
    'active',
    'inactive'])
}));


