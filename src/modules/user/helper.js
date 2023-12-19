const gqlEndPoint = 'http://localhost:5000/'
const request = require('supertest')

function gqlRequest(postData){
    return request(gqlEndPoint)
        .post('/')
        .send(postData)
}

module.exports = {gqlRequest}