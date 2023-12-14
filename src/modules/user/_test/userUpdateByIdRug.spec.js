const request = require ('supertest')
const { expect } = require('chai')
const {requestGqL} = require('../../helper')
const { userCreateQuery, userUpdateById, errorMassage} = require('./queries')
const generatedId = require ('../../../utils/generateId')//function was created before



describe('Positives user tests', () => {

    describe('USER UPDATE by ID - POSITIVE', () => {
        let userId
        let userToUpdate = {
            userInput: {
                firstName: "ToUpdateFirstName",
                lastName: "ToUpdateLastName"
            }
        }
        it('Created user', (done) => {
            const respData = {
                query: userCreateQuery,
                variables: userToUpdate
            }
            requestGqL(respData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)

                    const responseData = res.body.data
                    userId = responseData.userCreate._id
                    console.log(responseData)
                    done()
                })
        })//above user was created without assertions
        //BUG
        it.skip('Update user by ID', (done) => {
            const arq = {
                userInput: {
                    _id: userId,
                    firstName: "Ivan1",
                    lastName: "Mockach"
                }
            }
            const resBody = {
                query: userUpdateById,
                variables: arq
            }
            requestGqL(resBody)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)

                    const updatedData = res.body.data
                    console.log("UPDATED USER ===", updatedData)

                    expect(updatedData.userUpdateById.firstName).eq(arq.userInput.firstName)
                    expect(updatedData.userUpdateById.lastName).eq(arq.userInput.lastName)
                    expect(updatedData.userGetById._id).to.eq(userId)
                    done()
                })
          })

        describe('USER UPDATE by ID - NEGATIVE', () => {
            it('Update User by non-existed Id', (done) => {
                const wrongUser = {
                    userInput: {
                        _id: generatedId(),
                        firstName: "Iva",
                       }
                }
                const postData = {
                    query: `mutation UserUpdateById($userInput: UserFields) {
                      userUpdateById(userInput: $userInput) {
                        _id
                        firstName
                      }
                    }`,
                    variables: wrongUser
                }
                requestGqL(postData)
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err)
                        const resBody = res.body
                        console.log(res.body)
                        expect(resBody.errors[0].message).to.equal(errorMassage[4])//const errorMessage queries.js
                        expect(resBody.data.userUpdateById).to.equal(null)
                        done()
                    })
                 })
        })
    })
})




