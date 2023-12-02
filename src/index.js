const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');

//const MONGODB = "mongodb+srv://student:studentAa123@cluster0.uia968n.mongodb.net/?retryWrites=true&w=majority"
//const MONGODB = "mongodb+srv://yankovero:Niiko4ka@cluster0.0oducns.mongodb.net/?retryWrites=true&w=majority"
const MONGODB = "mongodb://localhost"

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers
})

mongoose.connect(MONGODB)
  .then(() => {
    console.log("MongoDB Connection successful");
    return server.listen({port: 5000})
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
