const {expect} = require('chai');
const{requestGql} = require('../../helper');
const{usersGetByAllQ, userGetByIdQ} = require('./queries');
describe('USERS GET ALL', () =>{
    describe('USERS GET ALL - POSITIVE', () =>{
        it('user get all', (done) =>{
            const arg = {
                amount: 5,
            }
            const postData = {
                query: usersGetByAllQ,
                variables: arg
            }
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.data;
                    console.log('RESP BODY ===', respData);
                    expect(respData.usersGetAll.length).eq(arg.amount);
                    done()
                })
        })
    })
    describe('USERS GET ALL - NEGATIVE', () =>{
    })
})