const userCreateM = `mutation UserCreate($userInput: UserItems) {
  userCreate(userInput: $userInput) {
    _id
    firstName
    lastName
  }
}`
// new field email or firstName3

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

const userUpdateByIdM = `mutation UserUpdateById($userInput: UserFields) {
   userUpdateById(userInput: $userInput) {
     _id
     lastName
     firstName
     }
}`

module.exports = { userCreateM, userGetByIdQ, usersGetAllQ, userDeleteByIdM, userUpdateByIdM }