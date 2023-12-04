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
   firstName
   lastName
   }
 }`
const userDeleteByIdM = `mutation Mutation($userId: ID!) {
    userDeleteById(userId: $userId)
 }`
const usersGetByAllQ = `query Query($amount: Int) {
  usersGetAll(amount: $amount) {
    _id
    firstName
    lastName
  }
}`
const userUpdateByIdM = `mutation Mutation($userInput: UserFields) {
  userUpdateById(userInput: $userInput) {
  _id
  firstName
  lastName
  }
}`
module.exports = {userCreateM, userGetByIdQ, userDeleteByIdM, usersGetByAllQ, userUpdateByIdM}