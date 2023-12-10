const faker = require('faker')

const createUserArgs = {
    "userInput": {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
    }
}

const userGetAllArgs = {
    amount: 4
}

function userDeleteArgs(userId) {
    return {userId}
}

function userGetByIdArgs(userId){
    return {userId}
}

    module.exports = { createUserArgs, userGetAllArgs, userDeleteArgs, userGetByIdArgs }