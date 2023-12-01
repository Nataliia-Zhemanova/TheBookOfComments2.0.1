const request = require('supertest')
const graphQLEndpoint = 'http://localhost:5000/graphql'


function requestGql() {
    return request(graphQLEndpoint)
        .post('/')
        .send(postData)
}

module.export = { requestGql }