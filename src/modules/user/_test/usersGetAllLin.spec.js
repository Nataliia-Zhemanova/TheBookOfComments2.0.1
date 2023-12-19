
const {expect} = require ('chai')
const { requestGql } = require('../../helper')
const { userCreateM, usersGetAllQ } = require('./queries')
const { arg, arg2, arg2N } = require('./data')

const User = require('../User')
describe('USERS GET ALL', () => {
    describe('USER GET ALL - POSITIVE', () => {

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
        it('users get all', (done) => {
            const postData = {
                query: usersGetAllQ,
                variables: arg2,
            };

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data;
                    expect(respData.usersGetAll.length).not.eq(0)
                    expect(respData.usersGetAll.length).eq(arg2.amount)
                    done();
                });
        });
    });

    describe('USERS GET ALL - NEGATIVE', () => {
        describe('USER GET ALL - NEGATIVE', () => {

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
            it('users get all', (done) => {
                const postData = {
                    query: usersGetAllQ,
                    variables: arg2N,
                };

                requestGql(postData)
                    .expect(400)
                    .end((err, res) => {
                        if (err) return done(err);
                        const respData = res.body.errors[0]
                        expect(respData.message).eq('Variable "$amount" got invalid value "hello"; Int cannot represent non-integer value: "hello"')
                        expect(respData.extensions.code).to.eq('BAD_USER_INPUT')
                        done();
                    });
            });
        });
    });
})
