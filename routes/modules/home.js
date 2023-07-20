// add express and router
const express = require('express')
const router = express.Router()

// add models
const Category = require('../../models/category')

// show front page
router.use('/', (req, res) => {
  res.render('index')
})