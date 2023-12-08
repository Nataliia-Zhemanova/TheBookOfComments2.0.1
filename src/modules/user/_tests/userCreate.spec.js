const {expect} = require('chai')
const { userCreateQuery, } = require('../../helpers/queries')
const { createUserArgs, } = require('../../helpers/args')
const {requestGql} = require("../../helpers/generalHelper");
const {createUser} = require("../../helpers/userHelper");



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
    describe('negative', () => {
        // it('', () => {
        //
        // });
    });
});