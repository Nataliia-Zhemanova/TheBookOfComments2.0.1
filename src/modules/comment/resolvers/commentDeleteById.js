const Comment = require("../Comment");
const commentDeleteById = async (_, { commentId: id }) => {
  const wasDeleted = (await Comment.deleteOne({ _id: id })).deletedCount;
  return wasDeleted;
};

module.exports = commentDeleteById;
