const {requestGql} = require('./generalHelper')
const {createUserArgs, userGetAllArgs, userDeleteArgs} = require('./args')
const {userCreateQuery, userGetAllQuery, userDeleteQuery} = require('./queries')


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

function deleteUser(userId){
    const postData = {
        query: userDeleteQuery,
        variables: userDeleteArgs(userId)
    }
    return requestGql(postData)
}




module.exports = {createUser, getAllUsers, deleteUser}