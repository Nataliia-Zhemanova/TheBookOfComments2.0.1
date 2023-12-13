const { expect } = require('chai')
const { requestGql } = require('../../helper')
const { userCreateM } = require('./queries')
const { arg, wrongArg } = require('./data')

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
        it('create user with wrong argument types', (done) => {
            const postData = {
                query: userCreateM,
                variables: wrongArg
            }

            requestGql(postData)
                .expect(400)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body

                    console.log("RESP BODY ===", respData)

                    expect(respData.errors[0].message).eq(`Variable "$userInput" got invalid value 123 at "userInput.firstName"; String cannot represent a non string value: 123`)
                    expect(respData.errors).to.be.an('array')
                    done()
                })
        });


        it('create user with invalid query', (done) => {
            const postData = {
                query: `mutation UserCreate($userInput: UserItems) {
  userCreate(userInput: $userInput) {
    _id1
    firstName
    lastName
  }
}`,
                variables: arg
            }

            requestGql(postData)
                .expect(400)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body

                    console.log("RESP BODY ===", respData)

                    expect(respData.errors[0].message).eq('Cannot query field "_id1" on type "User". Did you mean "_id"?')
                    expect(respData.errors).to.be.an('array')
                    done()
                })
        });


        // BUG - I can create a user without _id (which is required) in the query
        it.skip('create user without id in query', (done) => {
            const postData = {
                query: `mutation UserCreate($userInput: UserItems) {
  userCreate(userInput: $userInput) {
    firstName,
    lastName
  }
}`,
                variables: arg
            }

            requestGql(postData)
                .expect(400)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body

                    console.log("RES BODY ===", respData)

                    expect(respData.message).not.to.eq('expected 400 "Bad Request", got 200 "OK"')
                    done()

            })
        });
    })
});