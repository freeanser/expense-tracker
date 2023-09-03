// add record seeds
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
//當應用程式不是在生產環境中運行時（即 NODE_ENV 不等於 'production'），就會執行 require('dotenv').config()。這將引入 "dotenv" 套件並讀取 ".env" 檔案的內容，然後將其中的環境變數加載到應用程式的環境變數中。

// add database mongoose
const Record = require('../record')
const User = require('../user')
const Category = require('../category')

// seeder
const recordList = require('../../record.json').records
const userList = require('../../user.json')

const db = require('../../config/mongoose')
const categories = []

// add seed data
db.once('open', () => {
  // 目標： 基本的 record 資料 -> (1)要加上 userId, (2)要加上 categoryId,

  // Promise.all 確保一定要完整執行
  Promise.all(
    // 把 user 資料一個一個拿出來加鹽
    userList.map(seedUser => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seedUser.password, salt))
        .then(hash => {

          // 把加鹽後的user放進資料庫
          return User.create({
            name: seedUser.name,
            email: seedUser.email,
            password: hash
          })
            .catch(err => console.log(err))
        })

        // (1)要加上 userId
        // 把加鹽後的user 一個一個 拿出來，並合併 recordList(json) 和 user._id
        // 無法在資料庫中合併，所以要在 record.json 檔合併 資料庫中的 user._id
        .then(user => {
          const userRecords = seedUser.userRecords.map(item => {
            return Object.assign(recordList[item - 1], { userId: user._id })

            // const target = { a: 1, b: 2 };
            // const source = { b: 3, c: 4 };
            // const result = Object.assign(target, source);
            // console.log(result); // { a: 1, b: 3, c: 4 }

            // userRecords = recordList + user._id

          })
          return userRecords
        })

        // (2)要加上 categoryId,
        // (a) 找到 userRecord 的 category，並存放在 categories=[] 裡面
        .then(async userRecords => {

          await Promise.all(userRecords.map(async item => {
            const ref = await Category.findOne({ name: item.category })
              .lean()
              .catch(error => console.log(error))
            categories.push(ref)
          })
          )
          // (b) 把 userRecords 一個一個 取出，並依照 categories 陣列的資料順序，將 categoryId 合併，並 return 交給下一步.then
          let idx = 0
          return userRecords.map(item => {
            return Object.assign(item, { categoryId: categories[idx++]._id })
          })
        })

        // record.json 資料已經 合併了 userId、categoryId，可以加進 Record 資料庫了
        .then(userCategoryRecords => {
          return Record.create(userCategoryRecords)
            .catch(err => console.log(err))
        })
    })
  )
    .then(() => {
      console.log('done.')
      process.exit()
    })
})
