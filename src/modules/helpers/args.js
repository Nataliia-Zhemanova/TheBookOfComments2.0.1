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

// to to refactor
const userDeleteById = {
    userId: this.userId
}

// const getUserByIdArgs = {
//     userId: userId
// }

    module.exports = { createUserArgs, userGetAllArgs, userDeleteById }