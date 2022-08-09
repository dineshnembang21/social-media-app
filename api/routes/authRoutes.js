const express = require('express');
const router = express.Router();
const authController =require('../controllers/authController');

// router.get('/',(req,res)=> res.send("This is home"));

router.post('/register',authController.register);

router.post('/login',authController.post_login);

module.exports = router;