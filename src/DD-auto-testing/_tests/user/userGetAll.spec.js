const {expect} = require('chai')
const {createUser, getAllUsers} = require("../../helpers/userHelper");
const {userGetAllArgs} = require("../../helpers/args");


describe('get all users', () => {
    describe('get al users - positive', () => {
        let res
        before(async() => {
            for(let i=0; i<userGetAllArgs.amount; i+=1){
                res = await createUser()
            }
        })

    it('verify all users length', async() => {
        res = await getAllUsers()
        const resBody = res.body.data.usersGetAll
        console.log(resBody.length)

        // TODO this assertion should be refactored in case of DB dropped
        // userCreate loop added
            expect(resBody.length).to.eq(userGetAllArgs.amount)

        });
    });
})