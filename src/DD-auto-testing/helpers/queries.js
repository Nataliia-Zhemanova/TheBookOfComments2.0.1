

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



function userGetAllQuery(id='_id', firstName='firstName', lastName='lastName'){
    return `query UsersGetAll($amount: Int) {
                          usersGetAll(amount: $amount) {
                             ${id}
                             ${firstName}
                             ${lastName}  
                          }
                        }`
}

//TODO turn to a function
const userDeleteQuery = `mutation UserDeleteById($userId: ID!) {
                          userDeleteById(userId: $userId)
                        }`




    module.exports = { userCreateQuery, userDeleteQuery, userGetByIdQuery, userGetAllQuery }