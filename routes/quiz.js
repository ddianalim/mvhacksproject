var express = require('express');
const router = express.Router();

const auth = require('./helpers/auth');
const Quiz = require('../models/quiz');
const User = require('../models/user');

router.get('/', auth.requireLogin, (req, res, next) => {
  // Quiz.find({users: res.locals.currentUserId}).sort({ date: +1 }).exec(function(err, quiz) {
  //   if(err) {
  //     console.error(err);
  //   } else {
  //     res.render('quiz/index', { quiz: quiz });
  //   }
  // });
       res.render('quiz/index', { quiz: quiz });
});

// /* POST day. */
// router.post('/', auth.requireLogin, (req, res, next) => {
//   let day = new Day(req.body);
//   day.users.push(req.session.userId);
//
//   Day.create(day).then(() => {
//     return res.redirect('/quiz');
//   }).catch((err) => {
//     console.log(err.message);
//   });
//
//   // Day.save(function(err, day) {
//   //   console.log(day);
//   //   if (err) { console.error(err);}
//   //   return res.redirect('/quiz')
//   // });
// });
//
// quiz new
router.get('/new', auth.requireLogin, (req, res, next) =>{
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
  var r = Math.floor((Math.random() * 21) + 1);
  var name = candidates[r];
  console.log(name);

  var params = {
    screen_name: name,
    count: 100,
    tweet_mode: 'extended',
    // in_reply_to_status_id: null,
    // retweeted: false
  };

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    var random = Math.floor((Math.random() * 100));
    var text = tweets[random]["full_text"];
    for(i = 0; i < text.length; i++) {
      if(text.substring(i,i+5)==("&amp;")) {
        text= text.substring(0,i) + "&" + text.substring(i+5);
      }
    }
    res.render('quiz/new', { title: 'Woke', text: text});
  });

});

//
// // /* GET quiz by ID. */
// // router.get('/:id', auth.requireLogin, (req, res, next) => {
// //   Day.findById(req.params.id, (err, day) => {
// //     if (err) {
// //       console.log(err);
// //     }
// //     res.render('quiz/show', { day: day  });
// //   });
// // });
//
// // quiz show
// router.get('/:id', auth.requireLogin, (req, res, next) => {
//   Day.findById(req.params.id, function(err, day) {
//     if(err) { console.error(err) };
//
//     res.render('quiz/show', { day: day });
//   });
// });

module.exports = router;
