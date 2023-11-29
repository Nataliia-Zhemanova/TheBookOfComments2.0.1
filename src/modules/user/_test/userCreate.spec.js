const request = require('supertest')
const { expect } = require('chai')
const graphQLEndpoint = 'http://localhost:5000/graphql'

describe('USER CREATE', () => {
    describe('USER CREATE - POSITIVE', () => {
        let userId = null
        it('user create', (done) => {
            const arg = {
                userInput: {
                    lastName: 'lastName1',
                    firstName: 'firstName1'
                }
            }
            const postData = {
                query: `mutation UserCreate($userInput: UserItems) {
  userCreate(userInput: $userInput) {
    lastName
    firstName
    _id
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
                    userId = respData.userCreate._id
                    console.log("resp body===",respData)
                    console.log("resp id===",userId)
                    expect(respData.userCreate.firstName).eq('firstName1')
                    expect(respData.userCreate.lastName).eq('lastName1')
                    done()
                })
        })
    })
    describe('USER CREATE - NEGATIVE', () => {

    })
})