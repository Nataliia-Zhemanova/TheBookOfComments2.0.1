const {expect} = require('chai')
const {requestGql}  = require ('../../helper')
const { userCreateM } = require ('./query')
const { arg, argNeg} = require ('./data')

describe('USER CREATE', () => {
    describe('USER CREATE - POSITIVE', () => {
        it('user create', (done) => {

            const postData = {
                query: userCreateM,
                variables: arg
            }

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data
                    console.log("RESP BODY ===", respData)
                    expect(respData.userCreate.firstName).to.eq(arg.userInput.firstName)
                    expect(respData.userCreate.lastName).to.eq(arg.userInput.lastName)
                    expect(respData.userCreate._id).to.be.a('string')
                    expect(respData.userCreate._id.length).not.eq(0)

                    done()
                })
        })
    });

    describe('USER CREATE - NEGATIVE', () => {
        it('Create user with wrong arguments type', (done) => {
            const postData = {
                query: userCreateM,
                variables: argNeg
            }

            requestGql(postData)
                // .expect(200)
                .end((err, res) => {
                    if(err) return done(err)
                    const respData = res.body
                    expect(res.statusCode).to.eq(400)
                    done()
                })
        });

    });
});