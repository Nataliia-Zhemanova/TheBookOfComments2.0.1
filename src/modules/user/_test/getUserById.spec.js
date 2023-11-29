const request = require('supertest')
const {expect} = require('chai')
const graphQlEndpoint = 'http://localhost:5000/graphql'

describe('GET USER BY ID', () => {
    describe('GET USER BY ID - POSITIVE', () => {
        let userId = null;
        let user = {
            userInput: {
                firstName: 'firstName',
                lastName: 'lastName'
            }
        }
        it('user create', (done) => {

            const postData = {
                query: `mutation UserCreate($userInput: UserItems) {
  userCreate(userInput: $userInput) {
    _id
    firstName
    lastName
  }
}`,
                variables: user
            }
            request(graphQlEndpoint)
                .post('/')
                .send(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data
                    userId = res.body.data.userCreate._id
                    // console.log("RESP BODY ===", respData)
                    // console.log(userId)

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
                    console.log("RESP BODY GET USER BY ID ===", respData)
                    expect(respData.userGetById._id).eq(userId)
                    expect(respData.userGetById.firstName).eq(user.userInput.firstName)
                    expect(respData.userGetById.lastName).eq(user.userInput.lastName)
                    done()
                })
        })
    });

    describe('GET USER BY ID - NEGATIVE', () => {

    });
});