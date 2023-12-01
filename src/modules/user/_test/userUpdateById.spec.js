const { expect } = require('chai')
const { requestGql } = require ('../../helper')
const { userCreateQuery } = require("../../../queries")
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
                    done()
                })
        })
        it('USER UPDATE BY ID - POSITIVE', (done) => {
            const arg = {
                userInput: {
                    _id: userIdd,
                    firstName: "firstName2",
                    lastName: "lastName2"
                }
            }
            const postData = {
                query: `mutation UserUpdateById {
  userUpdateById {
    _id
    firstName
    lastName
  }
}`,
                variables: arg
            }

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.data
                    console.log("resp body user update by id===",respData)
                    //expect(respData.userUpdateById.firstName).eq(user.userInput.firstName)
                    //expect(respData.userUpdateById.lastName).eq(user.userInput.lastName)
                    done()
                })
        })

    })
    describe('USER UPDATE BY ID - NEGATIVE', () => {

    })
})