const request = require('supertest')
const graphQLEndpoint = 'http://localhost:5000/graphql'
function requestGql(postCreateData){
    return request(graphQLEndpoint)
        .post('/')
        .send(postCreateData)
        .expect(200)
}

module.exports = { requestGql }