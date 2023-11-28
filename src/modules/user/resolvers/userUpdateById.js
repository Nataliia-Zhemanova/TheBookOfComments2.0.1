const User = require("../User");
const userUpdateById = async (
  _,
  { userInput: { userId, firstName, lastName } },
) => {
  const id = userId;
  const filter = { _id: id };
  const update = {
    firstName,
    lastName,
  };

  const userWasUpdated = (await User.updateOne(filter, update)).modifiedCount;
  return userWasUpdated;
};
module.exports = userUpdateById;
