const request = require('supertest')
const {expect} = require ('chai')
const graphQLEndpoint = 'http://localhost:5000/graphql'

describe('USER CREATE', () => {
    describe('USER CREATE - POSITIVE', () => {
        it('user create', (done) => {

            const arg = {
                userInput: {
                    firstName: 'firstName',
                    lastName: 'lastName'
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
                variables: arg
            }
            request(graphQLEndpoint)
                .post('/')
                //.post('http://localhost:5000/graphql')
                .send(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.data
                    console.log("RESP BODY ===", respData)
                    //expect(respData.userCreate.firstName).eq('firstName')
                    //expect(respData.userCreate.lastName).eq('lastName')
                    done()

                })
        })
        it('user get all', (done) => {

            const arg = {
                amount: 3,
            };
            const postData = {
                query: `query UsersGetAll($amount: Int) {
  usersGetAll(amount: $amount) {
    _id
    firstName
    lastName
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

                    //console.log("RESP BODY USER GET BY ID ===", respData)
                    expect(respData.usersGetAll.length).not.eq(0)
                    expect(respData.usersGetAll.length).eq(arg.amount)
                    console.log(respData)
                    console.log(respData.usersGetAll.length)

                    done();
                });
        });
    });
    describe('USER GET BY ID - NEGATIVE', () => {});

})

