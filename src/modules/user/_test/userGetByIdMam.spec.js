const { expect } = require('chai')

const {requestGql} = require ('../../helper')
const {userCreateM, userGetByIdQ } = require ('./queries')
const { arg } = require ('./data')
const User = require('../User')
const generateId = require('../../../utils/generateId')

describe('USER GET BY ID', () => {
    describe('USER GET BY ID - POSITIVE', () => {
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
                    const respData = res.body.data
                    userId = res.body.data.userCreate._id
                    console.log("RESP BODY ===", respData)
                    console.log("USER ID ===", userId)
                    done()
                })
        })


        it('user get by id', (done) => {
            const userGet = {
                userId: userId,
            };
            const postData = {
                query: userGetByIdQ,
                variables: userGet
            }

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.data
                    const userId = res.body.data.userGetById._id
                    console.log("RESP BODY USER GET BY ID ===", respData)

                    expect(respData.userGetById._id).eq(userId)
                    expect(respData.userGetById.firstName).eq(arg.userInput.firstName)
                    expect(respData.userGetById.lastName).eq(arg.userInput.lastName)
                    done()
                })
        });
    })




    describe('USER GET BY ID  - NEGATIVE', () => {
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
                    const respData = res.body.data
                    userId = res.body.data.userCreate._id
                    console.log("RESP BODY ===", respData)
                    console.log("USER ID ===", userId)
                    done()
                })
        })


        it('user get by non existing id', (done) => {
            const userGet = {
                userId: generateId(),
            };
            const postData = {
                query: userGetByIdQ,
                variables: userGet
            }

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body;
                    console.log("RESP BODY USER GET BY ID ===", respData)


                    expect(respData.data).to.eq(null)
                    expect(respData.errors[0].message).to.eq('Cannot return null for non-nullable field Query.userGetById.')
                    done()
                })
        });

        it('user get with empty id string', (done) => {
            const userGet = {
                userId: '',
            };
            const postData = {
                query: userGetByIdQ,
                variables: userGet
            }

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body;
                    console.log('GET BY EMPTY ID RESP ===', respData)

                    expect(respData.data).to.eq(null)
                    expect(respData.errors[0].message).to.eq('Cast to ObjectId failed for value "" (type string) at path "_id" for model "User"')
                    done()
                })
        });



        it('user get with invalid id type', (done) => {
            const userGet = {
                userId: 123456789,
            };
            const postData = {
                query: userGetByIdQ,
                variables: userGet
            }

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body;

                    expect(respData.data).to.eq(null)
                    expect(respData.errors[0].message).to.eq('Cast to ObjectId failed for value "123456789" (type string) at path "_id" for model "User"')
                    done()
                })
        });




        it.skip('get a deleted user by ID', (done) => {  //BUG
            const userGet = {
                userId: '657695f72f8467fbedfa90ac',
            };
            const postData = {
                query: userGetByIdQ,
                variables: userGet
            }

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body;
                    console.log('GET DELETED USER BY ID RESP ===', respData)

                    // expect(respData.data).to.eq(null)
                    // expect(respData.errors[0].message).to.eq('Cannot return null for non-nullable field Query.userGetById.')
                    done()
                })
        });
    })
});