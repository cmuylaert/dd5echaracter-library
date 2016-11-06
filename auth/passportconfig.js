import {Strategy} from 'passport-local';

export default function(passport,users) {

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        users.findById(id).then((user)=>{done(null, user)},(error)=>{done(error,null)});
    });

    passport.use('local-signup', new Strategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, username, password, done) {
        users.findUser(username).then(
          (user) => {
            if(user){
              return done(null, false, req.flash('signupMessage', 'That username is already taken.'))
            } else{
              users.registerUser(username,password).then(
                (newUser)=>{
                  return done(null,newUser);
                },
                (error)=>{throw error;}
              );
            }
          },
          (error) => {return done(error);
          });
        }
      )
    );


  passport.use('local-login', new Strategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
  },
  function(req, username, password, done) {
    users.findUser(username).then(
      (user) => {
        if(!user) {
          return done(401, false, req.flash('loginMessage', 'Invalid username or password.'))
        } else if (!users.validPassword(password,user)) {
              return done(401, false, req.flash('loginMessage', 'Invalid username or password.'));
        } else {
          return done(null, user);
        }
      },
      (error) => {
        console.log(error);
        return done(error);
      });
  }));

};
