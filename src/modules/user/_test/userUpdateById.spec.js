const request = require('supertest')
const {expect} = require('chai')
const graphQlEndpoint = 'http://localhost:5000/graphql'

describe('UPDATE USER BY ID', () => {
    describe('UPDATE USER BY ID - POSITIVE', () => {
        let userId = null
        let user = {
          userInput: {
              firstName: null,
              lastName: null
          }
      }
        it('Create user', (done) => {

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
                    done()
                })
        });

        it('Update user by id', (done) => {
            const arg = 
        });
    });


    describe('UPDATE USER BY ID - NEGATIVE', () => {

    });
});