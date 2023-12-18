const request = require('supertest')
const {expect} = require('chai')
const graphQlEndpoint = 'http://localhost:5000/graphql'
const {userCreateArg, userDeleteArg} = require ('../_test/data')
const {userCreateQuery, userDeleteQ} = require('../_test/quey')
const {gqlRequest} = require('../../user/helper')

describe('DELETE USER BY ID', () => {
    describe('DELETE USER BY ID - POSITIVE', () => {
        let userId = null

        it('Create user', (done) => {

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
                    const respData = res.body
                    console.log(respData)
                    done()
                })
        });
    })

    describe('UPDATE USER BY ID - NEGATIVE', () => {

    });
});