// const request = require('supertest')
// const {expect} = require ('chai')
// const graphQLEndpoint = 'http://localhost:5000/graphql'
//
// describe('USER CREATE', () => {
//     describe('USER CREATE - POSITIVE', () => {
//         it('user create', (done) => {
//
//             const arg = {
//                 userInput: {
//                     firstName: 'firstName',
//                     lastName: 'lastName'
//                 }
//             }
//             const postData = {
//                 query: `mutation UserCreate($userInput: UserItems) {
//   userCreate(userInput: $userInput) {
//     _id
//     firstName
//     lastName
//   }
// }`,
//                 variables: arg
//             }
//             request(graphQLEndpoint)
//                 .post('/')
//                 //.post('http://localhost:5000/graphql')
//                 .send(postData)
//                 .expect(200)
//                 .end((err, res) => {
//                     if(err) return done(err);
//                     const respData = res.body.data
//                     console.log("RESP BODY ===", respData)
//                     //expect(respData.userCreate.firstName).eq('firstName')
//                     //expect(respData.userCreate.lastName).eq('lastName')
//                     done()
//
//                 })
//         })
//
//         it('user update by id', (done) => {
//
//             const arg = {
//                 userInput: {
//                     _id: userId,
//                     firstName: 'newFirstName',
//                     lastName: 'newLastName'
//                 },
//             };
//             // {
//             //     "userInput": {
//             //     "_id": null,
//             //         "firstName": null,
//             //         "lastName": null
//             // }
//             // }
//
//             const postData = {
//                 query: `mutation UserUpdateById($userInput: UserFields) {
//                 userUpdateById(userInput: $userInput) {
//                     _id
//                     lastName
//                     firstName
//                 }
//             }`,
//
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
//                     console.log("RESP BODY USER UPDATE BY ID ===", respData)
//                     expect(respData.userUpdateById._id).eq(userId)
//                     // expect(respData.userUpdateById.firstName).eq(user.userInput.firstName)
//                     //expect(respData.userUpdateById.lastName).eq(user.userInput.lastName)
//
//                     done();
//                 });
//         });
//     });
//     describe('USER UPDATE BY ID - NEGATIVE', () => {});
//
// })
//_____________________OLD VERSION____________________


const {expect} = require ('chai')
const { requestGql } = require('../../helper')
const { userCreateM, userUpdateByIdM} = require('./queries')
const { arg } = require('./data')
const User = require('../User')

describe('USER UPDATE BY ID', () => {
    describe('USER UPDATE BY ID - POSITIVE', () => {

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
                    if(err) return done(err);
                    const respData = res.body.data
                    console.log("RESP BODY ===", respData)
                    //expect(respData.userCreate.firstName).eq('firstName')
                    //expect(respData.userCreate.lastName).eq('lastName')
                    done()

                })
        })
// BUG
        it.skip('user update by id', (done) => {

            const arg = {
                userId: userId,
            };

            const postData = {
                query: userUpdateByIdM,
                variables: arg,
            };

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data;

                    console.log("RESP BODY USER UPDATE BY ID ===", respData)
                    expect(respData.userUpdateById._id).eq(userId)
                    // expect(respData.userUpdateById.firstName).eq(user.userInput.firstName)
                    //expect(respData.userUpdateById.lastName).eq(user.userInput.lastName)

                    done();
                });
        });
    });
    describe('USER UPDATE BY ID - NEGATIVE', () => {});

})