const {expect} = require('chai')
const { createUserArgs, } = require('../../helpers/args')
const {createUser, createNegativeUser} = require("../../helpers/userHelper");



describe('create user', () => {
    describe('positive', () => {
        let res, resBody
        before(async() => {
            res = await createUser()

            resBody = res.body.data.userCreate
        })
        it('verify created user first name', async() => {
            expect(resBody.firstName).to.eq(createUserArgs.userInput.firstName)
        });
        it('verify created user first name', async() => {
            expect(resBody.lastName).to.eq(createUserArgs.userInput.lastName)
        });
    });
    describe.skip('negative', () => {
        let res, resBody
        before(async() => {
            res = await createNegativeUser(123, 'testLastName')
            resBody = res.body.data.userCreate
        });
        it('verify user cannot be created w/o first name', () => {
            expect(resBody.firstName).to.eq('')
        });
    });
});