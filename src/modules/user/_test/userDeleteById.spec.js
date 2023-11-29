const request = require('supertest')
const { expect } = require('chai')
const graphQLEndpoint = 'http://localhost:5000/graphql'

describe('USER CREATE', () => {
    describe('USER CREATE - POSITIVE', () => {
        let userIdd = null
        const user = {
            userInput: {
                lastName: 'lastName1',
                firstName: 'firstName1'
            }
        }
        it('user create', (done) => {

            const postData = {
                query: `mutation UserCreate($userInput: UserItems) {
  userCreate(userInput: $userInput) {
    lastName
    firstName
    _id
  }
}`,
                variables: user
            }

            request(graphQLEndpoint)
                .post('/')
                .send(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data
                    userIdd = res.body.data.userCreate._id
                    console.log("resp body===", respData)
                    console.log("resp id===", userIdd)
                    done()
                })
        })
        it('USER DELETE BY ID - POSITIVE', (done) => {
            const arg = {
                userId: userIdd
            }
            const postData = {
                query: `mutation UserDeleteById($userId: ID!) {
  userDeleteById(userId: $userId)
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
                    console.log("resp body user delete by id===",respData)
                    expect(respData.userDeleteById).eq(true)
                    done()
                })
        })

    })
    describe('USER DELETE BY ID - NEGATIVE', () => {

    })
})