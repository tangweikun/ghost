import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PropertySchema = new Schema({
  createdAt: Date,
  date: Date,
  income: Number,
  outlay: Number,
})

const PropertyModel = mongoose.model('property', PropertySchema)

export default PropertyModel
