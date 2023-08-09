// add category seeds
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Category = require('../category')
const categoryList = require('../../category.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  // insertMany 是 Mongoose 提供的一个方法，用于将多个文档插入到 MongoDB 数据库中的集合中
  Category.insertMany(categoryList.categories)
    .then(
      () => {
        console.log('categories added!')
        return db.close()
      })
    .then(() => {
      console.log('database connection closed...')
    })
})
