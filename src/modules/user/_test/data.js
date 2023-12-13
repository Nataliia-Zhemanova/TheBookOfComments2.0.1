const faker = require('@faker-js/faker')

const arg = {
    userInput: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
    }
}

const wrongArg = {
    userInput: {
        firstName: 123,
        lastName: 123,
    }
}

module.exports = { arg, wrongArg }