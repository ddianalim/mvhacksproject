const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.get('/', (req, res, next) => {
  res.render('candidates/index');
});

router.get('/show', (req, res, next) => {
  User.findById(req.params.id, function(err, user) {

  });

  res.render('candidates/show', { user: user });
});

module.exports = router;
