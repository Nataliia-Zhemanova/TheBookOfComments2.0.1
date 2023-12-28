const generateId = require('../../../utils/generateId')
const {expect} = require('chai')
const {requestGql} = require("../../helpers/generalHelper");
const {userGetByIdQuery} = require("../../helpers/queries");
const {userGetByIdArgs, createUserArgs} = require('../../helpers/args')
const {createUser, getUserById} = require("../../helpers/userHelper");

describe('get user by id', () => {
    let res, resData, userId
    describe('get user by id - positive', () => {
        // TODO refactor to async/await and make it work
        // before('delete all users', (done)=>{
        //     User.deleteMany({})
        //     return done()
        // })
        before(async() => {
            // await User.deleteMany({}) // TODO fix "User is not defined" error
            res = await createUser()
            userId  = res.body.data.userCreate._id
            res = await getUserById(userId)
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
    describe.skip('get user by id - negative', () => {
        let userInvalidId, resData
        before(() => {
            userInvalidId = generateId()
        })
        it('verify get user by non-existing id', async() => {
            res = await getUserById(userInvalidId)

            resData = res.body.errors[0]
            console.log(resData.message)
            expect(resData.message).include('null')
        });
        it('get user w/o id', async() => {

            res = await getUserById('')
            resData = res.body.errors[0]
            console.log(resData.message)
            expect(resData.message).include('failed')
        });
        it('get user with number id', async() => {

            res = await getUserById(1)
            resData = res.body.errors[0]
            console.log(resData.message)
            expect(resData.message).include('failed')
        });

        // double check userId types / userId argument doesn't accept object and array / status code 400
        it('get user with invalid id type', async() => {

            res = await getUserById('test')
            resData = res.body.errors[0]
            console.log(resData.message)
            expect(resData.message).include('failed')
        });

        it('wrong schema option', () => {

        });
    });
})