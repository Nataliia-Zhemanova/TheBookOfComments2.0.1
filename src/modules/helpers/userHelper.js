const {requestGql} = require('./generalHelper')
const {createUserArgs} = require('./args')
const {userCreateQuery} = require('./queries')


function createUser(){
    const postData = {
        query: userCreateQuery,
        variables: createUserArgs
    }
   return requestGql(postData)
}


module.exports = {createUser}