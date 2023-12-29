

function userCreateQuery(id='_id', firstName='firstName', lastName='lastName'){
    return `mutation UserCreate($userInput: UserItems) {
                            userCreate(userInput: $userInput) {
                                  ${id}
                                  ${firstName}
                                  ${lastName}                                   
                            }
                        }`
}


function userGetByIdQuery(id='_id', firstName='firstName', lastName='lastName'){
    return `query UserGetById($userId: ID!) {
                              userGetById(userId: $userId) {
                                  ${id}
                                  ${firstName}
                                  ${lastName}  
                              }
                            }`
}


//TODO turn to a function
const userGetAllQuery = `query UsersGetAll($amount: Int) {
                          usersGetAll(amount: $amount) {
                            _id
                            firstName
                            lastName
                          }
                        }`


const userDeleteQuery = `mutation UserDeleteById($userId: ID!) {
                          userDeleteById(userId: $userId)
                        }`




    module.exports = { userCreateQuery, userDeleteQuery, userGetByIdQuery, userGetAllQuery }