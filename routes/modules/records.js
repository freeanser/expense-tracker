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

// show edit page

// update edite data

// delete record


// exports
module.exports = router