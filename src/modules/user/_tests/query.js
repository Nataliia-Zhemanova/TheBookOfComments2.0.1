const userCreateM = `mutation Mutation($userInput: UserItems) {
  userCreate(userInput: $userInput) {
    _id
    firstName
    lastName
  }
}`

const getUserByIdQ = `query Query($userId: ID!) {
  userGetById(userId: $userId) {
    _id
    firstName
    lastName
  }
}`

const getUserByIdNeg = `query Query($userId: ID!) {
  userGetById(userId: $userId) {
    _id1
    firstName
    lastName
  }
}`

module.exports = {userCreateM, getUserByIdQ, getUserByIdNeg}