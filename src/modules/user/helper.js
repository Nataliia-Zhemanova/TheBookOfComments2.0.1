const request = require('supertest')
const graphQlEndpoint = 'http://localhost:5000/graphql'
function gqlRequest(postData){
  return request(graphQlEndpoint)
      .post('/')
      .send(postData)
}
module.exports = {gqlRequest}