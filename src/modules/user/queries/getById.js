const User = require('../User');
const message = require('../../../utils/messages');
const analytics = require('../../analytics/analytics');

const userGetByIdQuery = (userId) => {
  return User.findById(userId)
    // .populate({ path: 'roles', select: 'name _id' })
    // .lean()
    .exec()
    .then((user) => {
      if (user) {
        return message.success('User get by id OK', user);
      } else {
        return message.fail('No User for provided id');
      }
    })
    .catch((error) => {
      analytics(
        'USER_GET_BY_ID_QUERY_ERROR',
        {
          userID: userId,
        },
        error,
      );
      return message.fail('Get User by id ERROR', error);
    });
};

module.exports = userGetByIdQuery;
