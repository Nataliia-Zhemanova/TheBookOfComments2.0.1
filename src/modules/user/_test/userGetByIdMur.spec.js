const { expect } = require('chai')
const { requestGql } = require ('../../helper')
const { userCreateM, userGetByIdQ} = require('./queries')
const {userInput} = require('./data')
const User = require ('../User')
const generateId = require('../../../utils/generateId')
describe ('USER GET BY ID', () => {
    describe('USER GET BY ID - POSITIVE', () => {
        let userId = null;

        before('user delete all', (done) => {
             User.deleteMany({});
             return done();
        });
        before('user create', (done) => {
            const postData = {
                query: userCreateM,
                variables: userInput,
            };
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body;
                    userId = res.body.data.userCreate._id;
                    console.log("RESP BODY ===", respData);
                    console.log("USER ID ===", userId);
                    done()
                });
        });
        it('user get by id', (done) => {
            const userGet = {
                userId: userId
            }
            const postData = {
                query: userGetByIdQ,
                variables: userGet
            }
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data;
                    console.log("RESP BODY USER GET BY ID ===", respData);
                    expect (respData.userGetById._id).eq(userId);
                    expect (respData.userGetById.firstName).eq(userInput.userInput.firstName);
                    expect (respData.userGetById.lastName).eq(userInput.userInput.lastName);
                    done();
                });
        });
    });
    describe('USER GET BY ID - NEGATIVE', () => {
        let userId = null;
        before('user delete all', (done) => {
            User.deleteMany({});
            return done();
        });
        before('user create', (done) => {
            const postData = {
                query: userCreateM,
                variables: userInput,
            };
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body;
                    userId = res.body.data.userCreate._id;
                    console.log("RESP BODY ===", respData);
                    console.log("USER ID ===", userId);
                    done()
                });
        });
        it('user get by non existing Id', (done) => {
            const userGet = {
                userId: generateId()
            }
            const postData = {
                query: userGetByIdQ,
                variables: userGet
            }
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data;
                    console.log("RESP BODY USER GET BY ID ===", respData);
                    // expect (respData.userGetById._id).eq(userId);
                    // expect (respData.userGetById.firstName).eq(userInput.userInput.firstName);
                    // expect (respData.userGetById.lastName).eq(userInput.userInput.lastName);
                    done();
                });
            });
        });
    });