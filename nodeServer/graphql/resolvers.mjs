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

export default resolvers;