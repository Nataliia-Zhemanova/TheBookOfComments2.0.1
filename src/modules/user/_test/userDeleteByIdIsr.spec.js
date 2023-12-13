const {expect} = require ('chai')
const {requestGql} = require('../../helper')
const {userDeleteMutationById} = require('./queries')
const {argDel} = require('./data')
describe ('USER DELETE BY ID', () => {
    describe ('USER DELETE BY ID - POSITIVE', () => {
        it('user delete by id', (done) => {
            const postData = {
                query: userDeleteMutationById,
                variables:  argDel
            }

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.data
                    console.log('RESP BODY ===', respData);
                    expect(respData.userDeleteById).eq(false)
                    done()
                })
        })
    })

    describe ('USER DELETE BY ID - NEGATIVE', () => {

    } )
} )

