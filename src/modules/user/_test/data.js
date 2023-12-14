const faker = require('faker')

const arg = {
    userInput: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName()
    }
}

const argNeg = {
    userInput: {
        firstName: 3435435,
        lastName: 342323
    }
}

module.exports = { arg, argNeg }