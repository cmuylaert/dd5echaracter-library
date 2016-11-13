import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType,
} from 'graphql';


const Schema = (db) => {
  const Class = new GraphQLObjectType({
    name: 'Class',
    fields: () => ({
      className: { type: GraphQLString },
      level: { type: GraphQLInt },
    }),
  });
  const ClassInput = new GraphQLInputObjectType({
    name: 'ClassInput',
    fields: () => ({
      className: { type: GraphQLString },
      level: { type: GraphQLInt },
    }),
  });
  const Attributes = new GraphQLObjectType({
    name: 'Attributes',
    fields: () => ({
      STR: { type: GraphQLInt },
      DEX: { type: GraphQLInt },
      CON: { type: GraphQLInt },
      INT: { type: GraphQLInt },
      WIS: { type: GraphQLInt },
      CHA: { type: GraphQLInt },
    }),
  });
  const AttributesInput = new GraphQLInputObjectType({
    name: 'AttributesInput',
    fields: () => ({
      STR: { type: GraphQLInt },
      DEX: { type: GraphQLInt },
      CON: { type: GraphQLInt },
      INT: { type: GraphQLInt },
      WIS: { type: GraphQLInt },
      CHA: { type: GraphQLInt },
    }),
  });
  const Character = new GraphQLObjectType({
    name: 'Character',
    fields: () => ({
      id: { type: GraphQLString,
        resolve: char => char._id },
      name: { type: GraphQLString },
      background: { type: GraphQLString },
      race: { type: GraphQLString },
      alignment: { type: GraphQLString },
      classes: { type: new GraphQLList(Class) },
      attributes: { type: Attributes },
      xp: { type: GraphQLInt },
    }),
  });
  const CharacterInput = new GraphQLInputObjectType({
    name: 'CharacterInput',
    fields: () => ({
      id: { type: GraphQLString,
        resolve: char => char._id },
      name: { type: GraphQLString },
      background: { type: GraphQLString },
      race: { type: GraphQLString },
      alignment: { type: GraphQLString },
      classes: { type: new GraphQLList(ClassInput) },
      attributes: { type: AttributesInput },
      xp: { type: GraphQLInt },
    }),
  });

  const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
      characters: {
        type: new GraphQLList(Character),
        args: {
          name: {
            description: 'Text search on name field',
            type: GraphQLString,
          },
        },
        resolve: (root, params, context) => db.findCharacters(params, context.userId),
      },
      character: {
        type: Character,
        args: {
          id: {
            type: GraphQLString,
            description: 'search by id field',
          },
        },
        resolve: (root, params, context) => db.findCharacterByID(params.id, context.userId),
      },
    },
  });
  const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      newCharacter: {
        type: Character,
        args: {
          name: { type: GraphQLString },
          classes: { type: new GraphQLList(ClassInput) },
        },
        resolve: async (root, params, context) => db.newCharacter(params,context.userId),
      },
      updateCharacter: {
        type: Character,
        args: {
          character: { type: CharacterInput },
        },
        resolve: async (root, params, context) => db.updateCharacter(params, context.userId),
      },
      deleteCharacter: {
        type: GraphQLString,
        args: {
          id: {
            type: GraphQLString,
            description: 'delete by id',
          },
        },
        resolve: async (root, params, context) => db.deleteCharacter(params.id,
          context.userId),
      },
    }),
  });

  return new GraphQLSchema({
    query: Query,
    mutation: Mutation,
  });
};

export default Schema;
