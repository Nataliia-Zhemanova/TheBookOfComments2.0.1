const request = require ("supertest")
const {expect} = require ('chai')
const qraphQLEndpoint = 'http://localhost:5000/graphql'

describe ('USER GET BY ID', () => {
    describe ('USER GET BY ID - POSITIVE', () => {
       let userId = null;
        it('user create', (done) => {
            const arg = {
                userInput: {
                    firstName: 'firstName1',
                    lastName: 'lastName1'
                }
            }
            const postData = {
                query: `mutation UserCreate($userInput: UserItems) {
  userCreate(userInput: $userInput) {
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
                    userId = res.body.data.userCreate._id
                    console.log('RESP BODY ===', respData);
                    console.log('USER ID ===', userId);
                    done()
                })
        })

        it("user get by id", (done) => {
        const arg = {
            userId: userId,
        };
        const postData = {
            query: `query UserGetById($userId: ID!) {
  userGetById(userId: $userId) {
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
                console.log('RESP BODY USER GET BY ID ===', respData);
                expect(respData.userGetById._id).eq(userId)
                // expect(respData.userGetById.firstName).eq(arg.userInput.firstName)
                // expect(respData.userGetById.lastName).eq(arg.userInput.lastName)
                done()
            })
    })
})
    describe ('USER GET BY ID - NEGATIVE', () => {});
    })