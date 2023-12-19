const {userCreateM, getUserByIdQ, getUserByIdNeg} = require ('./query')
const {userCreateArg} = require('./data')
const {gqlRequest} = require('../helper')
const {expect} = require("chai");
const generateId = require('../../../utils/generateId')
const User = require ('../User')

describe('GET USER BY ID', () => {
    let userId = null;
    describe('GET USER BY ID - POSITIVE', () => {

        before('user create', (done) => {

            const postData = {
                query: userCreateM,
                variables: userCreateArg
            }

            gqlRequest(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    const respData = res.body.data
                    userId = respData.userCreate._id
                    done()
                })
        })

        it('get user by Id', (done) => {

            const getUserByIdArg = {
                userId: userId
            }
            const postData = {
                query: getUserByIdQ,
                variables: getUserByIdArg
            }

            gqlRequest(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    const respData = res.body.data
                    expect(respData.userGetById._id).to.eq(userId)
                    expect(respData.userGetById.firstName).to.eq(userCreateArg.userInput.firstName)
                    expect(respData.userGetById.lastName).to.eq(userCreateArg.userInput.lastName)
                    done()
                })

        });
    })

    describe('GET USER BY ID - NEGATIVE', () => {

        before('delete all users', (done) => {
            User.deleteMany({})
            return done()
        })

        before('User create', (done) => {

              const postData = {
                  query: userCreateM,
                  variables: userCreateArg
            }
            gqlRequest(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    const respData = res.body.data
                    userId = respData.userCreate._id
                    done()
                })
          })

        it('Get user by not existing id', (done) => {
            const userGet = {
                userId: generateId()
            }
            const postData = {
                query: getUserByIdQ,
                variables: userGet
            }
            gqlRequest(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    const respData = res.body
                    expect(respData.data).to.eq(null)
                    expect(respData.errors[0].message).to.eq('Cannot return null for non-nullable field Query.userGetById.')
                    done()
                })
        });

        it('Get user with empty id field', (done) => {
            const userGet = {
                userId: ""
            }
            const postData = {
                query: getUserByIdQ,
                variables: userGet
            }
            gqlRequest(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    const respData = res.body
                    expect(respData.data).to.eq(null)
                    expect(respData.errors[0].message).to.eq('Cast to ObjectId failed for value "" (type string) at path "_id" for model "User"')
                    done()
                })
        });

        it('Update user with invalid query', (done) => {
            const userGet = {
                userId: userId
            }
            const postData = {
                query: getUserByIdNeg,
                variables: userGet
            }
            gqlRequest(postData)
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err)
                    const respData = res.body.errors
                     expect(respData[0].message).to.eq('Cannot query field "_id1" on type "User". Did you mean "_id"?')
                    done()
                })
        });

        // Probably BUG (expected: 400, got: 200)

        it('Update user with wrong type of variables', (done) => {
            const userGet = {
                userId: 234523
            }
            const postData = {
                query: getUserByIdQ,
                variables: userGet
            }
            gqlRequest(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    const respData = res.body.errors
                     expect(respData[0].message).to.eq('Cast to ObjectId failed for value "234523" (type string) at path "_id" for model "User"')
                    done()
                })
        });

    });
});