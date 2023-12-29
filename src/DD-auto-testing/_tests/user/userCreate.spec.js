const {expect} = require('chai')
const { userCreateArgs, } = require('../../helpers/args')
const {createUser} = require("../../helpers/userHelper");
const {userCreateQuery} = require("../../helpers/queries");
const faker = require("faker");



describe('create user', () => {
    describe('positive', () => {
        let res, resBody, requestBody
        before(async() => {
            res = await createUser()

            requestBody = res.request._data.variables.userInput

            resBody = res.body.data.userCreate
            console.log(resBody)
        })
        it('verify created user first name', async() => {
           expect(resBody.firstName).to.eq(requestBody.firstName)
        });
        it('verify created user first name', async() => {
            expect(resBody.lastName).to.eq(requestBody.lastName)
        });
    });
    describe('negative', () => {
        let res, resBody
        // user can be created with empty fields
        // it('verify user cannot be created w/o first name', async() => {
        //     res = await createUser(userCreateQuery(), userCreateArgs(null))
        //     resBody = res.body.data.userCreate
        //     console.log(resBody)
        //     expect(resBody.firstName).to.eq(null)
        // });

        it('wrong schema options', () => {
            res = userCreateQuery(userCreateQuery('_id', 'first', 'last'))
            // console.log(res)
        });
    });
});