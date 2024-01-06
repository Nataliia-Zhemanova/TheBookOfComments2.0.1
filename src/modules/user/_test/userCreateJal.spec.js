const {expect} = require('chai')
const {requestGql} = require('../../helper')
const {arg, userIncorrectType} = require('./data')
const {userCreateM} = require('./queries')
describe('USER CREATE', () => {
    describe('USER CREATE - POSITIVE', () => {
        it('user create', (done) => {

            before('user delete all', (done) => {
                User.deleteMany({});
                return done();
            });

            const postData = {
                query: userCreateM,
                variables: arg,
            }
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data
                    expect(respData.userCreate.firstName).eq(arg.userInput.firstName)
                    expect(respData.userCreate.lastName).eq(arg.userInput.lastName)
                    done()
                })
        });
    })

    describe('USER CREATE - NEGATIVE', () => {
        it('user create with empty query', (done) => {
            const postData = {
                query: '',
                variables: arg,
            }
            requestGql(postData)
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.errors[0]
                    expect(respData.message).eq("GraphQL operations must contain a non-empty `query` or a `persistedQuery` extension.")
                    done()
                })
        });

        it('user create with wrong type of first name', (done) => {
            const postData = {
                query: userCreateM,
                variables: userIncorrectType,
            }
            requestGql(postData)
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.errors[0]
                    expect(respData.message).eq("Variable \"$userInput\" got invalid value 123 at \"userInput.lastName\"; String cannot represent a non string value: 123")
                    done()
                })
        });

    })
})