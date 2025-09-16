const express = require('express');
const router = express.Router();
// importing signup and login functions from controller file
const {signup, login} = require('../controllers/authController');

/*
  post request is used when the client wants to create something new on the server
  in this case we want to signup a new client. When a post request comes into 
  /api/auth/signup, this line is triggered. login works the same way. 
*/
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;