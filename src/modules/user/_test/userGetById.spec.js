const { expect } = require('chai')
const { requestGql } = require('../../helper')
const { userCreateM, userGetByIdQ} = require('./queries')
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
                    console.log("RESP BODY ====", respData)
                    console.log("ID ====", userId)
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
                    console.log("RESP BODY USER GET BY ID ====", respData)
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
                    console.log("RESP BODY ====", respData)
                    console.log("ID ====", userId)
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
                    console.log("RESP BODY USER GET BY ID ====", respData)
                    expect(respData.message).to.eq('Cannot return null for non-nullable field Query.userGetById.')
                    done()
                })
        });
    });

});