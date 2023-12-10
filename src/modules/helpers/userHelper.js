const {requestGql} = require('./generalHelper')
const {createUserArgs, userGetAllArgs, userDeleteById} = require('./args')
const {userCreateQuery, userGetAll, userGetAllQuery, userDeleteQuery} = require('./queries')


function createUser(){
    const postData = {
        query: userCreateQuery,
        variables: createUserArgs
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

function deleteUserById(userId){
    const postData = {
        query: userDeleteQuery,
        variables: userDeleteById
    }
    return requestGql(postData)
}




module.exports = {createUser, getAllUsers, deleteUserById}