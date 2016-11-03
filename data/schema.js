export default`
type Character {
  id: Int!
  name: String!
  classes: [Class]
}
type Class {
  className:String!
  level:Int!
}
type Query {
  allCharacters: [Character]
  character(id:Int,name:String,class:String):Character
}

schema {
  query: Query
}
`;
