const request = require('supertest')
const {expect} = require ('chai')
const graphQLEndpoint = 'http://localhost:5000/graphql'

describe('USER GET BY ID', () => {
    describe('USER GET BY ID - POSITIVE', () => {

        let userId = null;
        let user = {
            userInput: {
                firstName: "firstName",
                lastName: "lastName",
            },
        };

        it('user create', (done) => {

              const postData = {
                query: `mutation UserCreate($userInput: UserItems) {
  userCreate(userInput: $userInput) {
    _id
    firstName
    lastName
  }
}`,
                variables: user,
            };
            request(graphQLEndpoint)
                .post('/')
                //.post('http://localhost:5000/graphql')
                .send(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data;
                    userId = res.body.data.userCreate._id
                    console.log("RESP BODY ===", respData)
                    console.log("USER ID ===", userId)
                    //expect(respData.userCreate.firstName).eq('firstName')
                    //expect(respData.userCreate.lastName).eq('lastName')
                    done();
                });
        });

        it('user get by id', (done) => {

            const arg = {
                     userId: userId,
                };
                const postData = {
                    query: `query UserGetById($userId: ID!) {
                userGetById(userId: $userId) {
                    _id
                    lastName
                    firstName
                }
            }`,
                variables: arg
            };
               request(graphQLEndpoint)
                .post('/')
                //.post('http://localhost:5000/graphql')
                .send(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data;

                    console.log("RESP BODY USER GET BY ID ===", respData)
                    expect(respData.userGetById._id).eq(userId)
                    expect(respData.userGetById.firstName).eq(user.userInput.firstName)
                    expect(respData.userGetById.lastName).eq(user.userInput.lastName)

                    done();
                });
        });
    });
    describe('USER GET BY ID - NEGATIVE', () => {});

})