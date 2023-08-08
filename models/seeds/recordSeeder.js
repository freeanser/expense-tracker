// add record seeds
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
//當應用程式不是在生產環境中運行時（即 NODE_ENV 不等於 'production'），就會執行 require('dotenv').config()。這將引入 "dotenv" 套件並讀取 ".env" 檔案的內容，然後將其中的環境變數加載到應用程式的環境變數中。

// add database mongoose
const mongoose = require('mongoose')
const Record = require('../record')
const User = require('../user')
const Category = require('../category')

const recordList = require('../../record.json').records
const userList = require('../../user.json')

const db = require('../../config/mongoose')
const categories = []

// add data
db.once('open', () => {
  Promise.all(
    // 幫種子資料加鹽
    userList.map(seedUser => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seedUser.password, salt))
        .then(hash => {
          return User.create({
            name: seedUser.name,
            email: seedUser.email,
            password: hash
          })
            .catch(err => console.log(err))
        })
    }))
})
