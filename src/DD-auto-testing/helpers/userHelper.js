const {requestGql} = require('./generalHelper')
const {userCreateArgs, userGetAllArgs, userDeleteArgs, userGetByIdArgs} = require('./args')
const {userCreateQuery, userGetAllQuery, userDeleteQuery, userGetByIdQuery} = require('./queries')
const faker = require("faker");


function createUser(query = userCreateQuery(), variables=userCreateArgs()){
    const postData = {
        query,
        variables,
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




module.exports = {createUser, getAllUsers, deleteUser, getUserById,}