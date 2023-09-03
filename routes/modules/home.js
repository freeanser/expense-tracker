// add express and router
const express = require('express')
const router = express.Router()
const { DateTime } = require('luxon');

// add models
const Category = require('../../models/category')
const Record = require('../../models/record')

// show front page
router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .sort({ date: 'asc' })
    .then(records => {
      let totalAmount = 0
      Category.find()
        .lean()
        .then(categories => {
          records.forEach(function sumTotal(record) {
            categories.forEach(function mapIcons(category) {
              if (category.name === record.category) { record.icon = category.icon }
            })
            totalAmount += record.amount
            record.date = DateTime.fromJSDate(record.date, { zone: 'Asia/Taipei' }).toISODate();
          })
          res.render('index', { records, totalAmount })
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
})


// routes 要記得導出去！！！
module.exports = router