const { expect } = require('chai')
const {requestGql} = require ('../../helper')
const {userCreateM } = require ('./queries')
const { arg} = require ('./data')

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

                    expect(respData.userCreate.firstName).eq('firstName1')
                    expect(respData.userCreate.lastName).eq('lastName1')
                    done()
                })
        });
    })

    describe('USER CREATE - NEGATIVE', () => {

    })
});