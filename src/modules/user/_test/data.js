const faker = require('faker')
// import {} from .. to finish
const arg = {
    userInput: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
    },
};
const arg2  = {
    amount: 3,
};
const arg2N = {
    amount: 'hello',
};
const argN1 = {
      userInput: {
          firstName: 555,
          lastName: faker.name.lastName(),
      },
};

module.exports = { arg, arg2, argN1, arg2N }

