var express = require('express');
const router = express.Router();

const auth = require('./helpers/auth');
const Quiz = require('../models/quiz');
const User = require('../models/user');

// quiz new
router.get('/', auth.requireLogin, (req, res, next) =>{
  User.findById(req.params.userId, function(err, quiz) {
    if(err) { console.error(err);}
  });

  var Twitter = require('twitter');

  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  var candidates = [
    "JohnDelaney", "AndrewYang", "ewarren", "JulianCastro", "TulsiGabbard",
    "SenGillibrand", "KamalaHarris", "PeteButtigieg", "CoryBooker", "amyklobuchar",
    "BernieSanders", "GovInslee", "Hickenlooper", "BetoORourke", "realDonaldTrump",
    "WayneMessam", "marwilliamson", "Joebiden", "RepSwalwell", "GovBillWeld", "OfficialMcAfee" ];
  var r = Math.floor((Math.random() * 20) + 1);
  var name = candidates[r];

  var params = {
    screen_name: name,
    count: 100,
    tweet_mode: 'extended',
    // in_reply_to_status_id: null,
    // retweeted: false
  };

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    var random = Math.floor((Math.random() * 100));
    var text = tweets[random]['full_text'];
    var name = tweets[random].user['screen_name'];
    console.log('name: ' +name);

    for(i = 0; i < text.length; i++) {
      if(text.substring(i,i+5)==("&amp;")) {
        text= text.substring(0,i) + "&" + text.substring(i+5);
      }
    }
    res.render('quiz/index', { title: 'Woke', text: text, name: name});
  });

});

router.post('/', auth.requireLogin, (req, res, next) => {
  console.log(req.query);
  User.findById(req.session.userId).exec(function(err, user) {
    user[req.query.name] += parseInt(req.body.points);

    user.save(function(err, user) {
      if(err) { console.error(err) };

      return res.redirect('quiz');
    });
  });
});

router.post('/yesno', auth.requireLogin, (req, res, next) => {
  User.findById(req.params.id, function(err, user) {
    let name = req.query.name;
    user[name] = parseInt(user[name]) + parseInt(req.body.points);

    user.save(function(err, user) {
      if(err) { console.error(err) };

      return res.redirect('quiz/index');
    });
  });
});


module.exports = router;
