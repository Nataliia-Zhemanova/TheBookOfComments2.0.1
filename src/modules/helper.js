 GQL02-userGetById-APItest-Murzabayev
const request = require ('supertest')
const graphQLEndpoint = 'http://localhost:5000/graphql'
function requestGql(postData){

const request = require('supertest')
const graphQLEndpoint = 'http://localhost:5000/graphql'

function requestGql (postData) {
 main
    return request(graphQLEndpoint)
        .post('/')
        .send(postData)
}

module.exports = { requestGql }

