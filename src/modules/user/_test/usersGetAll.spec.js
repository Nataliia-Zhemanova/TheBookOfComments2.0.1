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
        it('user create', (done) => {
            const postData = {
                query: `mutation UserCreate($userInput: UserItems) {
  userCreate(userInput: $userInput) {
    _id
    firstName
    lastName
  }
}`,
                variables:  user,
            };
            request(qraphQLEndpoint)
                .post('/')
                .send(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.data
                    userId = res.body.data.userCreate._id
                    console.log('RESP BODY ===', respData);
                    console.log('USER ID ===', userId);
                    done()
                })
        })

        it("user get all", (done) => {
            const arg = {
                userId: userId,
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