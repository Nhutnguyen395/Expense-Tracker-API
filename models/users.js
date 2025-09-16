import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Create the user schema
const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

/* 
  Hash the password before saving - never store passwords as plain text
  -----------------------------------
  .pre is basically saying before we save event is completed, run the function.
  Hashing password is an intensive operation that we want to perform without blocking the 
  application so we use async await. We must call 'next()' to say that we are done with the pre-save logic.
  If the password is not modified or changed by the user then we can skip the hasing and call next().
  'salt' is a random string of characters that is mixed in with the password before hasing, 10 represents 
  the cost factor, how complext the salt generation is. We then perform the hashing algorithm where 'this.password'
  is mixed with the salt and the hashing algorithm begins. We then call next() to say the hashing is completed. 
*/
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/*
  Add a method to compare passwords
  -------------------------------
  When a user enters their password we cannot hash it and compare it to the one in the database because
  the salt mixed in the password is different everytime. bcrypt.compare will hash the plain text password
  using the same salt that is stored within the hashed password. Returns true if matched else false.
*/
userSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
};

// compile userSchema into a user model and export so other files can acess it
export default mongoose.model('User', userSchema);