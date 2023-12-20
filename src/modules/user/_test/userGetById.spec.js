const { expect } = require ('chai')
const {requestGql } = require ('../../helper')
const {userCreateM, userGetByIdQ} = require('./queries')
const { arg } = require('./data');
const User = require('../User')
describe("USER GET BY ID", () => {
    describe('USER GET BY ID - POSITIVE', () => {
        let userId = null;
        before('user delete all', (done) => {
            User.deleteMany({});
            return done();

        })
        before('userCreate', (done) => {
            const postData = {
                query: userCreateM,
                variables: arg,
            };
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data
                    userId = res.body.data.userCreate._id
                    done();

                })
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

                    const respData = res.body.data
                    expect(respData.userGetById._id).eq(userId);
                    expect(respData.userGetById.firstName).eq(arg.userInput.firstName)
                    expect(respData.userGetById.lastName).eq(arg.userInput.lastName)

                    done();

                });
        });

    });
})
    describe('USER GET BY ID - NEGATIVE ', () => {
        let userId = null;
        before('user delete all', (done) => {
            User.deleteMany({});
            return done();

        })
        before('userCreate', (done) => {
            const postData = {
                query: userCreateM,
                variables: arg,
            };
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data
                    userId = res.body.data.userCreate._id
                    done();

                })
        });

        it('user get by non existing id', (done) => {

            const userGet = {
                userId: generatedId(),
            };
            const postData = {
                query: userGetByIdQ,
                variables: userGet,
            };


            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data
                    expect(respData.userGetById._id).eq(userId);
                    expect(respData.userGetById.firstName).eq(arg.userInput.firstName)
                    expect(respData.userGetById.lastName).eq(arg.userInput.lastName)

                    done();

                });
        });

    });
});


