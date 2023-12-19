const {GraphQLError} = require('graphql/error');
const User = require('../User')
const message = require('../../../utils/messages')
const analytics = require('../../analytics/analytics')
const userGetByIdQuery = require('../queries/getById')

const userGetById = async (_, {userId: id}) => {
  //return await User.findById(id)
  const userId = id;
  const result = await userGetByIdQuery(userId)

  if (result.success) return result.payload;

  const analyticsId = analytics('USER_GET_BY_ID_ERROR', {
    error: result.payload,
    user: userId,
  });
  throw new GraphQLError('User get error', {
    extensions: message.fail(null, analyticsId),
  });
}

module.exports = userGetById;
