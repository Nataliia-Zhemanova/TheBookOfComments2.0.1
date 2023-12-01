const { expect } = require('chai')
const {requestGql} = require("../../helper");
const { userCreateQuery, userGetIdQuery } = require("../../../queries")
const { arg } = require("../../../data")
describe('USER CREATE', () => {
    describe('USER CREATE - POSITIVE', () => {
        let userIdd = null
        it('user create', (done) => {
            const postData = {
                query: userCreateQuery,
                variables: arg
            }
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data
                    userIdd = res.body.data.userCreate._id
                    console.log("resp body===", respData)
                    console.log("resp id===", userIdd)
                    done()
                })
        })
            it('USER GET BY ID - POSITIVE', (done) => {
                const user = {
                    userId: userIdd
                }
                const postData = {
                    query: userGetIdQuery,
                    variables: user
                }
                requestGql(postData)
                    .expect(200)
                    .end((err, res) => {
                        if(err) return done(err);
                        const respData = res.body.data
                        console.log("resp body user get by id===",respData)
                        expect(respData.userGetById._id).eq(userIdd)
                        expect(respData.userGetById.firstName).eq(arg.userInput.firstName)
                        expect(respData.userGetById.lastName).eq(arg.userInput.lastName)
                        done()
                    })
        })

    })
    describe('USER GET BY ID - NEGATIVE', () => {

    })
})