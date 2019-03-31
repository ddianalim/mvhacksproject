const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
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

module.exports = mongoose.model('Quiz', QuizSchema);
