const mongoose = require('mongoose');

/*
  The user type is a special data type for storing MongoDB's unique identifiers. 
  ref: 'Users' tells Mongoose that the ID stored in this field is from the 'User' collection. 
*/
const expenseSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  date: {type: Date, default: Date.now},
  category: {type: String, required: true},
  amount: {type: Number, required: true},
  description: {type: String}
});

module.exports = mongoose.model('Expense', expenseSchema);