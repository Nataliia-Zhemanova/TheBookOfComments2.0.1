const generateId = require('../../../utils/generateId')
const {expect} = require('chai')
const {requestGql} = require("../../helpers/generalHelper");
const {userCreateQuery, userGetByIdQuery} = require("../../helpers/queries");
const {createUserArgs, userGetByIdArgs} = require('../../helpers/args')
const graphQLEndpoint = 'http://localhost:5000/graphql'
const User = require('../../../modules/user/User')
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
        let userInvalidId, resData
        before(() => {
            userInvalidId = generateId()
        })
        it('verify get user by non-existing id', async() => {
            const postGetData = {
                query: userGetByIdQuery,
                variables: userGetByIdArgs(userInvalidId)
            }
            res = await requestGql(postGetData)

            resData = res.body.errors[0]
            console.log(resData.message)
            expect(resData.message).include('null')
        });
        it('get user w/o id', async() => {
            const postGetData = {
                query: userGetByIdQuery,
                variables: userGetByIdArgs('')
            }
            res = await requestGql(postGetData)
            resData = res.body.errors[0]
            console.log(resData.message)
            expect(resData.message).include('failed')
        });
        it('get user with number id', async() => {
            const postGetData = {
                query: userGetByIdQuery,
                variables: userGetByIdArgs(1)
            }
            res = await requestGql(postGetData)
            resData = res.body.errors[0]
            console.log(resData.message)
            expect(resData.message).include('failed')
        });

        // double check userId types / userId argument doesn't accept object and array / status code 400
        it('get user with invalid id type', async() => {
            const postGetData = {
                query: userGetByIdQuery,
                variables: userGetByIdArgs("testId")
            }
            res = await requestGql(postGetData)
            resData = res.body.errors[0]
            console.log(resData.message)
            expect(resData.message).include('failed')
        });
    });
})