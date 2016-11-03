export default`
type Character {
  id: ID!
  name: String!
  classes: [Class]
}
type Class {
  className:String!
  level:Int!
}
type Query {
  characters(id:Int,name:String):[Character]
}

schema {
  query: Query
}
`;
