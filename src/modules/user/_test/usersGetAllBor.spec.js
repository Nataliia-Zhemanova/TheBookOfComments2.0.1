const request = require("supertest");
const { expect } = require("chai");
const graphQLEndpoint = "http://localhost:5000/graphql";
const {userGetAllQ} = require('./queries');

describe("USERS GET ALL", () => {
    describe("USERS GET ALL - POSITIVE", () => {
        it("users get all", (done) => {
            const arg = {
                userId: null
            };
            const postData = {
                query: userGetAllQ,
                variables: arg,
            };
            request(graphQLEndpoint)
                .post("/")
                .send(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data;
                    console.log("RESP BODY ===", respData);
                    expect(respData.usersGetAll).to.be.an('array');
                    done();
                });
        });
    });



    describe("USERS GET ALL - NEGATIVE", () => {


    });
});
