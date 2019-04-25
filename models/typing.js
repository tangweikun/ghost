const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TypingSchema = new Schema({
  createdAt: Date,
  startAt: Date,
  endAt: Date,
  wpm: Number,
});

const TypingModel = mongoose.model('typing', TypingSchema);

module.exports = TypingModel;
