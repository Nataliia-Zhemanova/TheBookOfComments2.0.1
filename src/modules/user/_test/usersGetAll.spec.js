const { expect } = require('chai')
const {requestGql} = require ('../../helper')
const {userCreateM, usersGetAllQ } = require ('./queries')
const { arg, usersGetAllArg } = require ('./data')
const User = require('../User')
// const generateId = require('../../../utils/generateId')

describe('USERS GET ALL', () => {

    describe('USERS GET ALL - POSITIVE', () => {

        before('user delete all', (done) => {
            User.deleteMany({})
            return done()
        })

        before('user create', (done) => {
            const postData = {
                query: userCreateM,
                variables: arg,
            }

            requestGql(postData)
                .expect(200)
                .end((err) => {
                    if (err) return done(err);
                    done()
                })
        })

        it('user get all', (done) => {
            const postData = {
                query: usersGetAllQ,
                variables: usersGetAllArg
            }

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.data

                    expect(respData.usersGetAll.length).not.to.eq(0)
                    expect(respData.usersGetAll.length).eq(usersGetAllArg.amount)
                    done()
                })
        });
    });

    describe('USERS GET ALL - NEGATIVE', () => {

        before('user delete all', (done) => {
            User.deleteMany({})
            return done()
        })

        before('user create', (done) => {
            const postData = {
                query: userCreateM,
                variables: arg,
            }

            requestGql(postData)
                .expect(200)
                .end((err) => {
                    if (err) return done(err);
                    done()
                })
        })

        it('user get all', (done) => {
            const postData = {
                query: usersGetAllQ,
                variables: usersGetAllArg
            }

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.data

                    expect(respData.usersGetAll.length).not.to.eq(0)
                    expect(respData.usersGetAll.length).eq(usersGetAllArg.amount)
                    done()
                })
        });
    });
});