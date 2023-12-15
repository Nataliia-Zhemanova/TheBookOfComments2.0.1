const { expect } = require('chai')
const {requestGql} = require("../../helper");
const { userCreateQuery, userGetIdQuery } = require("../../../queries")
const { arg,  } = require("../../../data")
describe('USER CREATE', () => {
    describe('USER CREATE - POSITIVE', () => {
        let userIdd = null
        it('user create', (done) => {
            const postData = {
                query: userCreateQuery,
                variables: arg
            }

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data
                    userIdd = res.body.data.userCreate._id
                    console.log("resp body===", respData)
                    console.log("resp id===", userIdd)
                    done()
                })
        })
        it('USER DELETE BY ID - POSITIVE', (done) => {
            const arg = {
                userId: userIdd
            }
            const postData = {
                query: `mutation UserDeleteById($userId: ID!) {
  userDeleteById(userId: $userId)
}`,
                variables: arg
            }

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.data
                    console.log("resp body user delete by id===",respData)
                    expect(respData.userDeleteById).eq(true)
                    done()
                })
        })

    })
    describe('USER DELETE BY ID - NEGATIVE', () => {

    })
})