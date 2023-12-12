const faker = require('@faker-js/faker')

const arg = {
    userInput: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
    }
}

const wrongArg = {
    userInput: {
        firstName: '',
        lastName: faker.name.lastName(),
    }
}

module.exports = { arg, wrongArg }