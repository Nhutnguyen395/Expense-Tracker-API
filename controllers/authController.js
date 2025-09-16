import User from '../models/User';
import jwt from 'jasonwebtoken';

export const signup = async(req, res) => {
  try {
    // 1. Get username and password from the request body
    const {username, password} = req.body;

    // 2. Create a new user instance using the User Model
    const user = new User({username, password});

    // 3. Save the instance to the database
    await user.save();

    // 4. Send back a succes response
    res.stats(201).send({message: 'User created successfully'});
  } catch (error) {
    res.status(400).send({error: 'Error creating user'});
  }
};

export const login = async(req, res) => {
  try {
    // 1. get credentials from the request
    const {username, password} = req.body;
    
    // 2. Find the user and their password
    const user = await User.findOne({username});

    // 3. Verify the user and their password
    // if database returns nothing then user does not exists or password does not match
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send({error: 'Invalid credentials'});
    }

    // 4. If credentials are valid, create JWT
    // .sign takes 3 arguments - payload, secret key, and options
    // we store the userid to know who they are in the future
    const token = jwt.sign(
      {userId: user.id},
      process.env.JWT_SECRET,
      {expiresIn: '1h'}
    );

    // 5. Send the token back to the user
    // The user is responsible for this token and sending it back with every future request to a protected endpoint.
    res.send({token});
  } catch (error){
    res.status(400).send({error: 'Error logging in'});
  }
};