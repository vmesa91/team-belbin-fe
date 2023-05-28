import { faker } from "@faker-js/faker";

export const dataCountries = [...Array(10)].map((_, index) => ({
  _id: faker.datatype.uuid(),
  name:faker.address.country()
}))