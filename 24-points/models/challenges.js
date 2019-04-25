const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChallengeSchema = new Schema({
  openid: String,
  record: Number,
  totalTime: Number,
  gameplay: String,
  userInfo: {
    avatarUrl: String,
    city: String,
    country: String,
    gender: Number,
    language: String,
    nickName: String,
    province: String,
  },
  createdAt: Date,
});

const ChallengeModel = mongoose.model('24-challenges', ChallengeSchema);

module.exports = ChallengeModel;
