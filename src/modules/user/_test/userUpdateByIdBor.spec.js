const {requestGql} = require('../../helper');
const {userCreateM, userGetByIdQ} = require('./queries');
const {de} = require('faker/lib/locales');
const User = require('chai');


describe('USER UPDATE BY ID', () => {
    describe('USER UPDATE BY ID - POSITIVE', () => {
        let userId = null;

        before('user delete all', (done) => {
            User.deleteMany({});
            return done();
        });
    });


    describe('USER UPDATE BY ID - NEGATIVE', () => {

    });
});

