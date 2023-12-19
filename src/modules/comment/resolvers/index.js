const Comment = require("../Comment");
const commentCreate = require("./commentCreate");
const commentDeleteById = require("./commentDeleteById");
const commentGetAll = require("./commentGetAll");
const commentGetById = require("./commentGetById");
const commentUpdateById = require("./commentUpdateById");
const User = require("../../user/User");

const commentResolvers = {
  Comment: {
    user: async ({ user }) => User.findById(user),
  },

  Query: {
    commentGetAll,
    commentGetById,
  },
  Mutation: {
    commentCreate,
    commentUpdateById,
    commentDeleteById,
  },
};

module.exports = commentResolvers;
