const request = require ("supertest")
const {expect} = require ('chai')
const qraphQLEndpoint = 'http://localhost:5000/graphql'

describe ('USER GET ALL', () => {
    describe ('USER GET ALL - POSITIVE', () => {
        let userId = null;
        let user = {
            userInput: {
                firstName: 'firstName1',
                lastName: 'lastName1'
            }
        }
        it("user get all", (done) => {
            const arg = {
                amount: 5,
            };
            const postData = {
                query: `query UsersGetAll($amount: Int) {
  usersGetAll(amount: $amount) {
    _id
    firstName
    lastName
  }
}`,
                variables:  arg
            };
            request(qraphQLEndpoint)
                .post('/')
                .send(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.data
                    console.log('RESP BODY USER GET ALL ===', respData);
                    // expect(respData.userGetById._id).eq(userId)
                    // expect(respData.userGetById.firstName).eq(user.userInput.firstName)
                    // expect(respData.userGetById.lastName).eq(user.userInput.lastName)
                    done()
                })
        })
    })
    describe ('USER GET ALL - NEGATIVE', () => {});
})