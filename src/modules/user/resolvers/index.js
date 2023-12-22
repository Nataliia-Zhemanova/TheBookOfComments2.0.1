const Comment = require("../../comment/Comment");
const userCreate = require("./userCreate");
const userDeleteById = require("./userDeleteById");
const usersGetAll = require("./usersGetAll");
const userGetById = require("./userGetById");
const userUpdateById = require("./userUpdateById");

const userResolvers = {
  User: {
    comments: async ({ comments }) => Comment.find({ _id: { $in: comments } }),
  },
  Query: {
    usersGetAll,
    userGetById,
  },

  Mutation: {
    userCreate,
    userUpdateById,
    userDeleteById,
  },
};

module.exports = userResolvers;

