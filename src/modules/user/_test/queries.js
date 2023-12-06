const userCreateM = `mutation UserCreate($userInput: UserItems) {
  userCreate(userInput: $userInput) {
    _id
    firstName
    lastName
  }
}`

const userGetByIdQ = `query UserGetById($userId: ID!) {
                userGetById(userId: $userId) {
                    _id
                    lastName
                    firstName
                }
            }`

const usersGetAllQ = `query UsersGetAll($amount: Int) {
  usersGetAll(amount: $amount) {
    _id
    firstName
    lastName
  }
            }`

const userDeleteByIdM = `mutation UserDeleteById($userId: ID!) {
  userDeleteById(userId: $userId)
}`


module.exports = { userCreateM, userGetByIdQ, usersGetAllQ, userDeleteByIdM }