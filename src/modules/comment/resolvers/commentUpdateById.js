const Comment = require("../Comment");
const commentUpdateById = async (
  _,
  { commentInput: { commentId, rating, title, description } },
) => {
  const wasUpdated = (
    await Comment.updateOne({ _id: commentId }, { rating, title, description })
  ).modifiedCount;
  return wasUpdated;
};

module.exports = commentUpdateById;
