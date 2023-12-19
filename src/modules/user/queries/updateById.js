const User = require('../User')
const message = require('../../../utils/messages')
const analytics = require('../../analytics/analytics')
const userUpdateByIdQuery = ({userId, values}) =>
  User.findOneAndUpdate(
    {_id: userId},
    values,
  )
    .exec()
    .then((doc) => {
      return message.success('User updated', doc)
    })
    .catch((error) => {
      analytics(
        'USER_UPDATE_BY_ID_QUERY_ERROR',
        {
          userID: userId,
          value: values,
        },
        error,
      );
      return message.fail('User update error', error);
    });

module.exports = userUpdateByIdQuery;

// const userUpdateById = async (_,
//                               {
//                                 userInput: {
//                                   userId,
//                                   firstName,
//                                   lastName,
//                                 }
//                               }
// ) => {
//   const id = userId
//   const filter = {_id: id}
//   const update = {
//     firstName: firstName,
//     lastName: lastName,
//   }
//
//   const userWasUpdated = (await User.updateOne(
//     filter,
//     update)).modifiedCount;
//   return userWasUpdated;
// }

