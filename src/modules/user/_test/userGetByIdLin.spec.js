
const {expect} = require ('chai')
const { requestGql } = require('../../helper')
const { userCreateM, userGetByIdQ } = require('./queries')
const { arg } = require('./data')
const generateId = require('../../../utils/generateId')
const User = require('../User')

describe('USER GET BY ID', () => {
    describe('USER GET BY ID - POSITIVE', () => {

        let userId = null;

        before('user delete all', (done) => {
            User.deleteMany({})
            return done();
        });

        before('user create', (done) => {
            const postData = {
                query: userCreateM,
                variables: arg,
            };

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data;
                    userId = res.body.data.userCreate._id
                    done();
                });
        });

        it('user get by id', (done) => {

            const userGet = {
                userId: userId,
            };
            const postData = {
                query: userGetByIdQ,
                variables: userGet,
            };
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data;
                    expect(respData.userGetById._id).eq(userId)
                    expect(respData.userGetById.firstName).eq(arg.userInput.firstName)
                    expect(respData.userGetById.lastName).eq(arg.userInput.lastName)

                    done();
                });
        });
    });
    describe('USER GET BY ID - NEGATIVE 1', () => {
        //let userId = null;

        before('user delete all', (done) => {
            User.deleteMany({})
            return done();
        });

        before('user create', (done) => {
            const postData = {
                query: userCreateM,
                variables: arg,
            };

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data;
                    userId = res.body.data.userCreate._id
                    done();
                });
        });

        it('user get by generatedId', (done) => {

            const userGet = {
                userId: generateId(),
            };
            const postData = {
                query: userGetByIdQ,
                variables: userGet,
            };
            requestGql(postData)

                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.errors[0]
                    expect(respData.message).eq('Cannot return null for non-nullable field Query.userGetById.')
                    expect(respData.extensions.code).to.eq('INTERNAL_SERVER_ERROR')
                    done();
                });
        });

    });


        it('user get by wrong id', (done) => {

            const userGet = {
                userId: 2454
                };
            const postData = {
                query: userGetByIdQ,
                variables: userGet,
            };
            requestGql(postData)

                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.errors[0]
                    expect(respData.message).eq('Cast to ObjectId failed for value "2454" (type string) at path "_id" for model "User"')
                    expect(respData.extensions.code).to.eq('INTERNAL_SERVER_ERROR')
                    done();
                });
        });
    });

        it('user get by null id', (done) => {

            const userGet = {
                userId: null
            };
            const postData = {
                query: userGetByIdQ,
                variables: userGet,
            };
            requestGql(postData)
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.errors[0]
                    expect(respData.message).eq('Variable "$userId" of non-null type "ID!" must not be null.')
                    expect(respData.extensions.code).to.eq('BAD_USER_INPUT')
                    done();
                });
        });

