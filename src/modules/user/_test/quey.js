const userCreateQuery = `mutation UserCreate($userInput: UserItems) {
  userCreate(userInput: $userInput) {
    _id
    firstName
    lastName
  }
}`

const userDeleteQ = `mutation Mutation($userId: ID!) {
  userDeleteById(userId: $userId)
}`

module.exports = {userCreateQuery, userDeleteQ}