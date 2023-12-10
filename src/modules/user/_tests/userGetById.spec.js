const request = require('supertest')
const {expect} = require('chai')
const {requestGql} = require("../../helpers/generalHelper");
const {userCreateQuery, userGetById} = require("../../helpers/queries");
const {createUserArgs} = require('../../helpers/args')
const graphQLEndpoint = 'http://localhost:5000/graphql'
const User = require('../User')

describe('get user by id', () => {
    let res, resData, userId
    describe('get user by id - positive', () => {
        // before('delete all users', (done)=>{
        //     User.deleteMany({})
        //     return done()
        // })
        before(async() => {
            const postUserCreateData = {
                query: userCreateQuery,
                variables: createUserArgs
            }
            res = await requestGql(postUserCreateData)

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
            console.log(resData)
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