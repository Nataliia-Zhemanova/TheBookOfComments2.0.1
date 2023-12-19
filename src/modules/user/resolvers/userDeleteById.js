const User = require("../User");
const userDeleteById = async (_, { userId: id }) => {
  const wasDeleted = (await User.deleteOne({ _id: id })).deletedCount;
  return wasDeleted;
};
module.exports = userDeleteById;
