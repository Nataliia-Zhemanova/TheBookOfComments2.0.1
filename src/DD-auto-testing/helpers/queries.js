

function userCreateQuery(id='_id', firstName='firstName', lastName='lastName'){
    return `mutation UserCreate($userInput: UserItems) {
                            userCreate(userInput: $userInput) {
                                  ${id}
                                  ${firstName}
                                  ${lastName}                                   
                            }
                        }`
}

const userDeleteQuery = `mutation UserDeleteById($userId: ID!) {
                          userDeleteById(userId: $userId)
                        }`

const userGetByIdQuery = `query UserGetById($userId: ID!) {
                              userGetById(userId: $userId) {
                                _id
                                firstName
                                lastName
                              }
                            }`

const userGetAllQuery = `query UsersGetAll($amount: Int) {
                          usersGetAll(amount: $amount) {
                            _id
                            firstName
                            lastName
                          }
                        }`
    module.exports = { userCreateQuery, userDeleteQuery, userGetByIdQuery, userGetAllQuery }