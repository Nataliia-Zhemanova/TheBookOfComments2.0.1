const { expect } = require("chai");
const { requestGql } = require ('../../helper')
const { userCreateM } = require ('./queries')
const {  userInput } = require ('./data')
const faker = require('faker');
describe("USER CREATE", () => {
  describe("USER CREATE - POSITIVE", () => {
    it("user create", (done) => {
        const postData = {
          query: userCreateM,
          variables: userInput,
        };
        requestGql(postData)
          .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const respData = res.body.data;
          expect(respData.userCreate.firstName).eq(userInput.userInput.firstName);
          expect(respData.userCreate.lastName).eq(userInput.userInput.lastName);
          done();
        });
    });
  });
  describe("USER CREATE - NEGATIVE", () => {
      it('user create with invalid type of first name', (done) => {
          const userInvInput = {
              userInput: {
                  firstName: 1,
                  lastName: null,
              },
          };

          const postData = {
              query: userCreateM,
              variables: userInvInput,
          };
          requestGql(postData)
              .expect(400)
              .end((err, res) => {
                  if (err) return done(err);
                  const respData = res.body.errors;
                  expect(respData[0].extensions.code).eq("BAD_USER_INPUT");
                  done();
              });
      })
  });
});
