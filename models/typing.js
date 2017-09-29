import mongoose from 'mongoose'

const Schema = mongoose.Schema

const TypingSchema = new Schema({
  createdAt: Date,
  startAt: Date,
  endAt: Date,
  wpm: Number,
})

const TypingModel = mongoose.model('typing', TypingSchema)

export default TypingModel
