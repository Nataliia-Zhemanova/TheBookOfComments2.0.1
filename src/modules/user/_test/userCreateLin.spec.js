
const { expect} = require ('chai')
const { requestGql } = require('../../helper')
const { userCreateM} = require('./queries')
const { arg, argN1 } = require('./data')
describe('USER CREATE', () => {
    describe('USER CREATE - POSITIVE', () => {
      it('user create', (done) => {

          const postData = {
              query: userCreateM,
              variables: arg,
          };

          requestGql(postData)
              .expect(200)
              .end((err, res) => {
                  if(err) return done(err);
                  const respData = res.body.data
                  expect(respData.userCreate.firstName).eq(arg.userInput.firstName)
                  expect(respData.userCreate.lastName).eq(arg.userInput.lastName)
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
                    .expect(400)
                    .end((err, res) => {
                        if (err) return done(err);
                        const respData = res.body.errors[0]
                        expect(respData.message).eq('Variable "$userInput" got invalid value 555 at "userInput.firstName"; String cannot represent a non string value: 555')
                        expect(respData.extensions.code).to.eq('BAD_USER_INPUT')
                        done();

                    });
            });
        });
    });
})
