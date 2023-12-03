// const qraphQLEndpoint = 'http://localhost:5000/graphql'
// const request = require ("supertest")
// Убрали потому что импортировали

const {expect} = require ('chai')
const {requestGql} = require('../../helper')
const {userCreateMutation, userGetByIdQ} = require('./queries')
const {arg} = require('./data')

describe ('USER GET BY ID', () => {
    describe ('USER GET BY ID - POSITIVE', () => {
       let userId = null;
                                               // let user = {
                                               // userInput: {
                                               // firstName: 'firstName1',
                                               // lastName: 'lastName1'
                                               // }
                                               // }
        it('user create', (done) => {
                const postData = {
                    query: userCreateMutation,
                                                // query: `mutation UserCreate($userInput: UserItems) {
                                                // userCreate(userInput: $userInput) {
                                                // _id
                                                // firstName
                                                // lastName
                                                //   }
                                                // }` Убрали потому что импортировали
                variables:  arg,
            };
                requestGql(postData)
                                                // request(qraphQLEndpoint)
                                                // .post('/')
                                                // .send(postData)
                                                // Убрали потому что импортировали

                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.data
                    userId = res.body.data.userCreate._id
                    console.log('RESP BODY ===', respData);
                    console.log('USER ID ===', userId);
                    done()
                })
        })

        it("user get by id", (done) => {
        const userGet = {
            userId: userId,
        };
        const postData = {
            query: userGetByIdQ,
                                                // query: `query UserGetById($userId: ID!) {
                                                // userGetById(userId: $userId) {
                                                // _id
                                                // firstName
                                                // lastName
                                                // }
                                                // }`,
            variables:  userGet
        };
            requestGql(postData)                // request(qraphQLEndpoint)
                                                // .post('/')
                                                // .send(postData)
                                                // Убрали потому что импортировали
            .expect(200)
            .end((err, res) => {
                if(err) return done(err);
                const respData = res.body.data
                console.log('RESP BODY USER GET BY ID ===', respData);
                expect(respData.userGetById._id).eq(userId)
                expect(respData.userGetById.firstName).eq(arg.userInput.firstName)
                expect(respData.userGetById.lastName).eq(arg.userInput.lastName)
                done()
            })
    })
})
    describe ('USER GET BY ID - NEGATIVE', () => {});
    })