const faker = require('faker');

const userInput = {

const arg = {
    userInput: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
    }
}

const wrongArg = {
    userInput: {
        firstName: 123,

module.exports = { userInput, }


const userIncorrectType  = {
    userInput: {
        firstName: faker.name.firstName(),
        lastName: 123,
    }
}

const usersGetAllArg = {
    amount: 10
}

module.exports = { arg, wrongArg, usersGetAllArg }

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

