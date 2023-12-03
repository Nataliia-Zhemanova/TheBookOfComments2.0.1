// const request = require ("supertest")
// const qraphQLEndpoint = 'http://localhost:5000/graphql'

const {expect} = require ('chai')
const {requestGql} = require('../../helper')
const {userCreateMutation, userGetByIdQ, userGetAllQ} = require('./queries')
const {arg} = require('./data')

describe ('USER GET ALL', () => {
    describe ('USER GET ALL - POSITIVE', () => {
        it("user get all", (done) => {
            const arg = {
                amount: 5,
            };
            const postData = {
                query: userGetAllQ,
                                //  query: `query UsersGetAll($amount: Int) {
                                //  usersGetAll(amount: $amount) {
                                //  _id
                                //  firstName
                                //  lastName
                                //   }
                                // }`,
                variables:  arg
            };
            requestGql(postData)
                                // request(qraphQLEndpoint)
                                //     .post('/')
                                //     .send(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.data
                    console.log('RESP BODY USER GET ALL ===', respData);
                    done()
                })
        })
    })
    describe ('USER GET ALL - NEGATIVE', () => {});
})