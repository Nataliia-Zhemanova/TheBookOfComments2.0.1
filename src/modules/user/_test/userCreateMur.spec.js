const { expect } = require('chai')
const { requestGql } = require ('../../helper')
const { userCreateM} = require('./queries')
const {userInput} = require('./data')
const User = require ('../User')
const generateId = require('../../../utils/generateId')
describe ('USER CREATE', () => {
    describe ('USER CREATE - POSITIVE', () => {

        before('user delete all', (done) => {
            User.deleteMany({});
            return done();
        });

        it('user create', (done) => {
            const postData = {
                query: userCreateM,
                variables: userInput
            }
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.data
                    console.log("RESP BODY ===", respData)
                    done()
                })
        })
    })
    describe ('USER CREATE - NEGATIVE', () => {
        it('user create with empty query', (done) => {
            const postData = {
                query: '',
                variables: userInput
            }
            requestGql(postData)
                .expect(400)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.errors[0]
                    console.log("ERROR BODY ===", respData)
                    expect(respData.message).eq('GraphQL operations must contain a non-empty `query` or a `persistedQuery` extension.')
                    expect(respData.extensions.code).to.eq('INTERNAL_SERVER_ERROR');
                    done()
                })
        })

        it('user create with empty variables', (done) => {
            const postData = {
                query: userCreateM,
                variables: ''
            }
            requestGql(postData)
                .expect(400)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.errors[0]
                    console.log("ERROR BODY ===", respData)
                    expect(respData.message).eq('Variables must be provided as an Object where each property is a variable value. Perhaps look to see if an unparsed JSON string was provided.')
                    expect(respData.extensions.code).to.eq('INTERNAL_SERVER_ERROR');
                    done()
                })
        })
    })
} )