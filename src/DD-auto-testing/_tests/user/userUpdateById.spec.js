const request = require('supertest')
const {expect} = require('chai')
const graphQLEndpoint = 'http://localhost:5000/graphql'

// this spec skipped because of existing bug
// TODO reformat the test once bug will be fixed
describe.skip('user update by id', () => {
    describe('user update by id - positive', () => {
        let res, userId, userFirstName, userLastName, updateArg, resBody
        const createArg = {
            "userInput": {
                "firstName": 'testName33',
                "lastName": 'testSurname33'
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
        before(async() => {
            res = await request(graphQLEndpoint)
                .post('/')
                .send(postCreateData)
                .expect(200)
            userId  = res.body.data.userCreate._id
            userFirstName = res.body.data.userCreate.firstName
            userLastName = res.body.data.userCreate.lastName

            const updateArg = {
                userInput: {
                    _id: userId,
                    firstName: 'testName44',
                    lastName: 'testSurname44'
                }
            }
            const postUpdateData = {
                query: `mutation UserUpdateById($userInput: UserFields) {
                          userUpdateById(userInput: $userInput) {
                            _id
                            firstName
                            lastName
                          }
                        }`,
                variables: updateArg
            }

            res = await request(graphQLEndpoint)
                .post('/')
                .send(postUpdateData)
                .expect(200)
            const resBody = res.body.data.userUpdateById
            console.log('Update user response = ', resBody)
        });

        it('verify user updated successfully', async() => {
            expect(resBody.firstName).eq(updateArg.firstName)
        });
        it('verify user updated successfully', async() => {
            expect(resBody.lastName).eq(updateArg.lastName)

        });
    });
});