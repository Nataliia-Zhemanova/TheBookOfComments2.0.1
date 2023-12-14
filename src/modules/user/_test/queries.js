const userCreateM =` mutation UserCreate($userInput: UserItems) {
  userCreate(userInput: $userInput) {
    _id
    firstName 
    lastName
   }
}`

const userGetByIdQ = `query UserGetById($userId: ID!) {
  userGetById(userId: $userId) {
    lastName
    firstName
    _id
  }
}`
 const userGetAllQ = `query Query($amount: Int) {
  usersGetAll(amount: $amount) {              
    _id
    firstName 
    lastName
  }
}`
const userUpdateByIdM = `mutation UserUpdateById($userInput: UserFields) {
    userUpdateById(userInput: $userInput) {
        _id
        lastName
        firstName
    }
}`
   module.exports = { userCreateM: userCreateM, userGetByIdQ, userGetAllQ, userUpdateByIdM};