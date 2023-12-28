const request = require('supertest')
const {expect} = require('chai')
const graphQLEndpoint = 'http://localhost:5000/graphql'
const {createUser, deleteUser} = require("../../helpers/userHelper");
const {userDeleteQuery} = require("../../helpers/queries");
const {userDeleteArgs} = require("../../helpers/args");
const {requestGql} = require("../../helpers/generalHelper");

describe('delete user', () => {
    describe('delete user - positive', () => {
        let res, userId
        before(async() => {
            res = await createUser()
            userId  = res.body.data.userCreate._id
        });

        it('verify user delete successfully', async() => {


            res = await deleteUser(userId)

            console.log(res.body)

            const resBody = res.body.data.userDeleteById
            expect(resBody).eq(true)
        });
    });

});