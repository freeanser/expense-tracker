// add express and router
const express = require('express')
const router = express.Router()

// add router modules
const home = require('./modules/home')

// add routes
router.use('/', home)

module.exports = router