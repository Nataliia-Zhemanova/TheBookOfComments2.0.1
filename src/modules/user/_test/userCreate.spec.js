const request = require ('supertest')
const { expect } = require('chai')
const graphQLEndpoint = 'http://localhost:5000/graphql'

describe('USER CREATE', () => {

  describe('USER CREATE - POSITIVE', () => {
    it('user create', (done) => {
      const arg = {
        userInput: {
          firstName: 'firstName1',
          lastName: 'lastName1'
        }
      }
      const postData = {
        query: `mutation UserCreate($userInput: UserItems) {
  userCreate(userInput: $userInput) {
    _id
    firstName
    lastName
  }
}`,
        variables: arg
      }

      request(graphQLEndpoint)
        .post('/')
        .send(postData)
        .expect(200)
        .end((err, res) => {
          if(err) return done(err);
          const respData = res.body.data
          console.log("RESP BODY ===", respData)
          expect(respData.userCreate.firstName).eq('firstName1')
          expect(respData.userCreate.lastName).eq('lastName1')
          done()
        })
    })
  })

  describe('USER CREATE - NEGATIVE', () => {
  })
})