const faker = require("faker")

const arg = {
    userInput: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
    }
}

const userInput = {
    userInput: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
    },
};

const userInvInput = {
    userInput: {
        firstName: 1,
        lastName: null,
    },
};

module.exports = { arg, userInput, userInvInput }
