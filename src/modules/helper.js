const request = require ("supertest")
const qraphQLEndpoint = 'http://localhost:5000/graphql'

function requestGql(postData) {
    return request(qraphQLEndpoint)
          .post('/')
          .send(postData)
}

module.exports = {requestGql}

