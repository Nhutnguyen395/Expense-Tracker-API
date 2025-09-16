import Expense from '../models/expense.js';

export const createExpense = async (req, res) => {
  try{
    const {date, category, amount, description} = req.body;
    // connect the expense to the logged-in user
    const expense = new Expense({
      user: req.user.userId, // provided by the authMiddleware
      date,
      category,
      amount,
      description
    });

    await expense.save();
    res.status(201).send(expense);
  } catch (error) {
    res.status(400).send({error: 'Error creating expense'});
  }
};

export const getExpense = async (req, res) => {
  try {
    /*  
      the key security filter:
      Expense.find() method is passed with the query object and it retrieves 
      documents from the database that only match with the user id.
    */
   const expenses = await Expense.find({user: req.user.userId});
   res.send(expenses);
  } catch (error) {
    res.status(500).send({error: 'Error fetching expenses'});
  }
};

export const updateExpense = async (req, res) => {
  try {
    /* 
      The request URL looks like /api/expenses/60d21b4667d0d8992e610c85
      and the req.params.id get the unique ID part to see what to update.
    */
    const { id } = req.params; // The ID of what to update (from the URL)
    const updates = req.body; // The new data (from the request body)

    /*
      Expense.findOneAndUpdate() is a mongoose function that finds a document 
      and updates it in a single atomic database operation. It takes 3 arguments:
      The Query: it tells the database to find where the document's _id matches the URL
      and where the document's user field matches the ID of the user logged in. 
      The data: the new data to update
      The options: the configuration object
    */
    const expense = await Expense.findOneAndUpdate(
      { _id: id, user: req.user.userId }, // The Query
      updates,                            // The new data
      { new: true, runValidators: true}  // Options
    );

    if (!expense) {
      return res.status(404).send({error: 'Expense not found or you do not have permission'});
    }
    res.send(expense);
  } catch (error){
    res.status(400).send({error: 'Error updating expense'});
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOneAndDelete(
      { _id: id, user: req.user.userId}
    );

    if (!expense) {
      return res.status(404).send({ error: 'Expense not found or you do not have permission' });
    }

    res.send({message: 'Expense deleted successfully'});
  } catch (error) {
    res.status(500).send({ error: 'Error deleting expense' });
  }
};