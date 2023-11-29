const request = require('supertest')
const {expect} = require('chai')
const graphQlEndpoint = 'http://localhost:5000/graphql'

describe('GET USER BY ID', () => {
    describe('GET USER BY ID - POSITIVE', () => {
        it('user create', (done) => {

            const arg = {
                userInput: {
                    firstName: 'firstName',
                    lastName: 'lastName'
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
            request(graphQlEndpoint)
                .post('/')
                .send(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data
                    const userId = res.body.data.userCreate._id
                    console.log("RESP BODY ===", respData)
                    console.log(userId)
                    expect(respData.userCreate.firstName).to.eq('firstName')
                    expect(respData.userCreate.lastName).to.eq('lastName')

                    done()
                })
        })

        it('user get by id', (done) => {

            const arg = {
              userId: userId
            }

            const postData = {
                query: `query Query($userId: ID!) {
  userGetById(userId: $userId) {
    _id
    firstName
    lastName
  }
}`,
                variables: arg
            }
            request(graphQlEndpoint)
                .post('/')
                .send(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data
                    const userId = res.body.data.userCreate._id
                    console.log("RESP BODY ===", respData)
                    console.log(userId)
                    expect(respData.userGetById._id).eq(userId)
                    expect(respData.userGetById.firstName).eq(arg.userInput.firstName)
                    expect(respData.userGetById.lastName).eq(arg.userInput.lastName)
                    done()
                })
        })
    });

    describe('GET USER BY ID - NEGATIVE', () => {

    });
});