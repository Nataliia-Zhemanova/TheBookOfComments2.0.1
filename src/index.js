const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

//const MONGODB = "mongodb+srv://student:studentAa123@cluster0.uia968n.mongodb.net/?retryWrites=true&w=majority"
const MONGODB = "mongodb://127.0.0.1:27017/TheBookOfComments_2_0_1";

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB)
  .then(() => {
    console.log("MongoDB Connection successful");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
