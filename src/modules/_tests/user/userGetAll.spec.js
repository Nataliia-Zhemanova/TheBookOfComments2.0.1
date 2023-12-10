const {expect} = require('chai')
const {createUser, getAllUsers} = require("../../helpers/userHelper");
const {userGetAllArgs} = require("../../helpers/args");


describe('get all users', () => {
    describe('get al users - positive', () => {
        let res
        before(async() => {
            res = await createUser()
        })

    it('verify all users length', async() => {
        res = await getAllUsers()
        const resBody = res.body.data.usersGetAll

        // this assertion should be refactored in case of DB dropped
        expect(resBody.length).to.eq(userGetAllArgs.amount)
        });
    });
})