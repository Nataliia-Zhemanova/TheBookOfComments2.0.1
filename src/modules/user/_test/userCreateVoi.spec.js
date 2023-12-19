const {expect} = require('chai');
const{requestGql} = require('../../helper');
const{userCreateM} = require('./queries');
const{arg} = require('./data');
const faker = require("faker");
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
                    if (err) return done(err);
                    const respData = res.body.data
                    console.log('RESP BODY ===', respData)
                    expect(respData.userCreate.firstName).to.be.a('string')
                    expect(respData.userCreate.lastName).to.be.a('string')
                    done()
                })
        })
    })
    describe('USER CREATE WITH EMPTY FIELDS- NEGATIVE', () => {
        it('user create with empty fields', (done) => {
            const argN = {
                userInput: {
                    firstName: '',
                    lastName: '',
                }
            }
            const postData = {
                query: userCreateM,
                variables: argN,
            }
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data
                    console.log('RESP BODY USER CREATE WITH EMPTY FIELDS===', respData)
                    // expect(respData.userCreate.firstName).eq(null)
                    // expect(respData.userCreate.lastName).eq(null)
                    expect(respData.userCreate._id).eq(false)
                    done()
                })
        })
    })
    describe('USER CREATE WITH ALREADY EXISTING DATA - NEGATIVE', () => {
        it('user create', (done) => {
            const argN = {
                userInput: {
                    firstName: 'Marry',
                    lastName: 'King',
                }
            }
            const postData = {
                query: userCreateM,
                variables: argN,
            }
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data
                    console.log('RESP BODY===', respData)
                    expect(respData.userCreate.firstName).to.be.a('string')
                    expect(respData.userCreate.lastName).to.be.a('string')
                    done()
                })
        })
        it('user create with already existing data', (done) => {
            const argN = {
                userInput: {
                    firstName: 'Marry',
                    lastName: 'King',
                }
            }
            const postData = {
                query: userCreateM,
                variables: argN,
            }
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data
                    console.log('RESP BODY WITH ALREADY EXISTING DATA===', respData)
                    expect(respData.userCreate._id).eq(false)
                    done()
                })
        })
    })
    describe('USER CREATE WITH NOT EXISTING FIELD - NEGATIVE', () => {
        it('user create with not existing field', (done) => {
            const argN = {
                userInput: {
                    firstName: 'Marry',
                    lastName: 'King',
                    country: 'America'
                }
            }
            const postData = {
                query: userCreateM,
                variables: argN,
            }
            requestGql(postData)
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body
                    console.log('RESP BODY===', respData)
                    done()
                })
        })

    })
})