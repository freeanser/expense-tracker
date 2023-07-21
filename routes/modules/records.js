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

// post created data
router.post('/', (req, res) => {
  // const user = req.user
  const { name, date, category, amount } = req.body
  return Record.create({ name, date, category, amount })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// show edit page

// update edite data

// delete record
router.delete('/:id', (req, res) => {
  const _id = req.params.id // 為什麼不能用 req.params.＿id
  return Record.findOne({ _id })
    .then((record) => record.remove())
    .then(() => res.redirect('/'))
})

// exports
module.exports = router