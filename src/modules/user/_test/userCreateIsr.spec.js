// const qraphQLEndpoint = 'http://localhost:5000/graphql'
// Убрали потому что импортировали
const {expect} = require ('chai')
const {requestGql} = require('../../helper')
const {userCreateMutation} = require('./queries')
const {arg} = require('./data')
describe ('USER CREATE', () => {
    describe ('USER CREATE - POSITIVE', () => {
        it('user create', (done) => {
            // const arg = {
            // userInput: {
            // firstName: 'firstName1',
            // lastName: 'lastName1'
            // }
            // }
            const postData = {
                query: userCreateMutation,
                //   query: `mutation UserCreate($userInput: UserItems) {
                //   userCreate(userInput: $userInput) {
                //     _id
                //     firstName
                //     lastName
                //   }
                // }`,
                // Убрали потому что импортировали
                variables: arg
            }
            requestGql(postData)
                // request(qraphQLEndpoint)
                // .post('/')
                // .send(postData)
                // Убрали потому что импортировали
                .expect(200) // supertest
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data
                    console.log('RESP BODY ===', respData);
                    // expect(respData.userCreate.firstName).eq('firstName1')
                    // expect(respData.userCreate.lastName).eq('lastName1')
                    done()
                })
        })
    })
    describe ('USER CREATE - NEGATIVE', () => {
        it('user update with empty query', (done) => {
            const postData = {
                query: ``,
                variables: arg
            }
            requestGql(postData)
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.errors[0]
                    console.log('RESP BODY ===', respData);
                    expect(respData.message).eq('GraphQL operations must contain a non-empty `query` or a `persistedQuery` extension.')
                    expect(respData.extensions.code).eq('INTERNAL_SERVER_ERROR')
                    done()
                })
        })
       })
    })
