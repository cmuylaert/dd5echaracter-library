import express from 'express';
import Schema from './data/schema';
import Resolvers from './data/resolvers';
import {MongoClient} from 'mongodb';

import { apolloExpress, graphiqlExpress } from 'apollo-server';
import bodyParser from 'body-parser';

const GRAPHQL_PORT = 8080;

const server = express();

(async ()=>{
try{
  let db = await MongoClient.connect('mongodb://graphql:password@ds143717.mlab.com:43717/5echaracters');
  const schema = Schema(db);

  server.use('/graphql', bodyParser.json(), apolloExpress({
    context:{},
    schema: schema,
  }));

  server.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));

  server.listen(GRAPHQL_PORT, () => console.log(
    `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
  ));

  server.use(express.static(__dirname + '/dist'))

  server.listen(3000, ()=> console.log("listening on port 3000"));
} catch(error){
  console.log(error);
}
})();
