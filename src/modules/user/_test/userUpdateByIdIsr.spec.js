const {expect} = require ('chai')
const {requestGql} = require('../../helper')
const {userUpdateByIdMutation, userUpdateByIdM, userUpdateByIdMWrong} = require('./queries')
const {argUp} = require('./data')
const User = require("../User");
const generateId = require("../../../utils/generateId");
const faker = require("faker");
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
    describe('USER UPDATE BY ID - NEGATIVE', () => {

        before('user delete all', (done) => {
            User.deleteMany({})
            return done()
        })


        it('user update by invalid ID', (done) => {
            const userUpdateWrongId = {
                userInput: {
                    _id: generateId(),
                    firstName: faker.name.firstName(),
                    lastName: faker.name.lastName()
                }
            };

            const postData = {
                query: userUpdateByIdM,
                variables: userUpdateWrongId
            }

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err)
                    const respData = res.body.errors
                    expect(respData[0].message).to.eq('Cannot return null for non-nullable field User._id.')
                    done()
                })
        });


        it('user update by with empty ID field', (done) => {
            const userUpdateWrongId = {
                userInput: {
                    _id: ' ',
                    firstName: 'updatedFirstName',
                    lastName: 'updatedLastName'
                }
            };

            const postData = {
                query: userUpdateByIdM,
                variables: userUpdateWrongId
            }

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err)
                    const respData = res.body.errors
                    expect(respData[0].message).to.eq('Cannot return null for non-nullable field User._id.')
                    done()
                })
        });


        it('user update by ID - wrong query', (done) => {
            const userUpdateWrongId = {
                userInput: {
                    // _id: generateId(),
                    firstName: 'updatedFirstName',
                    lastName: 'updatedLastName'
                }
            };

            const postData = {
                query: userUpdateByIdMWrong,
                variables: userUpdateWrongId
            }

            requestGql(postData)
                .expect(400)
                .end((err, res) => {
                    if(err) return done(err)
                    const respData = res.body.errors
                    expect(respData[0].message).to.eq('Variable "$userInput" got invalid value { firstName: "updatedFirstName", lastName: "updatedLastName" }; Field "_id" of required type "ID!" was not provided.')
                    done()
                })
        });
    });
});

