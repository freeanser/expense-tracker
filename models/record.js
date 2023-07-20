// add database
const mongoose = require('mongoose')

// add schema
const Schema = mongoose.Schema
const RecordSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  // },
  // categoryId: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  // }
})

module.exports = mongoose.model('Record', RecordSchema)