const faker = require('faker')

function userCreateArgs(firstName=faker.name.firstName(), lastName=faker.name.lastName()){
    return {
        "userInput": {
            firstName,
            lastName,
        }
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

    module.exports = { userCreateArgs, userGetAllArgs, userDeleteArgs, userGetByIdArgs }