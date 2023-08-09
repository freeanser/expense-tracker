// add express and router
const express = require('express')
const router = express.Router()

// add models
const Category = require('../../models/category')
const Record = require('../../models/record')

// show front page
router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .then(records => {
      console.log('userId: ', userId)
      let totalAmount = 0
      Category.find()
        .lean()
        .then(categories => {
          records.forEach(function sumTotal(record) {
            categories.forEach(function mapIcons(category) {
              if (category.name === record.category) { record.icon = category.icon }
            })
            totalAmount += record.amount
          })
          res.render('index', { records, totalAmount })
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
})


// routes 要記得導出去！！！
module.exports = router