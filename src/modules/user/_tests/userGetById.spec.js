const request = require('supertest');
const gqlEndPoint = 'http://localhost:5000/'
const {userCreateM, getUserByIdQ} = require ('./query')
const {userCreateArg} = require('./data')
const {gqlRequest} = require('../helper')
const {expect} = require("chai");
const generateId = require('../../../utils/generateId')
const User = require ('../User')

describe('GET USER BY ID', () => {
    describe('GET USER BY ID - POSITIVE', () => {
        let userId = null;

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
                    console.log(respData)
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
                    console.log(respData)
                    expect(respData.userGetById._id).to.eq(userId)
                    expect(respData.userGetById.firstName).to.eq(userCreateArg.userInput.firstName)
                    expect(respData.userGetById.lastName).to.eq(userCreateArg.userInput.lastName)
                    done()
                })

        });
    })

    describe('GET USER BY ID - NEGATIVE', () => {
        let userId = null;
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
                     console.log(respData)
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
                    console.log(respData)
                    // expect(respData.userGetById._id).to.eq(userId)
                    // expect(respData.userGetById.firstName).to.eq(userCreateArg.userInput.firstName)
                    // expect(respData.userGetById.lastName).to.eq(userCreateArg.userInput.lastName)
                    done()
                })
        });
    });
});