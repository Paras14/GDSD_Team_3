'use strict';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Sequelize } from 'sequelize';
const { User } = require('./models');

// The GraphQL schema
const typeDefs = `#graphql
  type User {
    username: String!
    email: String!
  }
  type Query {
    getUsers: [User]!
  }
  type Mutation {
    registerUser(
      username: String!, 
      email: String!, 
      password: String!, 
      confirmPassword: String!
    ): User!
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.findAll();
      } catch (error) {
        console.log(error);
      }

      return users;
    },
      
  },
  Mutation: {
    registerUser: async (_, args) => {
      const { username, email, password, confirmPassword } = args;
      try {

        // Validate user data
        

        // Check if username / email exists

        // Create user

        const user = await User.create({
          username,
          email, 
          password,
        });

        // Return user

        return user;
        
      }
      catch (error) {
        console.log(error);
        throw new Error(error);
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);

const sequelize = new Sequelize('restaurantsbd', 'admin', 'gdsdteam3', {
  host: 'db-instance-team3.czsntcnwbbwf.us-east-1.rds.amazonaws.com',
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
