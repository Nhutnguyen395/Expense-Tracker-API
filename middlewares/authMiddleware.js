import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  // 1. Get the token from the "Authorization" header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // 2. Check if token exists
  if (!token) {
    return res.status(401).send({error: 'Access denied. No token provided.'});
  }

  // 3. Verify the token
  /*
    jwt.verify() checks to see if the token's signature was created using the JWT_SECRET, if not its forgery.
    It checks if the token has expired. If both checks passes, it returns the decoded payload. 
    
    We then attach the decoded payload to the req object so any function (like createExpense) runs after will have access to req.user
  */
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // crucial: Pass control to the next function
  } catch (error) {
    res.status(400).send({error: 'Invalid token'});
  }
};