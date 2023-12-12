const { expect } = require('chai')
const { requestGql } = require ('../../helper')
const { userCreateM, userUpdateByIdM} = require('./queries')
const {arg} = require('./data')
describe ('USER UPDATE BY ID', () => {
    describe('USER UPDATE BY ID - POSITIVE', () => {

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
                    const respData = res.body;
                    userId = res.body.data.userCreate._id;
                    console.log("RESP BODY ===", respData);
                    console.log("USER ID ===", userId);
                    done()
                })
        })

        it('user update by id', (done) => {

            const postData = {
                query: userUpdateByIdM,
                variables: {
                    userInput: {
                        _id: userId,
                        firstName: 'newLastName',
                        lastName: 'newFirstname'
                    }
                }
            }
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data;
                    console.log("RESP BODY USER GET BY ID ===", respData);
                    expect (respData.userGetById._id).eq(userId);
                    done();
                });
        });
    });
    describe('USER GET BY ID - NEGATIVE', () => {});
});
