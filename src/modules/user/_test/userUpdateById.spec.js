const request = require('supertest')
const {expect} = require('chai')
const graphQlEndpoint = 'http://localhost:5000/graphql'

describe('UPDATE USER BY ID', () => {
    describe('UPDATE USER BY ID - POSITIVE', () => {
        let userId = null

        it('Create user', (done) => {
            const user = {
                userInput: {
                    firstName: 'first',
                    lastName: 'second'
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
                variables: user
            }
            request(graphQlEndpoint)
                .post('/')
                .send(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err)
                    const respData = res.body.data
                    userId = respData.userCreate._id
                    console.log(userId)
                    console.log(respData)
                    done()
                })

                })
        });

        it('Update user by id', (done) => {
            const arg = {
                userInput: {
                    _id: userId,
                    firstName: 'UserFirst',
                    lastName: 'UserLast'
                }
            }
            const postData = {
                query: `mutation UserUpdateById($userInput: UserFields) {
  userUpdateById(userInput: $userInput) {
    _id
    firstName
    lastName
  }
}`,
                variables: arg

            }
            request(graphQlEndpoint)
                .post('/')
                .send(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err)
                    const respData = res.body.data
                    console.log(respData)
                    done()
                })
        });


    describe('UPDATE USER BY ID - NEGATIVE', () => {

    });
});