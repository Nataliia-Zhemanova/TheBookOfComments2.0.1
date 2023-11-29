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
            it('user get by id', (done) => {
                const arg = {
                    userId: userIdd
                }
                const postData = {
                    query: `query UserGetById($userId: ID!) {
  userGetById(userId: $userId) {
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
                        console.log("resp body user get by id===",respData)
                        expect(respData.userGetById._id).eq(userIdd)
                        expect(respData.userGetById.firstName).eq(user.userInput.firstName)
                        expect(respData.userGetById.lastName).eq(user.userInput.lastName)
                        done()
                    })
        })

    })
    describe('USER GET BY ID - NEGATIVE', () => {

    })
})