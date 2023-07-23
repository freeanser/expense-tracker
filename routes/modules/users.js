// add express and router
const express = require('express')
const router = express.Router()
const passport = require('passport')

// add models
const Category = require('../../models/category')
const Record = require('../../models/record')
const User = require('../../models/user')

// show login page
router.get('/login', (req, res) => {
  return res.render('login')
})

// submit login 
// 加入 middleware，驗證 request 登入狀態
// middleware: 當使用者在 /login 位置發送 POST 請求時，驗證中間件會先執行，然後才會渲染請求的回應畫面
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// logout function
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

// show register page
router.get('/register', (req, res) => {
  return res.render('register')
})

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