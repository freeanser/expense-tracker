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
  userId: {
    type: Schema.Types.ObjectId, // 這個欄位將會存儲 MongoDB 中的文檔 ID。ObjectId 是 MongoDB 中的一種特殊型別，用於唯一識別文檔
    required: true,
    // 參考（Reference）了名為 'User' 的 Mongoose model。這意味著 userId 欄位將會存儲一個指向 'User' model 的文檔 ID，這樣就建立了兩個文檔之間的關聯
    ref: 'User',
    index: true, //表示這個欄位將在數據庫中建立索引，這樣可以加快對這個欄位的查詢速度
  },
  // categoryId: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'Category',
  //   index: true, //表示這個欄位將在數據庫中建立索引，這樣可以加快對這個欄位的查詢速度
  // }
})

module.exports = mongoose.model('Record', RecordSchema)