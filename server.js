import express from 'express';
import Schema from './data/schema';
import {MongoClient} from 'mongodb';
import passport from 'passport';
import flash from 'connect-flash';
import session from 'express-session';
import morgan from 'morgan';

import { apolloExpress, graphiqlExpress } from 'apollo-server';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Users from './auth/users';
import passportConfig from './auth/passportconfig';

const GRAPHQL_PORT = 8080;
const MONGODB_URL = process.env.MONGODB_URL;//ds143717.mlab.com:43717/5echaracters
const DB_USER = process.env.DB_USER;//graphql
const DB_PASSWORD = process.env.DB_PASSWORD;//password

const app = express();

(async ()=>{
try{
  const db = await MongoClient.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${MONGODB_URL}`);
  const schema = Schema(db);
  const users = Users(db);
  passportConfig(passport,users);

  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(session({ secret: 'Unicornsarereal' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.use(morgan('dev')); // log every request to the console


  // process the signup form
   app.post('/signup', passport.authenticate('local-signup', {
       failureFlash : true
   }));
   app.post('/login', passport.authenticate('local-login', {
        failureFlash : true,
        failWithError: true
     }), function(req, res, next) {
      // handle success
      console.log(req.user);
      if (req.xhr) { return res.json({ id: req.user._id }); }
      return res.redirect('/');
    },
    function(err, req, res, next) {
      res.send(401, "login failed");
      }
  );
   app.get('/isloggedin', function(req,res){
     res.json({authenticated:req.isAuthenticated()});
   });
   app.get('/logout', function(req, res) {
           req.logout();
           res.redirect('/');
   });

  app.use('/graphql', bodyParser.json(), apolloExpress({
    context:{},
    schema: schema,
  }));

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));

  app.listen(GRAPHQL_PORT, () => console.log(
    `GraphQL app is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  ));

  app.use(express.static(__dirname + '/dist'))

  app.listen(3000, ()=> console.log("listening on port 3000"));
} catch(error){
  console.log(error);
}
})();
