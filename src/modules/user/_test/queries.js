const userCreateM =  `mutation UserCreate($userInput: UserItems) {
  userCreate(userInput: $userInput) {
    _id
    firstName
    lastName
  }
}`

const userGetByIdQ = `query UserGetById($userId: ID!) {
  userGetById(userId: $userId) {
    _id
    firstName
    lastName
  }
}`

const userUpdateByIdM = `mutation UserUpdateById($userInput: UserFields) {
  userUpdateById(userInput: $userInput) {
    _id
    firstName
    lastName
  }
}`

const userUpdateByIdMWrong = `mutation UserUpdateById($userInput: UserFields) {
  userUpdateById(userInput: $userInput) {
    firstName
    lastName
  }
}`

const usersGetAllQ = `query UsersGetAll($amount: Int) {
  usersGetAll(amount: $amount) {
    _id
    firstName
    lastName
  }
}`

    module.exports = { userCreateM, userGetByIdQ, userUpdateByIdM, userUpdateByIdMWrong, usersGetAllQ }