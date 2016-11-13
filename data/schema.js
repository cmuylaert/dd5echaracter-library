import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType
} from 'graphql';

import {ObjectID} from 'mongodb';


const Schema = (db) => {
function buildQueryParams(args,userId){
  const params = {};
  if (args.name){
    params.name= {$regex: args.name, $options: "$i"}
  }
  const userParams={
    $and:[
      {$or:[
        {public : true},
        {userid : userId.toString()}
      ]},
      params
    ]};

  console.log(JSON.stringify(userParams));
  return userParams;
}

const Class = new GraphQLObjectType({
  name:"Class",
  fields:()=>({
    className: {type:GraphQLString},
    level: {type:GraphQLInt},
  })
});
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
    background: {type:GraphQLString},
    race: {type:GraphQLString},
    alignment: {type:GraphQLString},
    classes: {type: new GraphQLList(Class)}
  })
});
const CharacterInput = new GraphQLInputObjectType({
  name:"CharacterInput",
  fields: ()=>({
    id:{type:GraphQLString,
       resolve:(char)=>char._id},
    name: {type:GraphQLString},
    background: {type:GraphQLString},
    race: {type:GraphQLString},
    alignment: {type:GraphQLString},
    classes: {type: new GraphQLList(ClassInput)}
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
      resolve: (root, params,context) => {
        return  db.collection('characters').find(buildQueryParams(params,context.userId)).toArray();
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
    },
    updateCharacter:{
      type:Character,
      args: {
        character:{type:CharacterInput}
      },
      resolve: async (root, params) => {
        const id = ObjectID(params.character.id);
        delete params.character.id;
        const result = await db.collection('characters').findOneAndUpdate({_id:id},
         {$set:params.character},{returnOriginal:false});

        return result.value;
      }
    },
    deleteCharacter:{
      type:GraphQLString,
      args: {
        id: {
          type:GraphQLString,
          description: 'delete by id',
        }
      },
      resolve: async (root, params) => {
        const result = await db.collection('characters').deleteOne({_id:ObjectID(params.id)});
        return result.deletedCount>0?params.id:"Character ID not found";
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
