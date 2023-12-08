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

// const getUserByIdArgs = {
//     userId: userId
// }

    module.exports = { createUserArgs, userGetAllArgs }