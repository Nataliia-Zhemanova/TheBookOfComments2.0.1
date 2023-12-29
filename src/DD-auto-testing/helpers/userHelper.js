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

function getUserById(userId, query = userGetByIdQuery()){
    const postData = {
        query: userGetByIdQuery(),
        variables: userGetByIdArgs(userId)
    }
    return requestGql(postData)
}


function userGetAll(amount){
    const postData = {
        query: userGetAllQuery(),
        variables: userGetAllArgs(amount)
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




module.exports = {createUser, userGetAll, deleteUser, getUserById,}