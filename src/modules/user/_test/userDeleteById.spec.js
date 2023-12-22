const {expect} = require('chai')
const {userCreateArg} = require ('../_test/data')
const {userCreateQuery, userDeleteQ} = require('../_test/quey')
const {gqlRequest} = require('../../user/helper')
const generateId = require('../../../utils/generateId')


describe('DELETE USER BY ID', () => {
    describe('DELETE USER BY ID - POSITIVE', () => {
        let userId = null

        before('Create user', (done) => {

            const postData = {
                query: userCreateQuery,
                variables: userCreateArg
            }
            gqlRequest(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    const respData = res.body.data
                    userId = respData.userCreate._id
                    console.log(userId)
                    console.log(respData)
                    done()
                })


        });

        it('Delete user by id', (done) => {
            const userDeleteArg = {
                userId: userId
            }
            const postData = {
                query: userDeleteQ,
                variables: userDeleteArg

            }
            gqlRequest(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    const respData = res.body.data
                    expect(respData.userDeleteById).to.eq(true)
                    console.log(respData)
                    done()
                })
        });
    })

    describe('UPDATE USER BY ID - NEGATIVE', () => {
        it('Delete user with not existing id', (done) => {
            const userDeleteArg = {
                userId: generateId()
            }
            const postData = {
                query: userDeleteQ,
                variables: userDeleteArg

            }
            gqlRequest(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    const respData = res.body.data
                    expect(respData.userDeleteById).to.eq(false)
                    console.log(respData)
                    done()
                })
        });

        it('Delete user with empty user Id field', (done) => {
            const userDeleteArg = {
                userId: ""
            }
            const postData = {
                query: userDeleteQ,
                variables: userDeleteArg

            }
            gqlRequest(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    const respData = res.body.data
                    expect(respData.userDeleteById).to.eq(null)
                    console.log(respData)
                    done()
                })
        });
          // Probably Bug
        it.skip('Delete user with wrong type of Id field', (done) => {
            const userDeleteArg = {
                userId: 34314534
            }
            const postData = {
                query: userDeleteQ,
                variables: userDeleteArg

            }
            gqlRequest(postData)
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err)
                    const respData = res.body
                    // expect(respData.userDeleteById).to.eq(null)
                    console.log(respData)
                    done()
                })
        });
    });
});