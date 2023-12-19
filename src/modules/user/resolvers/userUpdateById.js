const {GraphQLError} = require('graphql/error');
const {get} = require('lodash');
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

  if (userUpdateResult.success) {
    const updatedUser = get(userUpdateResult, 'payload._doc', {});
    return updatedUser;
  }

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

module.exports = userUpdateById
