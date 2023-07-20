// add express and router
const express = require('express')
const router = express.Router()

// add router modules
const home = require('./modules/home')
const records = require('./modules/records')

// add routes
router.use('/records', records)
router.use('/', home)

module.exports = router