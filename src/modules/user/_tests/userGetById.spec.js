const request = require('supertest')
const {expect} = require('chai')
const graphQLEndpoint = 'http://localhost:5000/graphql'

describe('get user by id', () => {
    describe('get user by id - positive', () => {
        const user = {
            "userInput": {
                "firstName": 'testName',
                "lastName": 'testSurname'
            }
        }
        let userId
        it('user create positive', (done) => {
            const postData = {
                query: `mutation UserCreate($userInput: UserItems) {
                    userCreate(userInput: $userInput) {
                          _id
                           firstName
                           lastName
                    }
                }`,
                variables: user
            }
            request(graphQLEndpoint)
                .post('/')
                .send(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    userId = res.body.data.userCreate._id
                    console.log('User Id = ', userId)
                    expect(userId).not.to.be.empty
                    expect(userId).to.be.a('string')
                    done()
                });
        });
        it('user get by id', (done) => {
            console.log(userId)
            const arg = {
                userId: userId
            }
            const postData = {
                query: `query UserGetById($userId: ID!) {
                          userGetById(userId: $userId) {
                            _id
                            firstName
                            lastName
                          }
                        }`,
                variables: arg
            }
            request(graphQLEndpoint)
                .post('/')
                .send(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const resData = res.body.data.userGetById
                    console.log('response Get user by id = ', resData)
                    expect(resData._id).to.eq(userId)
                    expect(resData.firstName).to.eq(user.userInput.firstName)
                    expect(resData.lastName).to.eq(user.userInput.lastName)

                    done()
                });
        });
    })
})