var express = require('express');
var passport = require('passport');
var router = express.Router();
var Account = require('../models/account');

router.get('/', function (req, res) {
  res.render('index', { title: 'Costume App', user: req.user });
});

router.get('/register', function (req, res) {
  res.render('register', { title: 'Register' });
});

router.post('/register', function (req, res) {
  Account.register(
    new Account({ username: req.body.username }),
    req.body.password,
    function (err, user) {
      if (err) {
        return res.render('register', {
          title: 'Register',
          message: 'Error: ' + err.message
        });
      }
      passport.authenticate('local')(req, res, function () {
        res.redirect('/');
      });
    }
  );
});

router.get('/login', function (req, res) {
  res.render('login', { title: 'Login', user: req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
  }); 

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;
