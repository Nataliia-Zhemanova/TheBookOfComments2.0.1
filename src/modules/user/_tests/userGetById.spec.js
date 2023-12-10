const request = require('supertest')
const {expect} = require('chai')
const {requestGql} = require("../../helpers/generalHelper");
const {userCreateQuery, userGetByIdQuery} = require("../../helpers/queries");
const {createUserArgs, userGetByIdArgs} = require('../../helpers/args')
const graphQLEndpoint = 'http://localhost:5000/graphql'
const User = require('../User')
const {createUser} = require("../../helpers/userHelper");

describe('get user by id', () => {
    let res, resData, userId
    describe('get user by id - positive', () => {
        // before('delete all users', (done)=>{
        //     User.deleteMany({})
        //     return done()
        // })
        before(async() => {
            res = await createUser()
            userId  = res.body.data.userCreate._id
            console.log(userId)

            const postGetData = {
                query: userGetByIdQuery,
                variables: userGetByIdArgs(userId)
            }
            res = await requestGql(postGetData)
            resData = res.body.data.userGetById
        });
        it('verify user id', async() => {
                expect(resData._id).to.eq(userId)

        });
        it('verify user first name', async() => {
            expect(resData.firstName).to.eq(createUserArgs.userInput.firstName)
        });
        it('verify user last name', async() => {
            expect(resData.lastName).to.eq(createUserArgs.userInput.lastName)
        });
    })
    describe('get user by id - negative', () => {

    });
})