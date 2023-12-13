const { expect } = require("chai");
const { requestGql } = require("../../helper");
const { userCreateM } = require("./queries");
const { arg, argEmptyFirstName, argNumLastName, argExtraData } = require("./data");
const User = require("../User");

describe("USER CREATE", () => {
  describe("USER CREATE - POSITIVE", () => {
    before("user delete all", (done) => {
      User.deleteMany({});
      return done();
    });

    it("user create", (done) => {
      const postData = {
        query: userCreateM,
        variables: arg,
      };
      requestGql(postData)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const respData = res.body.data;
          expect(respData.userCreate.firstName).to.equal(arg.userInput.firstName);
          expect(respData.userCreate.lastName).to.equal(arg.userInput.lastName);
          done();
        });
    });
  });

  describe("USER CREATE - NEGATIVE", () => {

    it("user create - empty first name", (done) => {
      const postData = {
        query: userCreateM,
        variables: argEmptyFirstName,
      };
      requestGql(postData)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const respData = res.body.data;
          expect(respData.userCreate.firstName).to.equal(argEmptyFirstName.userInput.firstName);
          expect(respData.userCreate.lastName).to.equal(argEmptyFirstName.userInput.lastName);
          done();
        });
    });

    it("user create - numbers in lastname", (done) => {
      const postData = {
        query: userCreateM,
        variables: argNumLastName,
      };
      requestGql(postData)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const respData = res.body.data;
          expect(respData.userCreate.firstName).to.equal(argNumLastName.userInput.firstName);
          expect(respData.userCreate.lastName).to.equal(argNumLastName.userInput.lastName);
          done();
        });
    });

    it("user create - redundant data", (done) => {
      const postData = {
        query: userCreateM,
        variables: argExtraData,
      };
      requestGql(postData)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const respData = res.body.data;
          expect(respData.userCreate.firstName).to.equal(argExtraData.userInput.firstName);
          expect(respData.userCreate.lastName).to.equal(argExtraData.userInput.lastName);
          done();
        });
    });
  });
});
