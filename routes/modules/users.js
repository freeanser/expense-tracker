// add express and router
const express = require('express')
const router = express.Router()

// add models
const Category = require('../../models/category')
const Record = require('../../models/record')
const User = require('../../models/user')

// show login page
router.get('/login', (req, res) => {
  return res.render('login')
})

// show register page
router.get('/register', (req, res) => {
  return res.render('register')
})

// submit login 


// submit register
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  // 找找看～ if user already had an account
  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('User already exists.')
        res.render('register', {
          name, email, password, confirmPassword
        })
      } else {
        // create new account
        return User.create({ name, email, password })
          .then(() => res.redirect('/'))
      }
    })
    .catch(error => console.log(error))
})

// routes 要記得導出去！！！
module.exports = router