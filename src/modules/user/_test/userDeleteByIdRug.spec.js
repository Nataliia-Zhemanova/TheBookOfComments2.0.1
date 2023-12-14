const { expect } = require ('chai')
const {requestGqL} = require('../../helper')
const {userCreateQuery, userDeleteByIdM} = require('./queries')
const {arg} = require('./data')
const User = require('../User')

describe('USER DELETE BY ID', () => {
   describe('USER DELETE BY ID positive', () => {
        let userId

        it('User create', (done) => {
            const createdUser =  {
                query: userCreateQuery,
                variables: arg
            }
        requestGqL(createdUser)//также вставили тот же Helper и внесли в него наши параметры to open page
        .expect(200)
        .end((err, res) => {
            if(err) return done(err)
            const resData = res.body.data
            userId = resData. userCreate._id
            console.log("USER ID ===", userId)
            console.log("RESPONSE ===", resData)
            done()
        })

   })

        it('User delete', (done) => {
            const delUser = {
                 userId: userId
            }
            const responseOfDelete = {
                query: userDeleteByIdM ,
                variables: delUser
            }
            requestGqL(responseOfDelete)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err)

                const respData = res.body.data
                console.log(respData)
                expect(respData.userDeleteById).to.eq(true)
                done()
                })

    })
        })




    describe('USER DELETE BY ID negative', () => {

    })
})


