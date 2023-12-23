const Comment = require("../Comment");
const commentUpdateById = async (
  _,
  { commentInput: { commentId, rating, title, description } },
) => {
  const wasUpdated = (
    await Comment.updateOne(
      { _id: commentId },
      { rating: rating, title: title, description: description },
    )
  ).modifiedCount;
  return wasUpdated;
};

module.exports = commentUpdateById;
