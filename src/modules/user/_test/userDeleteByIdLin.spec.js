// const request = require('supertest')
// const {expect} = require ('chai')
// const graphQLEndpoint = 'http://localhost:5000/graphql'
//
// describe('USER DELETE BY ID', () => {
//     describe('USER DELETE BY ID - POSITIVE', () => {
//
//         let userId = null;
//         let user = {
//             userInput: {
//                 firstName: "firstName",
//                 lastName: "lastName",
//             },
//         };
//
//         it('user create', (done) => {
//
//             const postData = {
//                 query: `mutation UserCreate($userInput: UserItems) {
//   userCreate(userInput: $userInput) {
//     _id
//     firstName
//     lastName
//   }
// }`,
//                 variables: user,
//             };
//             request(graphQLEndpoint)
//                 .post('/')
//                 //.post('http://localhost:5000/graphql')
//                 .send(postData)
//                 .expect(200)
//                 .end((err, res) => {
//                     if (err) return done(err);
//                     const respData = res.body.data;
//                     userId = res.body.data.userCreate._id
//                     console.log("RESP BODY ===", respData)
//                     console.log("USER ID ===", userId)
//                     //expect(respData.userCreate.firstName).eq('firstName')
//                     //expect(respData.userCreate.lastName).eq('lastName')
//                     done();
//                 });
//         });
//
//         it('user delete by id', (done) => {
//
//             const arg = {
//                 userId: userId,
//             };
//             const postData = {
//                 query: `mutation UserDeleteById($userId: ID!) {
//   userDeleteById(userId: $userId)
// }`,
//                 variables: arg
//             };
//             request(graphQLEndpoint)
//                 .post('/')
//                 //.post('http://localhost:5000/graphql')
//                 .send(postData)
//                 .expect(200)
//                 .end((err, res) => {
//                     if (err) return done(err);
//                     const respData = res.body.data;
//
//                     console.log("RESP BODY USER DELETE BY ID ===", respData)
//                     expect(respData.userDeleteById).to.be.true
//                     //expect(respData.userGetById.firstName).eq(user.userInput.firstName)
//                     //expect(respData.userGetById.lastName).eq(user.userInput.lastName)
//
//                     done();
//                 });
//         });
//     });
//     describe('USER GET BY ID - NEGATIVE', () => {});
// })
//
//
// ___________________________________ OLD VERSION ____________________________________


const {expect} = require ('chai')
const { requestGql } = require('../../helper')
const { userCreateM,userDeleteByIdM} = require('./queries')
const { arg} = require('./data')
//const generateId = require('../../../utils/generateId')
const User = require('../User')
const generateId = require("../../../utils/generateId");
describe('USER DELETE BY ID', () => {
    describe('USER DELETE BY ID - POSITIVE', () => {

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
                    console.log("RESP BODY ===", respData)
                    console.log("USER ID ===", userId)
                    //expect(respData.userCreate.firstName).eq('firstName')
                    //expect(respData.userCreate.lastName).eq('lastName')
                    done();
                });
        });

        it('user delete by id', (done) => {
            const arg = {
                userId: userId,
            };
            const postData = {
                query: userDeleteByIdM,
                variables: arg,
            };

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data;

                    console.log("RESP BODY USER DELETE BY ID ===", respData)
                    expect(respData.userDeleteById).to.be.true
                    done();
                });
        });
    });
    describe('USER GET BY ID - NEGATIVE', () => {


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
                    console.log("RESP BODY ===", respData)
                    console.log("USER ID ===", userId)
                    //expect(respData.userCreate.firstName).eq('firstName')
                    //expect(respData.userCreate.lastName).eq('lastName')
                    done();
                });
        });

        it('user delete null id', (done) => {
            const arg = {
                userId: null,
            };
            const postData = {
                query: userDeleteByIdM,
                variables: arg,
            };

            requestGql(postData)
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.errors[0]
                    console.log('RESP BODY USER GET BY ID ===', respData);
                    expect(respData.message).eq('Variable "$userId" of non-null type "ID!" must not be null.')
                    expect(respData.extensions.code).to.eq('BAD_USER_INPUT')
                    done();
            });
        });
    });
    describe('USER GET BY ID - NEGATIVE 2', () => {


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
                    console.log("RESP BODY ===", respData)
                    console.log("USER ID ===", userId)
                    //expect(respData.userCreate.firstName).eq('firstName')
                    //expect(respData.userCreate.lastName).eq('lastName')
                    done();
                });
        });

        it('user delete number id', (done) => {
            const arg = {
                userId: 888,
            };
            const postData = {
                query: userDeleteByIdM,
                variables: arg,
            };

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.errors[0]
                    console.log('RESP BODY USER GET BY ID ===', respData);
                    expect(respData.message).eq('Cast to ObjectId failed for value "888" (type string) at path "_id" for model "User"')
                    expect(respData.extensions.code).to.eq('INTERNAL_SERVER_ERROR')
                    done();
                });
        });
    });
})