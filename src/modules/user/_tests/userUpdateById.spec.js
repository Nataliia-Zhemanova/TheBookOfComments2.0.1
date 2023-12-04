const request = require('supertest')
const {expect} = require('chai')
const graphQLEndpoint = 'http://localhost:5000/graphql'

describe('user update by id', () => {
    describe('user update by id - positive', () => {
        let res, userId, userFirstName, userLastName
        const user = {
            "userInput": {
                "firstName": 'testName1',
                "lastName": 'testSurname1'
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
            variables: user
        }
        before(async() => {
            res = await request(graphQLEndpoint)
                .post('/')
                .send(postData)
                .expect(200)
            userId  = res.body.data.userCreate._id
            userFirstName = res.body.data.userCreate.firstName
            userLastName = res.body.data.userCreate.lastName
        });

        it('verify user updated successfully', async() => {
            const arg = {
                "userInput": {
                    _id: userId,
                    "firstName": "testName22",
                    "lastName": "testSurname22"
                }
            }
            const postData = {
                query: `mutation UserUpdateById($userInput: UserFields) {
                          userUpdateById(userInput: $userInput) {
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
            const resBody = res.body.data
            console.log(resBody)

        });
    });
});