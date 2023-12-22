const request = require('supertest')
const graphQLEndpoint = 'http://localhost:5000/graphql'

function requestGql (postData) {
    return request(graphQLEndpoint)
        .post('/')
        .send(postData)
}

GQL01-userCreate-APItest-Jalalov
module.exports = { requestGql }

module.exports = { requestGql }

main
