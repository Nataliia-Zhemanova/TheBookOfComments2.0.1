const {requestGql} = require('./generalHelper')
const {createUserArgs, userGetAllArgs, userDeleteArgs, userGetByIdArgs} = require('./args')
const {userCreateQuery, userGetAllQuery, userDeleteQuery, userGetByIdQuery} = require('./queries')
const faker = require("faker");


function createUser(){
    const postData = {
        query: userCreateQuery,
        variables: createUserArgs
    }
   return requestGql(postData)
}

function createNegativeUser(firstName, lastName){
    const postData = {
        query: userCreateQuery,
        variables: {
            "userInput": {
                firstName,
                lastName,
            }
        }
    }
    return requestGql(postData)
}

function getAllUsers(){
    const postData = {
        query: userGetAllQuery,
        variables: userGetAllArgs
    }
    return requestGql(postData)
}

function deleteUser(userId){
    const postData = {
        query: userDeleteQuery,
        variables: userDeleteArgs(userId)
    }
    return requestGql(postData)
}

function getUserById(userId){
    const postData = {
        query: userGetByIdQuery,
        variables: userGetByIdArgs(userId)
    }
    return requestGql(postData)
}




module.exports = {createUser, getAllUsers, deleteUser, getUserById, createNegativeUser}