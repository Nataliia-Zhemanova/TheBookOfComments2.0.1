const faker = require("faker");

const arg = {
  userInput: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  },
};

const argEmptyFirstName = {
  userInput: {
    firstName: null,
    lastName: faker.name.lastName(),
  },
};

const argNumLastName = {
  userInput: {
    firstName: faker.name.firstName(),
    lastName: 253,
  },
};

const argExtraData = {
  userInput: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    middleName: faker.name.middleName(),
  },
};

module.exports = { arg, argEmptyFirstName, argNumLastName, argExtraData };
