const request = require('supertest')
const {expect} = require('chai')
const graphQlEndpoint = 'http://localhost:5000/graphql'

describe('GET ALL USERS', () => {
    describe('GET ALL USERS - POSITIVE', () => {

        it('get all users', async () => {

            const arg = {
                amount: 5
            }

            const postData = {
                query: `query Query($amount: Int) {
  usersGetAll(amount: $amount) {
    _id
    firstName
    lastName
  }
}`,
                variables: arg
            }
            //
            // request(graphQlEndpoint)
            //     .post('/')
            //     .send(postData)
            //     .expect(200)
            //     .end((err, res) => {
            //         if (err) return err
            //         const respData = res.body.data
            //         expect(respData.usersGetAll.length).not.eq(0)
            //         expect(respData.usersGetAll.length).eq(arg.amount)
            //         console.log(respData)
            //         console.log(respData.usersGetAll.length)
            //         done()
            //
            //     })

            const res = await request(graphQlEndpoint)
                .post('/')
                .send(postData)
                .expect(200)
            const respData = res.body.data
            expect(respData.usersGetAll.length).eq(arg.amount)
            console.log(respData)

        });
    });


    describe('GET ALL USERS - NEGATIVE', () => {

    });
});