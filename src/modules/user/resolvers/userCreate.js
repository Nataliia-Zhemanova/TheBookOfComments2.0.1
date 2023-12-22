const User = require("../User");
const generateId = require("../../../utils/generateId");
const userCreate = async (_, { userInput: { firstName, lastName } }) => {
  const userId = generateId();
  const user = {
    _id: userId,
    firstName: firstName,
    lastName: lastName,
  };

  const createdUser = new User(user);
  const res = await createdUser.save();
  return {
    ...res._doc,
  };
};

module.exports = userCreate;
