const request = require('supertest')
const {expect} = require('chai')
const graphQLEndpoint = 'http://localhost:5000/graphql'

describe('create user', () => {
    describe('positive', () => {
        let res
        it('verify user created successfully', async() => {
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

            res = await request(graphQLEndpoint)
                .post('/')
                .send(postData)
                .expect(200)
                    const resBody = res.body.data.userCreate
                    console.log("Response Body = ", resBody )
                    expect(resBody.firstName).to.eq(arg.userInput.firstName)
                    expect(resBody.lastName).to.eq(arg.userInput.lastName)

        });
    });
    describe('negative', () => {
        // it('', () => {
        //
        // });
    });
});