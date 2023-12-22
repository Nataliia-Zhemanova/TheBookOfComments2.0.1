const Comment = require("../Comment");
const commentGetById = async (_, { commentId: id }) => {
  return await Comment.findById(id);
};

module.exports = commentGetById;
