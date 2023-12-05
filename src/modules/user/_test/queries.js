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
                    lastName
                    firstName
                }
            }`

module.exports = { userCreateM, userGetByIdQ }