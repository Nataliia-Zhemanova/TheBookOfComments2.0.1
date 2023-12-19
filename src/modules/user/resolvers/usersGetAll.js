const User = require("../User");
const usersGetAll = async (_, { amount }) => {
  return await User.find().sort({ createdAt: -1 }).limit(amount);
};

module.exports = usersGetAll;
