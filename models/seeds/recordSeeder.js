// add database mongoose
const mongoose = require('mongoose')
const Record = require('../record')

// env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
} //當應用程式不是在生產環境中運行時（即 NODE_ENV 不等於 'production'），就會執行 require('dotenv').config()。這將引入 "dotenv" 套件並讀取 ".env" 檔案的內容，然後將其中的環境變數加載到應用程式的環境變數中。

// seeder
const SEED_USER = {
  name: '午餐',
  date: '2019/4/23',
  amount: 60,
}


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
}) // on 是事件監聽器

// add data
db.once('open', () => {
  console.log('mongodb connected')
  Record.create(SEED_USER)
})
