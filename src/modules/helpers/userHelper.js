const {requestGql} = require('./generalHelper')
const {createUserArgs, userGetAllArgs} = require('./args')
const {userCreateQuery, userGetAll, userGetAllQuery} = require('./queries')


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


module.exports = {createUser, getAllUsers}