const request = require('supertest')
const {expect} = require('chai')
const graphQLEndpoint = 'http://localhost:5000/graphql'

describe('create user', () => {
    describe('positive', () => {
        it('verify user created successfully', (done) => {
            const arg = {
                "userInput": {
                    "firstName": 'testName',
                    "lastName": 'testSurname'
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
                    if (err) return done(err);
                    const resBody = res.body.data.userCreate
                    console.log("Response Body = ", res.body.data)
                    expect(resBody.firstName).to.eq('testName')
                    expect(resBody.lastName).to.eq('testSurname')

                    done()
                })
        });
    });
    describe('negative', () => {
        it('', () => {

        });
    });
});