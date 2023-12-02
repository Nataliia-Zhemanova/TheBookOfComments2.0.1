const request = require('supertest')
const {expect} = require('chai')
const graphQLEndpoint = 'http://localhost:5000/graphql'

describe('USERS GET ALL', () =>{
    describe('USERS GET ALL - POSITIVE', () =>{
        it('user get all', (done) =>{
            const arg = {
                amount: 5,
            }
            const postData = {
                query: `query Query($amount: Int) {
  usersGetAll(amount: $amount) {
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
                    if(err) return done(err);
                    const respData = res.body.data;
                    console.log('RESP BODY ===', respData);
                    expect(respData.usersGetAll.length).eq(arg.amount);
                    done()
                })
        })
    })
    describe('USERS GET ALL - NEGATIVE', () =>{

    })
})