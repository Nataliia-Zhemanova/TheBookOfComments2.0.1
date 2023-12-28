const {expect} = require ('chai')
const {requestGql} = require('../../helper')
const {userUpdateByIdMutation} = require('./queries')
const {argUp} = require('./data')
describe ('USER UPDATE', () => {
    describe ('USER UPDATE - POSITIVE', () => {
        it('user update', (done) => {
            const postData = {
                query: userUpdateByIdMutation,
                variables:  argUp
            }
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.data
                    console.log('RESP BODY ===', respData);
                    expect(respData.userUpdateById.firstName).eq('abc')
                    expect(respData.userUpdateById.lastName).eq('123')
                    done()
                })
        })
    })
    describe ('USER UPDATE - NEGATIVE', () => {

    })
})

