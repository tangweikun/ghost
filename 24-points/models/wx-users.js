const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WXAddUsersSchema = new Schema({
  openid: String,
  totalOfAnswers: Number,
  rank: Number,
  totalOfCorrectAnswers: Number,
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
  updatedAt: Date,
});

const WXUsersModel = mongoose.model('wx-users', WXAddUsersSchema);

module.exports = WXUsersModel;
