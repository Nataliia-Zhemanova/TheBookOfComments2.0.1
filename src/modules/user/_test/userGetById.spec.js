const {expect} = require('chai');
const{requestGql} = require('../../helper');
const{userCreateM, userGetByIdQ} = require('./queries');
const{arg} = require('./data');
describe('USER GET BY ID', () => {
    describe('USER GET BY ID - POSITIVE', () => {
        let userId = null;
        it('user create', (done) => {
            const postData = {
                query: userCreateM,
                variables: arg,
            }
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data;
                    userId = res.body.data.userCreate._id;
                    console.log('RESP BODY ===', respData);
                    console.log('USER ID ===', userId);

                    done()
                })
        })
        it('user get by id', (done) => {
            const user = {
                userId: userId,
            };
            const postData = {
                query: userGetByIdQ,
                variables: user
            }
                requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data;
                    console.log('RESP BODY USER GET BY ID ===', respData);
                    expect(respData.userGetById._id).eq(userId)
                    expect(respData.userGetById.firstName).eq(arg.userInput.firstName)
                    expect(respData.userGetById.lastName).eq(arg.userInput.lastName)

                    done()

                })
        })
    })
        describe('USER GET BY ID - NEGATIVE', () => {

})
})