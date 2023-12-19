const { expect } = require('chai')
const { requestGql } = require ('../../helper')
const { userCreateM, userUpdateByIdM} = require ('./queries')
const { arg} = require ('./data')

describe('USER UPDATE BY ID',  () => {
  describe('USER UPDATE BY ID - POSITIVE',  () => {
    let userId = null;
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
            userId = res.body.data.userCreate._id
            console.log("RESP BODY ===", respData)
            console.log("RESP ID ===", userId)
            // expect(respData.userCreate.firstName).eq('firstName')
            // expect(respData.userCreate.lastName).eq('lastName')
            done()
          })
    })
    it('user update by id',  (done) => {
      const userUpdate = {
        userInput: {
          _id: userId,
          firstName: "Denis",
          lastName: "Nazarenko"
        }
      }
      const postData = {
        query: userUpdateByIdM,
        variables: userUpdate
      }
      requestGql(postData)
          .expect(200)
          .end((err, res) => {
            if(err) return done(err);
            const respData = res.body.data;

            console.log("RESP BODY ===", respData)
            // expect(respData.userGetById._id).eq(userId)
            done()
          })
    })
  })
  describe('USER UPDATE BY ID - NEGATIVE',  () => {

  })
})