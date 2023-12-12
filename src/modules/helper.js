const request = require ('supertest')
const graphQLEndpoint = 'http://localhost:5000/graphql'
function requestGql(postData){
    return request(graphQLEndpoint)
        .post('/')
        .send(postData)
}

module.exports = { requestGql }

