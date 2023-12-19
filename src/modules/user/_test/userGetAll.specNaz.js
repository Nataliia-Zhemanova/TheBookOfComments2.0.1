const { expect } = require('chai')
const { requestGql } = require('../../helper')
const { userCreateM, userGetAllQ} = require('./queries')
const { arg } = require('./data')

describe('USER GET ALL',  () => {
  describe('USER GET ALL - POSITIVE',  () => {
    it('user create',  (done) => {

      const postData = {
        query: userCreateM,
        variables: arg
      }
      requestGql(postData)
          .expect(200)
          .end((err, res) => {
            if(err) return done(err);
            const respData = res.body.data;
            console.log("RESP BODY ===", respData)
            expect(respData.userCreate.firstName).eq('firstName')
            expect(respData.userCreate.lastName).eq('lastName')
            done()
          })
    })
    it('user get all',  (done) => {
      const userGetAll = {
        amount: 5
      }
      const postData = {
        query: userGetAllQ,
        variables: userGetAll
      }
      requestGql(postData)
          .expect(200)
          .end((err, res) => {
            if(err) return done(err);
            const respData = res.body.data;
            console.log("RESP BODY USER GET ALL ===", respData)
            expect(respData.usersGetAll.length).eq(userGetAll.amount)
            done()
          })
    })
  })
  describe('USER GET ALL - NEGATIVE',  () => {

  })
})