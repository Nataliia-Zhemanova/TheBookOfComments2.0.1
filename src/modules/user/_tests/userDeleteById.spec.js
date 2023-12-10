const request = require('supertest')
const {expect} = require('chai')
const graphQLEndpoint = 'http://localhost:5000/graphql'
const {createUser, deleteUserById} = require("../../helpers/userHelper");

describe('delete user', () => {
    describe('delete user - positive', () => {
        let res, userId
        before(async() => {
            res = await createUser()
            userId  = res.body.data.userCreate._id
        });

        it('verify user delete successfully', async() => {
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

           // res = deleteUserById(userId)
            const resBody = res.body.data.userDeleteById
            expect(resBody).eq(true)
        });
    });

});