const faker = require('faker');
const arg = {
    userInput: {
        lastName: faker.name.lastName(),
        firstName: faker.name.firstName()
    }
}
module.exports = { arg }