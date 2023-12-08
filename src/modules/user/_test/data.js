const faker = require("faker")

const arg = {
    userInput: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName()
    }
}

const argUp = {
    userInput: {
        _id: '656c5bca4327ddaca2018fa8',
        firstName: 'abc',
        lastName: '123'
    }
}

const argDel = {
    userId: '656c4e0c969138b8700cdb05'
}

module.exports ={arg, argUp, argDel}