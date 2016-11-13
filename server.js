require('babel-register')({
    presets: [ 'es2015','stage-0' ]
});

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

const MONGODB_URL = process.env.MONGODB_URL;//ds143717.mlab.com:43717/5echaracters
const DB_USER = process.env.DB_USER;//graphql
const DB_PASSWORD = process.env.DB_PASSWORD;//password

const app = express();

function isAuthenticated(req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    }
    res.send(401);
}

(async ()=>{
try{
  const db = await MongoClient.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${MONGODB_URL}`);
  const schema = Schema(db);
  const users = Users(db);
  passportConfig(passport,users);



    app.use(express.static(__dirname + '/dist'))
    app.use(cookieParser('Unicornsarereal'));
  app.use(bodyParser.json());
  app.use(session({
      secret: 'Unicornsarereal',
      path:"/*",
      resave: true,
      saveUninitialized: true,
      cookie : { secure : false, maxAge : (4 * 60 * 60 * 1000) },
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.use(morgan('dev')); // log every request to the console


  // process the signup form
   app.post('/signup', passport.authenticate('local-signup', {
       failureFlash : true,
           session:true,
   }), function(req, res, next) {
           // handle success
           if (req.xhr) { return res.json({ id: req.user._id }); }
           return res.redirect('/');
       },
       function(err, req, res, next) {
           res.send(401, "signup failed");
       });
   app.post('/login', passport.authenticate('local-login', {
        failureFlash : true,
        failWithError: true,
        session:true,
     }), function(req, res, next) {
      // handle success
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
       req.session.destroy();
       res.redirect('/');
   });

    app.use('/graphql', bodyParser.json(),isAuthenticated, apolloExpress((req)=> {
        return {
            context:{userId:req.user._id},
            schema: schema,
        }
    } ));
    // app.use('/graphql', bodyParser.json(), graphqlExpress((request) =>{
    //     console.log(request.session.passport.user);
    //     return {
    //         context:request.user,
    //         schema: schema,
    //     }}));
    app.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql',
    }));

  app.listen(3000, ()=> console.log("listening on port 3000"));
} catch(error){
  console.log(error);
}
})();
