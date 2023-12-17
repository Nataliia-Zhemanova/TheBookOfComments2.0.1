const userCreateM = `mutation UserCreate($userInput: UserItems) {
  userCreate(userInput: $userInput) {
    _id
    firstName
    lastName
  }
}`

const userCreateNegM = `mutation UserCreate($userInput: UserItems) {
  userCreate(userInput: $userInput) {
    _id1
    firstName
    lastName
  }
}`

module.exports = { userCreateM, userCreateNegM }

