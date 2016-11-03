const resolvers = (db) => {
  Query: {
    allCharacters() {
      return [{ id: 1, name: 'allCharacters' }];
    },
    character() {
      return { id: 1, name: 'character' };
    },
  },
  Character: {
    classes() {
      return [
        { className: 'fighter', level: 2 },
        { className: 'wizard', level: 2 },
      ];
    },
  },
};

export default resolvers;
