const { expect } = require('chai')
const {requestGql} = require ('../../helper')
const {userCreateM, userUpdateByIdM, userUpdateByIdMWrong} = require ('./queries')
const { arg } = require ('./data')
const User = require('../User')
const generateId = require('../../../utils/generateId')
const faker = require('faker')



describe('USER UPDATE BY ID', () => {

    describe('USER UPDATE BY ID - POSITIVE', () => {
        let userId = null;

        before('user delete all', (done) => {
            User.deleteMany({})
            return done()
        })

        before('user create', (done) => {
            const postData = {
                query: userCreateM,
                variables: arg,
            }

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    userId = res.body.data.userCreate._id
                    done()
                })
        })

        it.skip('update user by id', (done) => {
            const userUpdate = {
                userInput: {
                    _id: userId,
                    firstName: faker.name.firstName(),
                    lastName: faker.name.lastName()
                }
            };

            const postData = {
                query: userUpdateByIdM,
                variables: userUpdate
            }

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);

                    const respData = res.body.data
                    const userId = res.body.data.userUpdateById._id


                    expect(respData.userUpdateById._id).eq(userId)
                    expect(respData.userUpdateById.firstName).eq(userUpdate.userInput.firstName)
                    expect(respData.userUpdateById.lastName).eq(userUpdate.userInput.lastName)

                    done()
                })
        });
    });

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