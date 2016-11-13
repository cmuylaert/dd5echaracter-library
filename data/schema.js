import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType,
} from 'graphql';

import { ObjectID } from 'mongodb';


const Schema = (db) => {
  function buildQueryParams(args) {
    const params = {};
    if (args.name) {
      params.name = { $regex: args.name, $options: '$i' };
    }
    return params;
  }
  function addUserParams(args, userId) {
    return {
      $and: [
        { $or: [
        { public: true },
        { userid: userId.toString() },
        ] },
        args,
      ] };
  }

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
        resolve: (root, params, context) => db.collection('characters').find(addUserParams(buildQueryParams(params), context.userId)).toArray(),
      },
      character: {
        type: Character,
        args: {
          id: {
            type: GraphQLString,
            description: 'search by id field',
          },
        },
        resolve: (root, params, context) => db.collection('characters').findOne(addUserParams({ _id: ObjectID(params.id) }, context.userId)),
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
        resolve: async (root, params, context) => {
          const result = await db.collection('characters').insertOne(Object.assign(params, { userid: context.userId.toString() }));
          return result.ops[0];
        },
      },
      updateCharacter: {
        type: Character,
        args: {
          character: { type: CharacterInput },
        },
        resolve: async (root, params, context) => {
          const id = ObjectID(params.character.id);
          // eslint-disable-next-line no-param-reassign
          delete params.character.id;
          const result = await db.collection('characters').findOneAndUpdate({ _id: id, userid: context.userId.toString() },
         { $set: params.character }, { returnOriginal: false });

          return result.value;
        },
      },
      deleteCharacter: {
        type: GraphQLString,
        args: {
          id: {
            type: GraphQLString,
            description: 'delete by id',
          },
        },
        resolve: async (root, params, context) => {
          const result = await db.collection('characters').deleteOne({ _id: ObjectID(params.id), userid: context.userId.toString() });
          return result.deletedCount > 0 ? params.id : 'Character ID not found';
        },
      },
    }),
  });

  return new GraphQLSchema({
    query: Query,
    mutation: Mutation,
  });
};

export default Schema;
