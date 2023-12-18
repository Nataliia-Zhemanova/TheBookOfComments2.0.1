const faker = require('faker')

const userCreateArg = {
    userInput: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName()
    }
}

module.exports = {userCreateArg}