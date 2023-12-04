const {expect} = require('chai')
const {arg} = require("./data");
const{userCreateM, userDeleteByIdM} = require('./queries');
const {requestGql} = require("../../helper");
describe('USER DELETE BY ID', () =>{
    describe('USER DELETE BY ID - POSITIVE', () => {
        let userId = null;
        it('user create', (done) =>{
            const postData = {
                query: userCreateM,
                variables: arg,
            }
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.data;
                    userId = res.body.data.userCreate._id;
                    console.log('RESP BODY ===', respData)
                    console.log('USER ID ===', userId);
                    done()
                })
        })

        it('user delete by id', (done) => {
            const user = {
                userId: userId,
            };
            const postData = {
                query: userDeleteByIdM,
                variables: user
            }
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.data;
                    console.log('USER DELETE BY ID ===', respData);
                    expect(respData.userDeleteById).to.be.true;
                    done()
                })
        })
    })
    describe('USER DELETE BY ID - NEGATIVE', () =>{
    })
})