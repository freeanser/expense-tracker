// add express and routes
const express = require('express')
const router = express.Router()

// add models
const Category = require('../../models/category')
const Record = require('../../models/record')

// show create page
router.get('/new', (req, res) => {
  return res.render('new')
})

// create record- post created data
// 因為是跟建立資料有關係，所以記得要 async, await
router.post('/', async (req, res) => {
  // 拿出 新的 record 資料 
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  // 找出 record.category = Category.name 的資料
  const categoryData = await Category.findOne({ name: category })
    .lean()
    .catch(error => console.log(error))

  return Record.create({ name, date, category, amount, userId, categoryId: categoryData._id })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// show edit page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})

// update edite data
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, category, amount } = req.body
  // findOneAndUpdate:接受两个参数：一个查询条件的对象和一个包含要更新的字段和值的对象
  // { new: true }: 为了确保返回更新后的文档而不是更新前的文档
  return Record.findOneAndUpdate({ _id, userId }, { name, date, category, amount }, { new: true })
    .lean()
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// delete record
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOneAndDelete({ _id, userId })
    .lean()
    // .then((record) => record.remove())
    .then(() => res.redirect('/'))
})

// exports
module.exports = router