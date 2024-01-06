const userCreateMutation = `mutation UserCreate($userInput: UserItems) {
  userCreate(userInput: $userInput) {
    _id
    firstName
    lastName
  }
}`
const userGetByIdQ = `query UserGetById($userId: ID!) {
module.exports = {userCreateM}
userGetById(userId: $userId) {
    _id
      firstName
      lastName
    }
}`
const userUpdateByIdMWrong = `mutation UserUpdateById($userInput: UserFields) {
  userUpdateById(userInput: $userInput) {
const userGetAllQ =
    `query UsersGetAll {
        usersGetAll {
            _id
            firstName
            lastName
        }
    }`;
const userUpdateByIdMutation = `mutation UserUpdateById($userInput: UserFields) {
  userUpdateById(userInput: $userInput) {
    _id
    firstName
    lastName
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
module.exports ={nullAmount, errorMassage, userUpdateByIdMutation, userGetAllQ, userUpdateByIdMWrong, userGetByIdQ, userCreateMutation}
