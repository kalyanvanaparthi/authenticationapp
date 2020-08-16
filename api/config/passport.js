var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../models/users');

passport.use(new LocalStrategy({usernameField: 'email'}, (username, password, done) => {
    User.findOne({ email: username}, (err, user) => {
        if(err) {return done(err); }

        if(!user) {
            return done(null, false, {message: 'User noe found'});
        }

        if(!user.validPassword(password)) {
            return done(null, false, { message: 'Password Invalid!!!'});
        }

        return done(null, user);
    });
}));