//const request = require('supertest')
const { expect} = require ('chai')
//const graphQLEndpoint = 'http://localhost:5000/graphql'

const { requestGql } = require('../../helper')

const { userCreateM} = require('./queries')
// or const { userCreateM , arg } = require('./queries')

const { arg, argN1 } = require('./data')
//const faker = require("faker");
//const generateId = require("../../../utils/generateId");

describe('USER CREATE', () => {
    describe('USER CREATE - POSITIVE', () => {
      it('user create', (done) => {

          const postData = {
              query: userCreateM,
              variables: arg,
          };

          // const arg = {
          //   userInput: {
          //     firstName: 'firstName',
          //     lastName: 'lastName'
          //   }
          // }
//           const postData = {
//               query: `mutation UserCreate($userInput: UserItems) {
//   userCreate(userInput: $userInput) {
//     _id
//     firstName
//     lastName
//   }
// }`,
 //              variables: arg
  //        }
          requestGql(postData)
          // request(graphQLEndpoint)
          //     .post('/')
          // //.post('http://localhost:5000/graphql')
          //     .send(postData)
              .expect(200)
              .end((err, res) => {
                  if(err) return done(err);
                  const respData = res.body.data
                  console.log("RESP BODY ===", respData)
                  expect(respData.userCreate.firstName).eq(arg.userInput.firstName)
                  expect(respData.userCreate.lastName).eq(arg.userInput.lastName)
                  //expect(respData.userCreate.lastName).eq("lastName1")
                  done();

              });
      });
    });
    describe('USER CREATE - NEGATIVE', () => {
        describe('USER CREATE - NEGATIVE', () => {
            it('user create negative', (done) => {

                const postData = {
                    query: userCreateM,
                    variables: argN1,
                };

                requestGql(postData)
                    // request(graphQLEndpoint)
                    //     .post('/')
                    // //.post('http://localhost:5000/graphql')
                    //     .send(postData)
                    .expect(400)
                    .end((err, res) => {
                        if (err) return done(err);
                        const respData = res.body.errors[0]
                        console.log("RESP BODY ===", respData)

                        expect(respData.message).eq('Variable "$userInput" got invalid value 555 at "userInput.firstName"; String cannot represent a non string value: 555')
                        expect(respData.extensions.code).to.eq('BAD_USER_INPUT')
                        done();

                    });
            });
        });
    });
})

// const respData = res.body.errors[0]
// console.log("====", respData)
// expect(respData.message).eq('GraphQL operations must contain a non-empty query or a persistedQuery extension.')
// expect(respData.extensions.code).to.eq('INTERNAL_SERVER_ERROR')