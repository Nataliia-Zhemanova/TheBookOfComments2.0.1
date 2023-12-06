// const request = require('supertest')
const {expect} = require ('chai')
// const graphQLEndpoint = 'http://localhost:5000/graphql'
const { requestGql } = require('../../helper')
const { userCreateM, usersGetAllQ } = require('./queries')
const { arg, arg2 } = require('./data')
//const generateId = require('../../../utils/generateId')
const User = require('../User')
describe('USERS GET ALL', () => {
    describe('USER GET ALL - POSITIVE', () => {

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


           // request(graphQLEndpoint)
            requestGql(postData)
                // .post('/')
                // //.post('http://localhost:5000/graphql')
                // .send(postData)
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
        it('users get all', (done) => {


            const postData = {
                query: usersGetAllQ,
                variables: arg2,
            };


            //     const arg = {
  //               amount: 3,
  //           };
  //           const postData = {
  //               query: `query UsersGetAll($amount: Int) {
  // usersGetAll(amount: $amount) {
  //   _id
  //   firstName
  //   lastName
  // }
  //           }`,
  //               variables: arg
  //           };
            requestGql(postData)

               //   .post('/')
               //.post('http://localhost:5000/graphql')
               // .send(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data;

                    //console.log("RESP BODY USER GET BY ID ===", respData)
                    expect(respData.usersGetAll.length).not.eq(0)
                    expect(respData.usersGetAll.length).eq(arg2.amount)
                    console.log(respData)
                    console.log(respData.usersGetAll.length)

                    done();
                });
        });
    });
    describe('USERs GET ALL - NEGATIVE', () => {});

})

