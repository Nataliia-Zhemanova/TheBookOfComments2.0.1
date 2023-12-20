const { expect } = require('chai')
const {requestGql} = require ('../../helper')
const {userCreateM, userDeleteByIdM, userGetByIdQ} = require ('./queries')
const { arg } = require ('./data')
const User = require('../User')
const generateId = require('../../../utils/generateId')


describe('USER DELETE BY ID', () => {

    describe('USER DELETE BY ID - POSITIVE', () => {
        let userId = null;

        // before('user delete all', (done) => {
        //     User.deleteMany({})
        //     return done()
        // })

        before('user create', (done) => {
            const postData = {
                query: userCreateM,
                variables: arg,
            }

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    userId = res.body.data.userCreate._id
                    done()
                })
        })

        it('delete user by id', (done) => {
            const deleteUser = {
                userId: userId
            }

            const postData = {
                query: userDeleteByIdM,
                variables: deleteUser
            }

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.data

                    expect(respData.userDeleteById).eq(true)
                    done()
                })
        });
    });


    describe('USER DELETE BY ID - NEGATIVE', () => {
        let userId = null;

        before('user create', (done) => {
            const postData = {
                query: userCreateM,
                variables: arg,
            }

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    userId = res.body.data.userCreate._id
                    done()
                })
        })

        it('delete user by id', (done) => {
            const deleteUser = {
                userId: generateId()
            }

            const postData = {
                query: userDeleteByIdM,
                variables: deleteUser
            }

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.data

                    expect(respData.userDeleteById).eq(false)
                    done()
                })
        });

        it('delete user by id', (done) => {
            const deleteUser = {
                userId: 12234567890
            }

            const postData = {
                query: userDeleteByIdM,
                variables: deleteUser
            }

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body

                    expect(respData.errors[0].message).eq('Cast to ObjectId failed for value "12234567890" (type string) at path "_id" for model "User"')
                    expect(respData.data.userDeleteById).eq(null)
                    done()
                })
        });
    });
});