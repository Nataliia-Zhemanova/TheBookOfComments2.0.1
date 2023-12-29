const {expect} = require('chai')
const {createUser, userGetAll} = require("../../helpers/userHelper");
const {userGetAllArgs} = require("../../helpers/args");


// TODO refactor based on args & query functions
describe('get all users', () => {
    describe('get al users - positive', () => {
        let res

        // variable below can be used for changing quantity of users list / add it to the userGetAllArgs and userGetAll API call
        // const testUsersAmount = 2

        // this loop prevents test from fail in case of empty DB
        before(async() => {
            for(let i=0; i<userGetAllArgs().amount; i+=1){
                res = await createUser()
            }
        })

    it('verify all users length', async() => {
        res = await userGetAll()
        const resBody = res.body.data.usersGetAll
        console.log(resBody.length)

        // this assertion should be refactored in case of empty DB
        // DONE - userCreate loop added
            expect(resBody.length).to.eq(userGetAllArgs().amount)

        });
    });

    // TODO add  after hook for DB cleanup
})