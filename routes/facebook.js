//Facebook authentication router
var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/auth/facebook',
  passport.authenticate('facebook'));

router.get('/auth/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });