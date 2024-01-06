const {expect} = require ('chai')
const {requestGql} = require('../../helper')
const {userGetAllQ, userCreateMutation} = require('./queries')
const {arg} = require('./data')
const User = require("../User");

describe ('USER GET ALL', () => {
    describe ('USER GET ALL - POSITIVE', () => {
        it("user get all", (done) => {
            const arg = {
                amount: 5,
            };
            const postData = {
                query: userGetAllQ,
                variables:  arg
            };
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.data
                    console.log('RESP BODY USER GET ALL ===', respData);
                    done()
                })
        })
    })
    describe ('USER GET ALL - NEGATIVE', () => {
        before('user create', (done) => {
            const postData = {
                query: userCreateMutation,
                variables: arg
            }
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    done()
    })
})
        it('user get all with wrong argument type', (done) => {
            const postData = {
                query: userCreateMutation,
                variables: '10'
            }
            requestGql(postData)
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body
                    expect(respData.errors[0].message).eq('Variables must be provided as an Object where each property is a variable value. Perhaps look to see if an unparsed JSON string was provided.')
                    done()
                })
        });
    });
});
