import express from 'express';
import {signup, login} from '../controllers/authController.js';
const router = express.Router();
/*
  post request is used when the client wants to create something new on the server
  in this case we want to signup a new client. When a post request comes into 
  /api/auth/signup, this line is triggered. login works the same way. 
*/
router.post('/signup', signup);
router.post('/login', login);

export default router;