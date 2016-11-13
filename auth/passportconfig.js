import { Strategy } from 'passport-local';

export default function (passport, users) {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    users.findById(id).then((user) => { done(null, user); }, (error) => { done(error, null); });
  });

  passport.use('local-signup', new Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
    (req, username, password, done) => {
      users.findUser(username).then(
          (user) => {
            if (user) {
              done(null, false, req.flash('signupMessage', 'That username is already taken.'));
            } else {
              users.registerUser(username, password).then(
                newUser => done(null, newUser),
                (error) => { throw error; },
              );
            }
          },
          error => done(error));
    },
      ),
    );


  passport.use('local-login', new Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
  (req, username, password, done) => {
    users.findUser(username).then(
      (user) => {
        if (!user) {
          return done(401, false, req.flash('loginMessage', 'Invalid username or password.'));
        } else if (!users.validPassword(password, user)) {
          return done(401, false, req.flash('loginMessage', 'Invalid username or password.'));
        }
        return done(null, user);
      },
      (error) => {
        console.log(error);
        return done(error);
      });
  }));
}
