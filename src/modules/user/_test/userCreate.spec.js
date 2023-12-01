const request = require('supertest')
const {expect} = require('chai')
const graphQlEndpoint = 'http://localhost:5000/graphql'

const { requestGql}  = require ('../../helper')

describe('USER CREATE', () => {

    describe('USER CREATE - POSITIVE', () => {
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
            requestGql(postData)
            // request(graphQlEndpoint)
            //     .post('/')
            //     .send(postData)
                    .expect(200)
                    .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data
                    console.log("RESP BODY ===", respData)
            //         expect(respData.userCreate.firstName).to.eq('firstName')
            //         expect(respData.userCreate.lastName).to.eq('lastName')

                    done()
                })
        })
    });

    describe('USER CREATE - NEGATIVE', () => {

    });
});