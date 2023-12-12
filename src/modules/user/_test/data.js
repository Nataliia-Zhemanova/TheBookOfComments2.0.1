const faker = require('faker');

const userInput = {
    userInput: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
    }
}
module.exports = { userInput, }