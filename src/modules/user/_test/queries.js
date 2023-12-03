const userCreateMutation = `mutation UserCreate($userInput: UserItems) {
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

const userGetAllQ = `query UsersGetAll($amount: Int) {
  usersGetAll(amount: $amount) {
    _id
    firstName
    lastName
  }
}`


    module.exports ={userCreateMutation, userGetByIdQ, userGetAllQ}

