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
                    const respData = res.body.data
                    userId = res.body.data.userCreate._id

                    console.log("RESP BODY ===", respData)
                    console.log("USER ID ===", userId)
                    done()
                })
        })

        it('delete user by id', (done) => {
            const postData = {
                query: userGetByIdQ,
                variables: userId
            }

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.data
                    //const userId = res.body.data.userDeleteById._id
                    console.log("RESP BODY USER GET BY ID ===", respData)

                    expect(respData).eq(true)

                    done()
                })
        });
    });


    describe('USER DELETE BY ID - NEGATIVE', () => {

    });
});