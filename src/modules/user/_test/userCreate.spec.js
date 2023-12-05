//const request = require('supertest')
const { expect} = require ('chai')
//const graphQLEndpoint = 'http://localhost:5000/graphql'

const { requestGql } = require('../../helper')

const { userCreateM} = require('./queries')
// or const { userCreateM , arg } = require('./queries')

const { arg } = require('./data')
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
                  expect(respData.userCreate.firstName).eq("firstName1")
                  expect(respData.userCreate.lastName).eq("lastName1")
                  done();

              });
      });
    });
    describe('USER CREATE - NEGATIVE', () => {

    })
})
