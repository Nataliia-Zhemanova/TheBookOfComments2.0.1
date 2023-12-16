const {expect} = require('chai');
const{requestGql} = require('../../helper');
const{userCreateM, userGetByIdQ} = require('./queries');
const{arg} = require('./data');
const User = require('../User');
const generateId = require('..//..//..//utils/generateId')
describe('USER GET BY ID', () => {
    describe('USER GET BY ID - POSITIVE', () => {
        let userId = null;
        before('user delete all', (done) =>{
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
    describe('USER GET GET BY NON EXISTING ID - NEGATIVE', () => {
        let userId = null;
        before('user delete all', (done) =>{
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
                    const respData = res.body.data;
                    userId = res.body.data.userCreate._id;
                    console.log('RESP BODY ===', respData);
                    console.log('USER ID ===', userId);
                    done()
                })
        })
        it('user get by non existing id ', (done) => {
            const user = {
                userId: generateId(),
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
                    console.log('RESP BODY USER GET BY NON EXISTING ID ===', respData);
                    expect(respData).eq(null)
                    done()
                })
        })
        it('user get by id empty ', (done) => {
            const user = {
                userId: '',
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
                    console.log('RESP BODY USER GET BY EMPTY ID ===', respData);
                    expect(respData).eq(null)
                    done()
                })
        })
    })
})
