const request = require('supertest')
const {expect} = require('chai')
const graphQLEndpoint = 'http://localhost:5000/graphql'

describe('get all users', () => {
    describe('get al users - positive', () => {
        let res
        let userId
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
                });

    it('get all users', async() => {
        const arg = {
            amount: 4
        }
        const postData = {
            query: `query UsersGetAll($amount: Int) {
                      usersGetAll(amount: $amount) {
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
        const resBody = res.body.data.usersGetAll
        expect(resBody.length).to.eq(arg.amount)
        });
    });
})