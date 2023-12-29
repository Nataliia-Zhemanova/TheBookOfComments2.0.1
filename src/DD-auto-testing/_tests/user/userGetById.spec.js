const generateId = require('../../../utils/generateId')
const {expect} = require('chai')
const {requestGql} = require("../../helpers/generalHelper");
const {userGetByIdQuery} = require("../../helpers/queries");
const {userGetByIdArgs, userCreateArgs} = require('../../helpers/args')
const {createUser, getUserById} = require("../../helpers/userHelper");
// const User = require('../../../modules/user/User') // not sure if this import actually required

describe('get user by id', () => {
    let resCreate, resGet, resData, userId
    describe('get user by id - positive', () => {
        // TODO refactor to async/await and make it work
        // before('delete all users', (done)=>{
        //     User.deleteMany({})
        //     return done()
        // })
        before(async() => {
            // await User.deleteMany({}) // TODO fix "User is not defined" error / import User from modules/user ?
            resCreate = await createUser()
            userId  = resCreate.body.data.userCreate._id
            resGet = await getUserById(userId)
            resData = resGet.body.data.userGetById

            console.log(resCreate.body.data.userCreate)
            console.log(resData)
        });
        it('verify user id', async() => {
                expect(resData._id).to.eq(userId)

        });
        it('verify user first name', async() => {
            expect(resData.firstName).to.eq(resCreate.body.data.userCreate.firstName)
        });
        it('verify user last name', async() => {
            expect(resData.lastName).to.eq(resCreate.body.data.userCreate.lastName)
        });
    })
    describe('get user by id - negative', () => {
        let res, userInvalidId, resData
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