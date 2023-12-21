const faker = require("faker")

const arg = {
    userInput: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
    }
}

const userIncorrectType  = {
    userInput: {
        firstName: faker.name.firstName(),
        lastName: 123,
    }
}

module.exports = {arg, userIncorrectType}