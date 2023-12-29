const faker = require('faker')

function userCreateArgs(firstName=faker.name.firstName(), lastName=faker.name.lastName()){
    return {
        "userInput": {
            firstName,
            lastName,
        }
    }
}

function userGetByIdArgs(userId){
    return {userId}
}

function userGetAllArgs(amount=4) {
    return{amount: amount}
}

function userDeleteArgs(userId) {
    return {userId}
}



module.exports = { userCreateArgs, userGetAllArgs, userDeleteArgs, userGetByIdArgs }