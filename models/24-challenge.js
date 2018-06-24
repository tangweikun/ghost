import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ChallengeSchema = new Schema({
  openid: String,
  record: Number,
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
})

const ChallengeModal = mongoose.model('24-challenge', ChallengeSchema)

export default ChallengeModal
