const Comment = require("../Comment");
const generateId = require("../../../utils/generateId");
const commentCreate = async (
  _,
  {
    commentInput: {
      user: { userId, firstName, lastName },
      rating,
      title,
      description,
    },
  },
) => {
  const commentId = generateId();
  const newUserId = generateId();

  const newUser = {
    _id: newUserId,
    firstName: firstName,
    lastName: lastName,
  };

  const comment = {
    _id: commentId,
    user: userId || newUserId,
    createdAt: new Date().toISOString(),
    rating: rating,
    title: title,
    description: description,
  };

  let createdUser = null;
  //if we don't have a user for this comment, we'll create it here:
  if (!userId) {
    createdUser = new User({
      ...newUser,
      comments: {
        _id: comment._id,
        createdAt: comment.createdAt,
        rating: comment.rating,
        title: comment.title,
        description: comment.description,
      },
    });
    const resUser = await createdUser.save();
  } else {
    //if the user exists, we'l add a commentId
    const update = { $addToSet: { comments: commentId } };
    const resUser = await User.updateOne({ _id: userId }, update);
  }

  //creating a comment
  let createdComment = null;
  createdComment = new Comment(comment);
  const resComm = await createdComment.save();
  return {
    ...resComm._doc,
  };
};
module.exports = commentCreate;
