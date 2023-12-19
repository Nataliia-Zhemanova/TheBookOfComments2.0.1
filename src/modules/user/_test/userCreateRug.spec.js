//const request = require('supertest')//removed since in helper, query.js, data.js assigned
//const graphQLEndpoint = 'http://localhost:5000/graphql'//removed since in helper, query.js, data.js
const { expect } =  require('chai')
const { requestGqL } = require ('../../helper')
const { userCreateQuery, errorMassage} = require ('./queries')
const { arg } = require ('./data')
const faker = require('faker')//second arg with faker created, uses here

describe('USER CREATE', () => {
    let userId;
    describe('USER CREATE - POSITIVE', () => {
        it('user creating with correct parameters', (done) => {//6 enter done
            const postData = {//создали переменную для того чтобы внести данные для res
                query: userCreateQuery,//queries.js for response structure Operaion
                variables: arg//data.js - request, input data
            }
            requestGqL(postData)//06 branch with helper for start page helper.js
                .end((err, res) => {//call back function with 2 parameters: if error = null, function goes further to res
                    if (err) return done(err);

                    const respData = res.body.data//5 что придёт response.body помещаем в переменную respData
                    userId = respData.userCreate._id

                    console.log("RESP BODY ===", res.body)//data выйдет сюда используем в следующих тестах

                    //path for arg input in data.js helper faker:
                    expect(respData.userCreate.firstName).eq(arg.userInput.firstName)//path from Operation Appolo and expected parameters
                    expect(respData.userCreate.lastName).eq(arg.userInput.lastName)//path for arg input in data.js helper faker
                    expect(respData.userCreate._id).to.be.a('string')
                    expect(respData.userCreate._id).eq(userId)
                    done()//6
                })
        })
    })
    describe('USER CREATE - NEGATIVE', () => {
        // before('User delete all', ()=> {
        //     User.deleteMany({})
        //     return done()
        // })
        it('user creating with null parameters', (done) => {
            const wrongArg = {
                "userInput": null
            }

            const postData = {
                query: userCreateQuery,
                variables: wrongArg
            }
            requestGqL(postData)
                .end((err, res) => {
                    if (err) return done(err);

                    const respData = res.body
                    console.log("RESP BODY ===", respData)
                    expect(respData.data.userCreate).to.equal(null)
                    expect(respData.errors[0].message).to.equal(errorMassage[0])
                    done()//6
                })
        })

        //BUG 1
        it('user creating with First Name - null', (done) => {
            const wrongArg = {
                "userInput": {
                    firstName: null,
                }
            }

            const postData = {
                query: userCreateQuery,
                variables: wrongArg
            }
            requestGqL(postData)
                .end((err, res) => {
                    if (err) return done(err);

                    const respData = res.body
                    console.log("RESP BODY ===", respData)
                    //expect(respData.data.userCreate.firstName).to.equal(null)
                    expect(respData.errors[0].message).to.equal(errorMassage[0])//errorMassage from query.js
                    done()
                })
        })
        //BUG 2
        it('User creating with First Name - empty string ("")', (done) => {
            const wrongArg = {
                "userInput": {
                    firstName: '',
                }
            }

            const postData = {
                query: userCreateQuery,
                variables: wrongArg
            }
            requestGqL(postData)
                .end((err, res) => {
                    if (err) return done(err);

                    const respData = res.body
                    console.log("RESP BODY ===", respData)
                    expect(respData.data.userCreate.firstName).not.to.equal('')
                    expect(respData.errors[0].message).to.equal(errorMassage[0])//errorMassage from query.js
                    done()
                })
        })
    })
})








