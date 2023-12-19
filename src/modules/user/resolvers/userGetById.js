const User = require("../User");

const userGetById = async (_, { userId: id }) => {
  return await User.findById(id);
};

module.exports = userGetById;
