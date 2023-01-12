import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Sequelize } from 'sequelize';

// The GraphQL schema
const typeDefs = `#graphql
  type User {
    username: String!
    email: String!
  }
  type Query {
    getUsers: [User]!
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    getUsers: () => {
      const users = [
        {
          username: 'user1',
          email: 'john@email.com'
        },
        {
          username: 'user2',
          email: 'jane@email.com'
        },
      ];

      return users;
    },
      
  },
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
