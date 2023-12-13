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

const argN1 = {
      userInput: {
          firstName: "",
          lastName: "",
      },
};


module.exports = { arg, arg2, argN1 }

