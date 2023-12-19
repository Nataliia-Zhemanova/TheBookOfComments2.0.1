const {GraphQLError} = require('graphql/error');
const User = require('../User')
const message = require('../../../utils/messages')
const analytics = require('../../analytics/analytics')
const userUpdateByIdQuery = require('../queries/updateById')
const userUpdateById = async (_,
                              {
                                userInput: {
                                  userId,
                                  firstName,
                                  lastName,
                                }
                              }
) => {
  const id = userId;
  const newFirstName = firstName;
  const newLastName = lastName;

  const newValues = {
    newFirstName,
    newLastName
  }

  const userUpdateResult = await userUpdateByIdQuery(
    {
      userId: id,
      values: newValues
    }
  )

  const analyticsId = analytics('USER_UPDATE_BY_ID_ERROR', {
    error: userUpdateResult.payload,
    input: args.input,
    entity: 'User',
    entityId: userId,
    user: userId,
    controller: 'userUpdateById',
  });

  throw new GraphQLError('User update error', {
    extensions: message.fail(null, analyticsId),
  });

}
// {
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
module.exports = userUpdateById
