const Comment = require("../Comment");
const commentGetAll = async (_, { amount }) => {
  return await Comment.find().sort({ createdAt: -1 }).limit(amount);
};

module.exports = commentGetAll;
