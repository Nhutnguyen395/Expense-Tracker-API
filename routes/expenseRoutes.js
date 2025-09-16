const express = require('express');
const router = express.Router();
const {createExpense, getExpense, updateExpense, deleteExpense} = require('../controllers/expenseController');
/*
  authMiddleware checks for the client's ID (their JWT) before allowing them to create, get, update, or delete.
*/
const authMiddleware = require('../middlewares/authMiddleware');

/*
  When the request hits the endpoint '/', express does not call createExpense immediately but it calls the authMiddleware.
  It looks for the Authorization header in the request, its takes the JWT long string and uses jsonwebtoken and JWT_SECRETE
  to verify if this token is valid. If the invalid then it sends back a 401 unauthorized error, otherwise it would 
  decode the token to get the user's ID and attaches it to the req object and calls next(). Express then moves on and call createExpense. 
  The same goes for the other 3. The '/:id' in put and delete is an URL parameter that tells which specific expense to update and delete. 
*/
router.post('/', authMiddleware, createExpense);
router.get('/', authMiddleware, getExpense);
router.put('/:id', authMiddleware, updateExpense);
router.delete('/:id', authMiddleware, deleteExpense);

module.exports = router;