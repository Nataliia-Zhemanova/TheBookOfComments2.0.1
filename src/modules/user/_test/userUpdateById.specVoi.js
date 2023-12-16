const {expect} = require('chai')
const{requestGql} = require('../../helper');
const{userCreateM, userUpdateByIdM} = require('./queries');
const{arg} = require('./data');
describe('USER UPDATE BY ID', () => {
    describe('USER UPDATE BY ID - POSITIVE', () => {
        let userId = null;
        it('user create', (done) => {
            const postData = {
                query: userCreateM,
                variables: arg
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
        it('user update by id', (done) => {
            const user = {
                userInput: {
                    _id: userId,
                    firstName: 'firstName10',
                    lastName: 'lastName10'
                }
            };
            const postData = {
                query: userUpdateByIdM,
                variables: user
            }
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data;
                    console.log('RESP BODY USER GET BY ID ===', respData);
                    expect(respData.userGetById._id).eq(userId)
                    expect(respData.userGetById.firstName).eq(user.userInput.firstName)
                    expect(respData.userGetById.lastName).eq(user.userInput.lastName)
                    done()
                })
        })
    })
    describe('USER UPDATE BY ID - NEGATIVE', () => {
    })
})