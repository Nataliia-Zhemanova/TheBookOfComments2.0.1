const { expect } = require('chai')
const { requestGql } = require('../../helper')
const { userCreateM, userGetByIdQ, userGetByIdQInvalid} = require('./queries')
const { arg } = require('./data')
const generateId = require('../../../utils/generateId')
const User = require('../User')

describe('USER GET BY ID', () => {

    describe('USER GET BY ID - POSITIVE', () => {
        let userId = null
        before('user delete all', (done) => {
            User.deleteMany({})
            return done()
        })
        before('user create', (done) => {
            const postData = {
                query: userCreateM,
                variables: arg
            }
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data;
                    userId = res.body.data.userCreate._id
                    done()

                })
        })

        it('user get by id', (done) => {

            const postData = {
                query: userGetByIdQ,
                variables: {
                    userId: userId
                }
            }
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.data;
                    expect(respData.userGetById._id).eq(userId)
                    done()
                })
        });
    });


    describe('USER GET BY ID - NEGATIVE', () => {

        let userId = null
        before('user delete all', (done) => {
            User.deleteMany({})
            return done()
        })
        before('user create', (done) => {
            const postData = {
                query: userCreateM,
                variables: arg
            }
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data;
                    userId = res.body.data.userCreate._id
                    done()

                })
        })

        it('user get by non existing id', (done) => {

            const postData = {
                query: userGetByIdQ,
                variables: {
                    userId: generateId()
                }
            }
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.errors[0];
                    expect(respData.message).to.eq('Cannot return null for non-nullable field Query.userGetById.')
                    done()
                })
        });

        it('SCHEMA RELATED user get by id with empty query', (done) => {

            const postData = {
                query: ``,
                variables: {
                    userId: userId
                }
            }
            requestGql(postData)
                .expect(400)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.errors[0];
                    expect(respData.message).to.eq('GraphQL operations must contain a non-empty `query` or a `persistedQuery` extension.')
                    expect(respData.extensions.code).to.eq('INTERNAL_SERVER_ERROR')
                    done()
                })
        });

        it('SCHEMA RELATED user get by id with wrong type of argument', (done) => {

            const postData = {
                query: userGetByIdQ,
                variables: {
                    userId: null
                }
            }
            requestGql(postData)
                .expect(400)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.errors[0];
                    expect(respData.message).to.eq('Variable "$userId" of non-null type "ID!" must not be null.')
                    expect(respData.extensions.code).to.eq('BAD_USER_INPUT')
                    done()
                })
        });

        it('SCHEMA RELATED user get by id with wrong field in query', (done) => {

            const postData = {
                query: userGetByIdQInvalid,
                variables: {
                    userId: userId
                }
            }
            requestGql(postData)
                .expect(400)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.errors[0];
                    expect(respData.message).to.eq('Cannot query field "_id123" on type "User". Did you mean "_id"?')
                    expect(respData.extensions.code).to.eq('GRAPHQL_VALIDATION_FAILED')
                    done()
                })
        });
    });

});