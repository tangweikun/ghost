import mongoose from 'mongoose'

const Schema = mongoose.Schema

const QuestionsSchema = new Schema({
  openid: String,
  question: Array,
  isCorrect: Boolean,
  gameplay: String,
  createdAt: Date,
})

const QuestionsModal = mongoose.model('24-questions', QuestionsSchema)

export default QuestionsModal
