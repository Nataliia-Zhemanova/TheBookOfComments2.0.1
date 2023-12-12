const {expect} = require('chai')
const { requestGgl, requestGql} = require ('../../helper')
const { userCreateM} = require('./gueries')
const { arg } = require('./data')
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
                    if(err) return done(err);
                    const respData = res.body.data
                    console.log("RESP BODY ===", respData)
                    expect(respData.userCreate.firstName).eq('firstName11')
                    expect(respData.userCreate.lastName).eq('lastName11')
                    done()

                })


        })
    })
    describe('USER CREATE - NEGATIVE', () => {
    })
})