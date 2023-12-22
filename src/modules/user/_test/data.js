const faker = require("faker")

const arg = {
    userInput: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
    }
}

GQL01-userCreate-APItest-Jalalov
const userIncorrectType  = {
    userInput: {
        firstName: faker.name.firstName(),
        lastName: 123,
    }
}

module.exports = {arg, userIncorrectType}
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
main
