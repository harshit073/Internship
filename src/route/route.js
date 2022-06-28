const express = require('express')
const router = express.Router()
const {createCollege} = require('../controller/collegeController')
// const collegeModel = require('../models/collegeModel')



router.post('/functionUp/colleges', createCollege)

module.exports = router