const { expect } = require ('chai')
const {requestGql } = require ('../../helper')
const {userCreateM, userUpdateByIdM} = require('./queries')
const { arg } = require('./data');
describe('USER UPDATE BY ID', () =>{
    let userId
    describe('USER UPDATE BY ID - POSITIVE', () =>{
        it('user create', (done) =>{
            const arg = {
                userInput: {
                    firstName: 'firstName',
                    lastName: 'lastName'
                }
            }
            const postData = {
                query: userCreateM,
                variables: arg,
            };
            requestGql(postData)
                .expect(200)
                .end((err, res) => {
                   if(err) return done(err);
                   const respData = res.body.data;
                   userId = res.body.data.userCreate._id
                   console.log('RESP BODY ===', respData)
                   console.log('USER ID ===', userId)
                   done()
               })
        });
        it('user update by id', (done) => {
            const updateUserArg = {
                userInput: {
                    _id: userId,
                    firstName: 'newFirstName',
                    lastName: 'newLastName'
                }
            };

            const updateUserPostData = {
                query: userUpdateByIdM,
                variables: updateUserArg  // Fix typo here
            };

            requestGql(updateUserPostData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data
                    console.log('RESP BODY USER UPDATE BY ID ===', respData);
                    done()


                })
        })
    })
})
    // describe('USER UPDATE BY ID - NEGATIVE', () = >{
    //
    // })
