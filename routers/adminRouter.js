const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const { check } = require('express-validator')

router.get('/', adminController.openCreationForm)
router.post('/', adminController.addUser)
module.exports = router