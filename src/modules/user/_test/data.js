const faker = require('faker')

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

const usersGetAllArg = {
    amount: 10
}

module.exports = { arg, wrongArg, usersGetAllArg }