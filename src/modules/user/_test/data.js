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




module.exports = { arg, arg2 }

