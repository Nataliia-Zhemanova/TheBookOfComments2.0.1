const request = require('supertest')
const {expect} = require('chai')
const {requestGql} = require("../../helper");
const graphQLEndpoint = 'http://localhost:5000/graphql'

describe('get user by id', () => {
    let res, resData, userId
    describe('get user by id - positive', () => {
        const user = {
            "userInput": {
                "firstName": 'testName',
                "lastName": 'testSurname'
            }
        }
        before(async() => {
            const postCreateData = {
                query: `mutation UserCreate($userInput: UserItems) {
                    userCreate(userInput: $userInput) {
                          _id
                           firstName
                           lastName
                    }
                }`,
                variables: user
            }
            res = await requestGql(postCreateData)

                userId = res.body.data.userCreate._id
                console.log('User Id = ', userId)

            const arg = {
                userId: userId
            }
            const postGetData = {
                query: `query UserGetById($userId: ID!) {
                          userGetById(userId: $userId) {
                            _id
                            firstName
                            lastName
                          }
                        }`,
                variables: arg
            }
            res = await requestGql(postGetData)
            resData = res.body.data.userGetById
        });
        it('verify user id', async() => {
                expect(resData._id).to.eq(userId)

        });
        it('verify user first name', async() => {
            expect(resData.firstName).to.eq(user.userInput.firstName)
        });
        it('verify user last name', async() => {
            expect(resData.lastName).to.eq(user.userInput.lastName)
        });
    })
})