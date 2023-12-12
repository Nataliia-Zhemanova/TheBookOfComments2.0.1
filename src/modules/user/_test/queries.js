const userCreateM =  `mutation UserCreate($userInput: UserItems) {
  userCreate(userInput: $userInput) {
    _id
    firstName
    lastName
  }
}`

module.exports = { userCreateM }