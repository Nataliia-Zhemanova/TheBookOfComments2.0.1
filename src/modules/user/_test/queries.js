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

const userUpdateByIdMutation = `mutation UserUpdateById($userInput: UserFields) {
    userUpdateById(userInput: $userInput) {
        _id
        firstName
        lastName
    }
}`

const userDeleteMutationById = `mutation UserDeleteById($userId: ID!) {
    userDeleteById(userId: $userId)
}`



    module.exports ={userCreateMutation, userGetByIdQ, userGetAllQ, userUpdateByIdMutation, userDeleteMutationById}

