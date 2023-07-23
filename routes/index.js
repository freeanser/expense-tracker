// add express and router
const express = require('express')
const router = express.Router()

// add router modules
const home = require('./modules/home')
const records = require('./modules/records')
const users = require('./modules/users')

// 掛載 middleware 
// 假設 auth.js 檔案中有多個中間件函式，可以只導入我需要的那個中間件 （authenticator）
// const authenticator = require('../middleware/auth').authenticator
const { authenticator } = require('../middleware/auth')

// add routes
router.use('/records', authenticator, records)
router.use('/users', users)
router.use('/', authenticator, home) // 定義寬鬆的路由引到清單最下方

module.exports = router