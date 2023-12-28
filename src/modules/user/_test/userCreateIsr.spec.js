const {expect} = require ('chai')
const {requestGql} = require('../../helper')
const {userCreateMutation} = require('./queries')
const {arg} = require('./data')
const faker = require("faker");
describe ('USER CREATE', () => {
    describe('USER CREATE - POSITIVE', () => {
        it('user create', (done) => {
            const postData = {
                query: userCreateMutation,
                variables: arg
            }
            requestGql(postData)
                .expect(200) // supertest
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data
                    console.log('RESP BODY ===', respData);
                    expect(respData.userCreate.firstName).eq(arg.userInput.firstName)
                    expect(respData.userCreate.lastName).eq(arg.userInput.lastName)
                    done()
                })
        })
    })
    describe('USER CREATE - NEGATIVE', () => {
        it('user create with empty query', (done) => {
            const postData = {
                query: ``,
                variables: arg
            }
            requestGql(postData)
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.errors[0]
                    console.log('RESP BODY ===', respData);
                    expect(respData.message).eq('GraphQL operations must contain a non-empty `query` or a `persistedQuery` extension.')
                    expect(respData.extensions.code).eq('INTERNAL_SERVER_ERROR')
                    done()
                })
        })
        it('user create with invalid type of lastName', (done) => {
            const argInvalid = {
                userInput: {
                    firstName: null,
                    lastName: 123
                }
            }
            const postData = {
                query: userCreateMutation,
                variables: argInvalid
            }
            requestGql(postData)
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.errors[0]
                    console.log('RESP BODY ===', respData);
                    expect(respData.message).eq('Variable "$userInput" got invalid value 123 at "userInput.lastName"; String cannot represent a non string value: 123')
                    expect(respData.extensions.code).eq('BAD_USER_INPUT')
                    done()
                })
        })
    })
})