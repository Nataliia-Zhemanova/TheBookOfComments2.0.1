const userCreateQuery = `mutation UserCreate($userInput: UserItems) {
  userCreate(userInput: $userInput) {
    lastName
    firstName
    _id
  }
}`
const userGetIdQuery = `query UserGetById($userId: ID!) {
  userGetById(userId: $userId) {
    _id
    firstName
    lastName
  }
}`


module.exports = { userCreateQuery, userGetIdQuery}