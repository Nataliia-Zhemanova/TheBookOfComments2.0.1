const faker = require('faker');
const arg = {
    userInput: {
        firstName: faker.name.lastName(),
        lastName: faker.name.firstName()
    }
}
const wrongArg = {
    userInput: {
        firstName: 123,
        lastName: 122
    }
}
module.exports = { arg, wrongArg }