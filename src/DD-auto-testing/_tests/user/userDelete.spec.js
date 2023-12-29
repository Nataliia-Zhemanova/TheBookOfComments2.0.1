const {expect} = require('chai')
const {createUser, userDelete} = require("../../helpers/userHelper");

describe('delete user', () => {
    describe('delete user - positive', () => {
        let res, userId
        before(async() => {
            res = await createUser()
            userId  = res.body.data.userCreate._id
        });

        it('verify user delete successfully', async() => {
            res = await userDelete(userId)

            const resBody = res.body.data.userDeleteById
            expect(resBody).eq(true)
        });
    });

});