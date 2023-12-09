const faker = require("faker")

const arg = {
    userInput: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
    }
}

module.exports = {arg}