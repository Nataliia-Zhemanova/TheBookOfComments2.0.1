const {requestGql} = require('../../helper');
const {userCreateM, userDeleteByIdM} = require('./queries');
const {userInput} = require('./data');
const generateId = require('../../../utils/generateId')
const User = require('../User');
const {expect} = require('chai');
describe('USER DELETE BY ID', () => {
    describe('USER  DELETE BY ID - POSITIVE', () => {
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
                    const respData = res.body.data;
                    userId = res.body.data.userCreate._id;
                    console.log('RESP BODY ===', respData);
                    console.log('USER ID ===', userId);
                    done();
                });
        });

        it('user delete by id', (done) => {
            const userGet = {
                userId: userId,
            };
            const postData = {
                query: userDeleteByIdM,
                variables: userGet,
            };
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data;
                    console.log('RESP BODY USER DELETE BY ID ===', respData);
                    expect(respData.userDeleteById).eq(true);
                    done();
                });
        });
    });

    describe('USER DELETE BY ID - NEGATIVE', () => {
        it('user delete by empty id', (done) => {
            const userGet = {
                userId: "",
            };
            const postData = {
                query: userDeleteByIdM,
                variables: userGet,
            };
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data;
                    console.log('RESP BODY USER DELETE BY ID ===', respData);
                    expect(respData.userDeleteById).eq(null);
                    done();
                });
        });
    })
});