const { expect } = require('chai')
const {requestGql} = require("../../helper");
const { userCreateQuery } = require("../../../queries")
const { arg, wrongArg} = require("../../../data")
describe('USER CREATE', () => {
    describe('USER CREATE - POSITIVE', () => {


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
                    console.log("resp body===", respData)
                    expect(respData.userCreate.firstName).eq(arg.userInput.firstName)
                    expect(respData.userCreate.lastName).eq(arg.userInput.lastName)
                    done()
                })
        })
    })
    describe('USER CREATE - NEGATIVE', () => {
        it('user create wrong argument type', (done) => {
            const postData = {
                query: userCreateQuery,
                variables: wrongArg
            }
            requestGql(postData)
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body
                    console.log("resp body===", respData)
                    expect(respData.errors[0].message).eq('Variable "$userInput" got invalid value 123 at "userInput.firstName"; String cannot represent a non string value: 123')
                    expect(respData.errors[1].message).eq('Variable "$userInput" got invalid value 122 at "userInput.lastName"; String cannot represent a non string value: 122')
                    done()
                })
        })
        it('user create with wrong query', (done) => {
            const postData = {
                query: `mutation UserCreate($userInput: UserItems) {
                    userCreate(userInput: $userInput) {
                    _id123
                    firstName
                    lastName
                    }
                  }`,

                variables: arg
            }
            requestGql(postData)
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body
                    console.log("resp body===", respData)
                    expect(respData.errors[0].message).eq('Cannot query field "_id123" on type "User". Did you mean "_id"?')
                    done()
                })
        })
    })
})