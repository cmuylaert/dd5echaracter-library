import { ObjectID } from 'mongodb';

export default (db) => {
  function emptyCharacter() {
    return {
      name: null,
      background: null,
      alignment: null,
      race: null,
      classes: [],
      attributes: {
        STR: null,
        DEX: null,
        CON: null,
        INT: null,
        WIS: null,
        CHA: null,
      },
      public: false,
    };
  }

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
        {
          $or: [
            { public: true },
            { userid: userId.toString() },
          ],
        },
        args,
      ],
    };
  }

  return {
    findCharacters: (params, userId) => db.collection('characters').find(addUserParams(buildQueryParams(params), userId)).toArray(),
    findCharacterByID: (id, userId) => db.collection('characters').findOne(addUserParams({ _id: ObjectID(id) }, userId)),
    updateCharacter: async (params, userId) => {
      const id = ObjectID(params.character.id);
      // eslint-disable-next-line no-param-reassign
      delete params.character.id;
      const result = await db.collection('characters').findOneAndUpdate(
        {
          _id: id,
          userid: userId.toString(),
        },
        { $set: params.character }, { returnOriginal: false });
      return result.value;
    },
    newCharacter: async (params, userId) => {
      const newCharacter = Object.assign({}, emptyCharacter(),
        params, { userid: userId.toString() });
      const result = await db.collection('characters').insertOne(newCharacter);
      return result.ops[0];
    },
    deleteCharacter: async (id, userId) => {
      const result = await db.collection('characters').deleteOne({
        _id: ObjectID(id),
        userid: userId.toString(),
      });
      return result.deletedCount > 0 ? id : 'Character ID not found';
    },
  };
};
