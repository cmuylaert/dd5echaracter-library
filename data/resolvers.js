const resolvers = (db) => ({
  Query: {
    characters(_,args) {
      return  db.collection('characters').find(buildQueryParams(args)).toArray();
    },
  },
  Character: {
    classes(character) {
      return character.classes;
    },
    id(character) {
      return character._id;
    }
  },
});

function buildQueryParams(args){
  const params = {id:args.id};
  if (args.name){
      params.name= {$regex: args.name, $options: "$i"}
  }
  return params;
}
export default resolvers;
