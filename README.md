FacebookEndpoint
=======================================

 ## Install

    $ git clone https://github.com/dzakaeryan20/FacebookEndpoint.git
    $ cd FacebookEndpoint
    $ npm install
    $ npm start
    $ npm test

 ## Setting
    $ streaming facebook feed of a user : inazrabuu@hotmail.com
    $ visit https://developers.facebook.com/ setting By App streamFeed 
    $ visit https://developers.facebook.com/tools/explorer/ Press Get Token
    $ click Get User Access
    $ Checklist user_post & email
    $ click Get Access Token 
    $ copy access token 
    $ paste token in config/setting.js token

## Usage

#### app.js

    // add passport
    passport = require('passport');
    FacebookStrategy = require('passport-facebook').Strategy;
    // add session
    var session = require('express-session');

    // add session and passport setting
    app.use(session({
        secret: 'nodejs-passport-facebook-example',
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    // passport setting
    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
      done(null, obj);
    });

    // Use the FacebookStrategy within Passport.
    passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
          return done(null, profile);
        });
      }
    ));
