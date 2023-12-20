const { expect } = require('chai')
const { requestGql } = require ('../../helper')
const { userCreateM} = require ('./queries')
const { arg} = require ('./data')

describe('USER CREATE',  () => {
  describe('USER CREATE - POSITIVE', () => {
    it('user create', (done) => {
      const postData = {
        query: userCreateM,
        variables: arg
      }
      requestGql(postData)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            const respData = res.body.data;
            console.log("RESP BODY ===", respData)
            expect(respData.userCreate.firstName).eq(arg.userInput.firstName)
            expect(respData.userCreate.lastName).eq(arg.userInput.lastName)
            done()
          })
    })
  })
  describe('USER CREATE - NEGATIVE', () => {
    it('user create with empty query', done => {
      const postData = {
        query: ``,
        variables: arg
      }
      requestGql(postData)
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            const respData = res.body.errors[0];
            console.log("RESP BODY ===", respData)
            expect(respData.message).eq('GraphQL operations must contain a non-empty `query` or a `persistedQuery` extension.')
            expect(respData.extensions.code).eq('INTERNAL_SERVER_ERROR')
            done()
          })
    })
    it('user create with invalid type of lastName', done => {
      const invalidInput = {
        userInput: {
          firstName: null,
          lastName: true
        }
      }
      const postData = {
        query: userCreateM,
        variables: invalidInput
      }
      requestGql(postData)
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            const respData = res.body.errors[0];
            console.log("RESP BODY ===", respData)
            expect(respData.message).eq('Variable "$userInput" got invalid value true at "userInput.lastName"; String cannot represent a non string value: true')
            expect(respData.extensions.code).eq('BAD_USER_INPUT')
            done()
          })
    })
  })
})