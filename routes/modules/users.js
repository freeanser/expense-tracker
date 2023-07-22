// add express and router
const express = require('express')
const router = express.Router()

// add models
const Category = require('../../models/category')
const Record = require('../../models/record')

// show login page
router.get('/login', (req, res) => {
  return res.render('login')
})

// show register page
router.get('/register', (req, res) => {
  return res.render('register')
})

// submit login 


// routes 要記得導出去！！！
module.exports = router