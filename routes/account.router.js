const express = require('express');
const router = express.Router();


const accountController = require('../controllers/account.controller');

// router.post('/register', accountController.postRegister);

// router.get('/activate/:uid/:token', accountController.getActivateAccount);
    
router.post('/login', accountController.postLogin);

router.get('/login', accountController.getLogin);         

// router.post('/logout', accountController.postLogout);         

// router.post('/check-authorization', accountController.isAuthorized);          

module.exports = router;