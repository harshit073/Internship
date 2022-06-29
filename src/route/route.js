const express = require('express')
const router = express.Router()
const {createCollege, collegeDetails} = require('../controller/collegeController')
const {createIntern} = require('../controller/internController')


//create College api
router.post('/functionUp/colleges', createCollege)

//create Intern api
router.post('/functionUp/interns', createIntern)

//college details api
router.get('/functionUp/collegeDetails', collegeDetails)

module.exports = router