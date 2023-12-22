const { expect } = require ('chai')
const { requestGqL } = require ('../../helper')
const { userCreateQuery, userGetById, errorMassage} = require ('./queries')
const { arg } = require ('./data')
const User = require('../User')//for  User.deleteMany( {} )11 str
const generatedId = require ('../../../utils/generateId')//function was created before

describe('Positives user tests', () => {
    describe('USER GET BY ID positive', () => {
        let userId
        before('delete all users', (done) => {
            User.deleteMany({})//hooke before, Users taken from User.js in resolvers (used to delete multiple documents
            // that match a specified condition in a MongoDB collection).
            return done()
        })

        it('Created user get by ID', (done) => {

            const respData = {
                query: userCreateQuery,
                variables: arg
            }
            requestGqL(respData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)

                    const responseData = res.body.data
                    userId = responseData.userCreate._id
                    console.log(responseData)
                    console.log("USER ID ===", responseData.userCreate._id)
                    done()
                })
        })//above user was created without assertions

        it('Get user by ID', (done) => {
            const requestData = {
                userId: userId//зашит в переменную в начале теста
            }
            const resData = {
                query: userGetById,//in queries.js
                variables: requestData
            }

            requestGqL(resData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    const responseData = res.body.data
                    console.log("RESP DATA USER GET BY ID ===", responseData)
                    expect(responseData.userGetById._id).eq(userId)//path from Apollo Operation - res.body.data+path
                    expect(responseData.userGetById.firstName).eq(arg.userInput.firstName)
                    done()
                })
        })

    })

    describe('USER GET BY ID NEGATIVE', () => {

        it('User Get by non-existent (random) Id', (done) => {
           const wrongId = {
               userId: generatedId()//utils/generatedId using (случайное)
           }
            const postData = {
                query: userGetById,
                variables: wrongId
            }
            requestGqL(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err)

                    const resData = res.body
                    console.log("RESBODY ===", resData)
                    expect(resData.errors[0].message).to.equal(errorMassage[2])
                    expect(resData.data).to.equal(null)
                    done()
                })
        })
        it('User Get by Id (empty string data)', (done) => {
            const wrongId = {
                userId: ''//empty string
            }
            const postData = {
                query: userGetById,
                variables: wrongId
            }
            requestGqL(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err)

                    const resData = res.body
                    console.log("RESBODY ===", resData)
                    expect(resData.errors[0].message).to.equal(errorMassage[3])
                    expect(resData.data).to.equal(null)
                    done()
                })
        })
    })
})