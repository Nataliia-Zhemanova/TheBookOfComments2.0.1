const request = require('supertest')
const {expect} = require('chai')
const  graphQLEndpoint = 'http://localhost:5000/graphql'


describe('USER CREATE', () => {
    describe('USER CREATE - POSITIVE', () => {
it('user create', () =>{


    request(graphQLEndpoint)
        .post('/')
        .send()


})
    })
        describe('USER CREATE - NEGATIVE', () => {
    })
})