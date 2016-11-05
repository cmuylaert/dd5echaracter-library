import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLInputObjectType
} from 'graphql';

import {ObjectID} from 'mongodb';


const Schema = (db) => {
function buildQueryParams(args){
  const params = {id:args.id};
  if (args.name){
      params.name= {$regex: args.name, $options: "$i"}
  }
  return params;
}

const Class = new GraphQLObjectType({
  name:"Class",
  fields:()=>({
    className: {type:GraphQLString},
    level: {type:GraphQLInt},
  })
})
const ClassInput = new GraphQLInputObjectType({
  name:"ClassInput",
  fields:()=>({
    className: {type:GraphQLString},
    level: {type:GraphQLInt},
  })
})
const Character = new GraphQLObjectType({
  name:"Character",
  fields: ()=>({
    id:{type:GraphQLString,
       resolve:(char)=>char._id},
    name: {type:GraphQLString},
    classes: {type: new GraphQLList(Class)}
  })
});

const Query = new GraphQLObjectType({
  name:"Query",
  fields:{
    characters:{
      type:new GraphQLList(Character),
      args: {
        name: {
          description: 'Text search on name field',
          type: GraphQLString
        },
      },
      resolve: (root, params) => {
        return  db.collection('characters').find(buildQueryParams(params)).toArray();
      }
    },
    character:{
      type:Character,
      args:{
        id: {
          type:GraphQLString,
          description: 'search by id field',
        }
      },
      resolve: (root, params) => {
        return  db.collection('characters').findOne({_id:ObjectID(params.id)});
      }
    }
  }
});
const Mutation = new GraphQLObjectType({
  name:"Mutation",
  fields: ()=> ({
    newCharacter:{
      type:Character,
      args: {
        name:{type:GraphQLString},
        classes: {type:new GraphQLList(ClassInput)}
      },
      resolve: async (root, params) => {
        const result = await db.collection('characters').insertOne(params);
        return result.ops[0];
      }
    }
  })
})

  return new GraphQLSchema({
    query: Query,
    mutation: Mutation
  })
}

export default Schema
