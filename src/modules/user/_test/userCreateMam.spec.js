const { expect } = require('chai')
const { requestGql } = require('../../helper')
const { userCreateM } = require('./queries')
const { arg, wrongArg } = require('./data')
const { faker } = require('@faker-js/faker')

describe('USER CREATE', () => {
    describe('USER CREATE - POSITIVE', () => {

        it('user create', (done) => {
            const postData = {
                query: userCreateM,
                variables: arg
            }

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.data
                    console.log("RESP BODY ===", respData)

                    expect(respData.userCreate.firstName).eq(arg.userInput.firstName)
                    expect(respData.userCreate.lastName).eq(arg.userInput.lastName)
                    done()
                })
        });
    })

    describe('USER CREATE - NEGATIVE', () => {
        it('create user without first name', (done) => {
            const postData = {
                query: userCreateM,
                variables: wrongArg
            }

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body

                    console.log("RESP BODY ===", respData)

                    // expect(respData.userCreate.firstName).eq(arg.userInput.firstName)
                    // expect(respData.userCreate.lastName).eq(arg.userInput.lastName)
                    done()
                })
        });

        it('create user without first name', (done) => {
            const postData = {
                query: `mutation UserCreate($userInput: UserItems) {
  userCreate(userInput: $userInput) {
    _id1
    firstName
    lastName
  }
}`,
                variables: wrongArg
            }

            requestGql(postData)
                .expect(400)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body

                    console.log("RESP BODY ===", respData)

                    expect(respData.userCreate.errors[0].message).eq('Cannot query field "_id1" on type "User". Did you mean "_id"?')
                    expect(respData.userCreate.errors).to.be.an('array')
                    done()
                })
        });

    })
});