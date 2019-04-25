const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const RankSchema = new Schema({
  openid: String,
  userInfo: {
    avatarUrl: String,
    city: String,
    country: String,
    gender: Number,
    language: String,
    nickName: String,
    province: String,
  },
  rank: Number,
  record: Number,
  gameplay: String,
});

const RankModel = mongoose.model('24-rank', RankSchema);
module.exports = RankModel;
