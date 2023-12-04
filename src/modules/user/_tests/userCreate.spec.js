const request = require('supertest')
const {expect} = require('chai')
const graphQLEndpoint = 'http://localhost:5000/graphql'

describe('create user', () => {
    describe('positive', () => {
        let res, resBody, createArg
        before(async() => {
            createArg = {
                "userInput": {
                    "firstName": 'testName',
                    "lastName": 'testSurname'
                }
            }
            const postCreateData = {
                query: `mutation UserCreate($userInput: UserItems) {
                    userCreate(userInput: $userInput) {
                          _id
                           firstName
                           lastName
                    }
                }`,
                variables: createArg
            }
            res = await request(graphQLEndpoint)
                .post('/')
                .send(postCreateData)
                .expect(200)
            resBody = res.body.data.userCreate
        })
        it('verify created user first name', async() => {
            expect(resBody.firstName).to.eq(createArg.userInput.firstName)
        });
        it('verify created user last name', async() => {
            expect(resBody.lastName).to.eq(createArg.userInput.lastName)
        });
    });

    describe('negative', () => {
        // it('', () => {
        //
        // });
    });
});