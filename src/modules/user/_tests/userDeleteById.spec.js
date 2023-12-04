const request = require('supertest')
const {expect} = require('chai')
const graphQLEndpoint = 'http://localhost:5000/graphql'

describe('delete user', () => {
    describe('delete user - positive', () => {
        let res, userId
        const user = {
            "userInput": {
                "firstName": 'testName1',
                "lastName": 'testSurname1'
            }
        }
        const postCreatetData = {
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
                .send(postCreatetData)
                .expect(200)
            userId  = res.body.data.userCreate._id
        });

        it('verify user delete successfully', async() => {
            console.log(userId)
            const arg = {
                userId: userId
            }
            const postDeleteData = {
                query: `mutation UserDeleteById($userId: ID!) {
                  userDeleteById(userId: $userId)
                }`,
                variables: arg
            }

            res = await request(graphQLEndpoint)
                .post('/')
                .send(postDeleteData)
                .expect(200)
            const resBody = res.body.data.userDeleteById
            expect(resBody).eq(true)
        });
    });

});