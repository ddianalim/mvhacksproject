const express = require('express');
const router = express.Router();
const User = require('../models/user');

// set layout variables
router.use(function(req, res, next) {
  res.locals.title = "Woke";
  res.locals.currentUserId = req.session.userId;
  res.locals.username = req.session.username;

  next();
});

// home page
router.get('/', (req, res, next) => {
  res.render('index');
});

// login
router.get('/login', (req, res, next) => {
  res.render('login');
});

// POST login
router.post('/login', (req, res, next) => {
  User.authenticate(req.body.username, req.body.password, (err, user) => {
    if (err || !user) {
      const next_error = new Error("Username or password incorrect");
      next_error.status = 401;

      return next(next_error);
    } else {
      req.session.userId = user._id;
      req.session.username = user.username;

      return res.redirect('/');
    }
  });
});

// logout
router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) return next(err);
    });
  }

  return res.redirect('/');
});

/* GET tweets. */
router.get('/tweets', function(req, res, next) {

  var Twitter = require('twitter');

  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  var candidates = ["JohnDelaney", "AndrewYang", "ewarren", "JulianCastro", "TulsiGabbard", "SenGillibrand", "KamalaHarris", "PeteButtigieg", "CoryBooker", "amyklobuchar", "BernieSanders", "GovInslee", "Hickenlooper", "BetoORourke", "realDonaldTrump", "WayneMessam", "marwilliamson"];
  var r = Math.floor((Math.random() * 20) - 1);
  var name = candidates[r];
  console.log(name);

  var params = {
    screen_name: name,
    count: 100,
    tweet_mode: 'extended',
    in_reply_to_status_id: null,
    retweeted: false
  };

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    var random = Math.floor((Math.random() * 100) - 1);
    var t = tweets[random]["full_text"];
    for(i = 0; i < t.length; i++) {
      if(t.substring(i,i+5)==("&amp;")) {
        t= t.substring(0,i) + "&" + t.substring(i+5);
      }
    }

    res.render('tweet', { title: 'Woke', tweet: t});
  });

});

module.exports = router;


module.exports = router;
