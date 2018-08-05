
const express = require('express');
const router = express.Router();

const passport = require('passport');
const TwitterStrategy = require('passport-twitter');

const {consumerKey, consumerSecret} = require('../config');

const {User} = require('../models/userModel');

passport.use(new TwitterStrategy({
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    callbackURL: "http://localhost:8080/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    User.findOneAndUpdate({twitterId: profile.id},
      {
      twitterId: profile.id,
      name: profile.name,
      screen_name: profile.screen_name,
      location: profile.location,
      profile_image_url: profile.profile_image_url
    },
    {upsert: true, new: true},function (err, user) {
      console.log('ERROR', err)
      console.log('user', user)
      return cb(err, user);
    });
  }
));

passport.serializeUser(function(user, cb) {
  console.log('serialize', user);
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  console.log('deserialize', obj);
  cb(null, obj);
});


router.get('/twitter',
  passport.authenticate('twitter'));

router.get('/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

  module.exports = router;
