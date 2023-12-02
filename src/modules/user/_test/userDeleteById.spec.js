const request = require('supertest')
const {expect} = require('chai')
const graphQLEndpoint = 'http://localhost:5000/graphql'

describe('USER DELETE BY ID', () =>{
    describe('USER DELETE BY ID - POSITIVE', () => {
        let userId = null;
        let user = {
            userInput: {
                firstName: 'firstName4',
                lastName: 'lastName4'
            }
        }
        it('user create', (done) =>{
            const postData = {
                query: `mutation UserCreate($userInput: UserItems) {
                userCreate(userInput: $userInput) {
                _id
                 firstName
                 lastName
                 }
                 }`,
                variables: user
            }
            request(graphQLEndpoint)
                .post('/')
                .send(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.data;
                    userId = res.body.data.userCreate._id;
                    console.log('RESP BODY ===', respData)
                    console.log('USER ID ===', userId);
                    done()
                })
        })
        it('user delete by id', (done) => {
            const arg = {
                userId: userId,
            };
            const postData = {
                query: `mutation UserDeleteById($userId: ID!) {
                       userDeleteById(userId: $userId)
                       }`,
                variables: arg
            }
            request(graphQLEndpoint)
                .post('/')
                .send(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    const respData = res.body.data;
                    console.log('USER DELETE BY ID ===', respData);
                    expect(respData.userDeleteById).to.be.true;
                    done()
                })
        })
    })
    describe('USER CREATE - NEGATIVE', () =>{
    })
})