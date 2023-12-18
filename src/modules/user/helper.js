const request = require('supertest')
const graphQlEndpoint = 'http://localhost:5000/'
function gqlRequest(postData){
  return request(graphQlEndpoint)
      .post('/')
      .send(postData)
}
module.exports = {gqlRequest}