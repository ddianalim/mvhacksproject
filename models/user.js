const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs');

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  JohnDelaney: { type: Number, default: 0 },
  AndrewYang: { type: Number, default: 0 },
  ewarren: { type: Number, default: 0 },
  JulianCastro: { type: Number, default: 0 },
  TulsiGabbard: { type: Number, default: 0 },
  SenGillibrand: { type: Number, default: 0 },
  KamalaHarris: { type: Number, default: 0 },
  PeteButtigieg: { type: Number, default: 0 },
  CoryBooker: { type: Number, default: 0 },
  amyklobuchar: { type: Number, default: 0 },
  BernieSanders: { type: Number, default: 0 },
  GovInslee: { type: Number, default: 0 },
  Hickenlooper: { type: Number, default: 0 },
  BetoORourke: { type: Number, default: 0 },
  realDonaldTrump: { type: Number, default: 0 },
  WayneMessam: { type: Number, default: 0 },
  marwilliamson: { type: Number, default: 0 },
  Joebiden: { type: Number, default: 0 },
  RepSwalwell: { type: Number, default: 0 },
  GovBillWeld: { type: Number, default: 0 },
  OfficialMcAfee: { type: Number, default: 0 },
});

UserSchema.pre('save', function(next) {
  let user = this;

  bcryptjs.hash(user.password, 10, function (err, hash){
    if (err) return next(err);

    user.password = hash;
    next();
  })
});

UserSchema.statics.authenticate = function(username, password, next) {
  User.findOne({ username: username })
    .exec(function (err, user) {
      if (err) {
        return next(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return next(err);
      }
      bcryptjs.compare(password, user.password, function (err, result) {
        if (result === true) {
          return next(null, user);
        } else {
          return next();
        }
      });
    });
}

const User = mongoose.model('User', UserSchema);
module.exports = User;
