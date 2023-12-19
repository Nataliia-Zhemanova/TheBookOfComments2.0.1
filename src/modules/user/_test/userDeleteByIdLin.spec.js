const {expect} = require ('chai')
const { requestGql } = require('../../helper')
const { userCreateM,userDeleteByIdM} = require('./queries')
const { arg} = require('./data')
const User = require('../User')

describe('USER DELETE BY ID', () => {
    describe('USER DELETE BY ID - POSITIVE', () => {

        before('user delete all', (done) => {
            User.deleteMany({})
            return done();
        });

        before('user create', (done) => {
            const postData = {
                query: userCreateM,
                variables: arg,
            };

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    userId = res.body.data.userCreate._id
                    done();
                });
        });

        it('user delete by id', (done) => {
            const arg = {
                userId: userId,
            };
            const postData = {
                query: userDeleteByIdM,
                variables: arg,
            };

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data;
                    expect(respData.userDeleteById).to.be.true
                    done();
                });
        });
    });
    describe('USER GET BY ID - NEGATIVE', () => {


        before('user delete all', (done) => {
            User.deleteMany({})
            return done();
        });

        before('user create', (done) => {
            const postData = {
                query: userCreateM,
                variables: arg,
            };

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    userId = res.body.data.userCreate._id
                    done();
                });
        });

        it('user delete null id', (done) => {
            const arg = {
                userId: null,
            };
            const postData = {
                query: userDeleteByIdM,
                variables: arg,
            };

            requestGql(postData)
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.errors[0]
                    expect(respData.message).eq('Variable "$userId" of non-null type "ID!" must not be null.')
                    expect(respData.extensions.code).to.eq('BAD_USER_INPUT')
                    done();
            });
        });
    });

        it('user delete number id', (done) => {
            const arg = {
                userId: 888,
            };
            const postData = {
                query: userDeleteByIdM,
                variables: arg,
            };

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.errors[0]
                    expect(respData.message).eq('Cast to ObjectId failed for value "888" (type string) at path "_id" for model "User"')
                    expect(respData.extensions.code).to.eq('INTERNAL_SERVER_ERROR')
                    done();
                });
        });
    });
