const userCreateM = `mutation UserCreate($userInput: UserItems) {
  userCreate(userInput: $userInput) {
    _id
    firstName
    lastName
  }
}`
GQL01-userCreate-APItest-Jalalov
GQL01-userCreate-APItest-Jalalov
module.exports = {userCreateM}

 GQL02-userGetById-APItest-Murzabayev


main
main
const userGetByIdQ = `query UserGetById($userId: ID!) {
  userGetById(userId: $userId) {
    _id
    firstName
    lastName
  }
}`
 GQL02-userGetById-APItest-Murzabayev
const userDeleteByIdM = `mutation UserDeleteById($userId: ID!) {
  userDeleteById(userId: $userId)
}`


const userGetByIdQInvalid = `query UserGetById($userId: ID!) {
  userGetById(userId: $userId) {
    _id123
    firstName
    lastName
  }
}`

const userGetAllQ =
    `query UsersGetAll {
        usersGetAll {
            _id
            firstName
            lastName
        }
    }`;

const userDeleteByIdM =
    `mutation UserDeleteById($userId: ID!) {
  userDeleteById(userId: $userId)
}`;


main
const userGetAllQ = `query UsersGetAll($amount: Int) {
  usersGetAll(amount: $amount) {
    _id
    firstName
    lastName
  }
}`
 GQL02-userGetById-APItest-Murzabayev


 main
const userUpdateByIdM = `mutation UserUpdateById($userInput: UserFields) {
  userUpdateById(userInput: $userInput) {
    _id
    firstName
    lastName
  }
}`

 GQL02-userGetById-APItest-Murzabayev
    module.exports = { userCreateM, userGetByIdQ, userDeleteByIdM, userGetAllQ, userUpdateByIdM}

const userDeleteByIdM = `mutation UserDeleteById($userId: ID!) {
  userDeleteById(userId: $userId)
}`

const userCreateQuery = `mutation UserCreate($userInput: UserItems) {
            userCreate(userInput: $userInput) {
                 _id
                firstName
                lastName
  }
}`

const userGetById = `query UserGetById($userId: ID!) {
                userGetById(userId: $userId) {
                    _id
                    firstName
                    lastName
                }
            }`

const userDeleteByIdM = `
                mutation UserDeleteById($userId: ID!) {
                userDeleteById(userId: $userId)
                }`

const getAllUsers = `
                query UsersGetAll($amount: Int) {
                  usersGetAll(amount: $amount) {
                        _id
                        firstName
                        lastName
                  }
                }`

const userUpdateById = `mutation UserUpdateById($userInput: UserFields) {
                        userUpdateById(userInput: $userInput) {
                        firstName
                        lastName
                        _id                    
                    }
                }`
const errorMassage = [
    "Cannot read properties of null (reading 'firstName')",//0 - create user with null parameters data
    "Cannot read properties of undefined (reading 'errors')",//
    "Cannot return null for non-nullable field Query.userGetById.",
    `Cast to ObjectId failed for value "" (type string) at path "_id" for model "User"`,//3 - getUserByStringId
    `Cannot return null for non-nullable field User._id.`,//4 - getUserByWrongId
    'Variable "$amount" got invalid value " "; Int cannot represent non-integer value: " "'//5 GetAllUsers - empty string input
    ]

const nullAmount = null

module.exports = {userCreateM, userGetByIdQ, userGetAllQ, userDeleteByIdM, userCreateQuery, userGetById, getAllUsers, userUpdateById, errorMassage, nullAmount, userGetByIdQInvalid }
main

main
