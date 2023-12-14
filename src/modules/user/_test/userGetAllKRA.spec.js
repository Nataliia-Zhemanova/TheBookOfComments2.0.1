const { expect } = require('chai');
const { requestGql } = require('../../helper');
const { userGetAllQ, } = require('./queries');
const { arg } = require('./data');


describe("GET ALL USER", () => {
    describe('GET ALL USER - POSITIVE', () => {

        it('should get all users', (done) => {
            const arg = {
                amount: 5
            };

            const postData = {
                query: userGetAllQ,
                variables: arg,
            };

            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);

                    const respData = res.body.data;
                    expect(respData.usersGetAll.length).not.eq(0);
                    expect(respData.usersGetAll.length).eq(arg.amount);

                    // console.log(respData);
                    // console.log(respData.usersGetAll.length);
                    console.log("RESP BODY USER GET ALL ===", respData);
                    done();
                });
        });

    });

    describe('GET ALL USERS - NEGATIVE', () => {

    });
});
