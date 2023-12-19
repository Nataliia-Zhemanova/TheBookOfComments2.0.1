const { mergeResolvers } = require("@graphql-tools/merge");
const userResolvers = require("../modules/user/resolvers");
const commentResolvers = require("../modules/comment/resolvers");

const resolvers = mergeResolvers([userResolvers, commentResolvers]);

module.exports = resolvers;
