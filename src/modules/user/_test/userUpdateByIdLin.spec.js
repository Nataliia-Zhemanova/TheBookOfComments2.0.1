const {expect} = require ('chai')
const { requestGql } = require('../../helper')
const { userCreateM, userUpdateByIdM} = require('./queries')
const { arg, argN1 } = require('./data')
const User = require('../User')

describe('USER UPDATE BY ID', () => {
    describe('USER UPDATE BY ID - POSITIVE', () => {

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
                .end((err) => {
                    if (err) return done(err);

                    done()
                })
        })

// BUG
        it.skip('user update by id', (done) => {

            const arg = {
                userId: userId,
            };

            const postData = {
                query: userUpdateByIdM,
                variables: arg,
            };

            requestGql(postData)
                .expect(200)
                .end((err) => {
                    if (err) return done(err);

                    expect(respData.userUpdateById._id).eq(userId)
                    done();
                });
        });
    });
    describe('USER UPDATE BY ID - NEGATIVE', () => {
        describe('USER UPDATE BY ID - NEGATIVE', () => {

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
                        done()
                    })
            })
            it('user update by id negative', (done) => {

                const postData = {
                    query: userUpdateByIdM,
                    variables: argN1,
                };

                requestGql(postData)
                    .expect(400)
                    .end((err, res) => {
                        if (err) return done(err);
                        const respData = res.body.errors[0]
                        expect(respData.extensions.code).to.eq('BAD_USER_INPUT')
                        expect(respData.message).eq('Variable "$userInput" got invalid value { firstName: 555, lastName: 888 }; Field "_id" of required type "ID!" was not provided.')
                        done();
                    });
            });
        });
    });
})