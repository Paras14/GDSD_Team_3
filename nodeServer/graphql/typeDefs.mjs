
const typeDefs = `#graphql
  type User {
    username: String!
    email: String!
  }
  type Query {
    getUsers: [User]!
  }
`;

export default  typeDefs ;