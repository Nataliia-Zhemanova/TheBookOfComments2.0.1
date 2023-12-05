const {expect} = require('chai')
const { userCreateQuery, } = require('./queries')
const { createUserArgs, } = require('./args')
const {requestGql} = require("../../helper");

describe('create user', () => {
    describe('positive', () => {
        let res, resBody
        before(async() => {
            const postCreateData = {
                query: userCreateQuery,
                variables: createUserArgs
            }
            res = await requestGql(postCreateData)
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