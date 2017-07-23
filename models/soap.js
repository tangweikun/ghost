import mongoose from 'mongoose'

const Schema = mongoose.Schema

const SoapSchema = new Schema({})

const SOAPModel = mongoose.model('user', SoapSchema)

export default SOAPModel
