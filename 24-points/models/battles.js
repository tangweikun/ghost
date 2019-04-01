import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BattleModeSchema = new Schema({
  openid: String,
  myScore: Number,
  rivalScore: Number,
  result: String,
  rivalUserInfo: {
    avatarUrl: String,
    city: String,
    country: String,
    gender: Number,
    language: String,
    nickName: String,
    province: String,
  },
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

const BattleModeModel = mongoose.model('24-battle-mode', BattleModeSchema);

export default BattleModeModel;
