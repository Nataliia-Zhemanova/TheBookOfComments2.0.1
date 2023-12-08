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

module.exports = {userCreateM, getUserByIdQ}