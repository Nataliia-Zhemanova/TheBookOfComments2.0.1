const request = require('supertest')
const { expect } = require('chai')
const graphQLEndpoint = 'http://localhost:5000/graphql'
const { requestGql } = require ('../../helper')

describe('USER GET ALL - POSITIVE', () => {
    describe('USER GET ALL - POSITIVE', () => {
        it('user create', (done) => {
            const arg = {
                amount: null
            }
            const postData = {
                query: `query UsersGetAll($amount: Int) {
  usersGetAll(amount: $amount) {
    _id
    firstName
    lastName
  }
}`,
                variables: arg
            }
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.data
                    console.log("resp body===",respData)
                    //expect(respData.userCreate.firstName).eq('firstName1')
                    //expect(respData.userCreate.lastName).eq('lastName1')
                    done()
                })
        })
    })
    describe('USER GET ALL - NEGATIVE', () => {

    })
})