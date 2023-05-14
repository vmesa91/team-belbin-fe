import { faker } from "@faker-js/faker";

export const dataCountries = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name:faker.address.country()
}))