const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const { check } = require('express-validator');
// const {setCurrentUser} = require('../public/globals');

router.get('/', userController.openLoginForm)
// router.post('/', [
//     check('role').isString(),
//     check('userId').isNumeric(),
//     check('password').isString()
// ], userController.log)
router.post('/', userController.login)

module.exports = router