const faker = require('faker')
// import {} from .. to finish
const arg = {
    userInput: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
    },
};

module.exports = { arg }