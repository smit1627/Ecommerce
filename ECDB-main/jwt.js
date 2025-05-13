const jwt = require('jsonwebtoken')


const jwtAuthMiddleware = (req, res, next) => {
  try {

    // STEP 1 - Check if the token is present in the request headers (Pehla hum check karenga ki token hai ya nahi) aab kesa check karna hai to jana he hai postman k authorization k andar and vaha humko bearer token ko select kar k token ko paste karna hai

    const authHeader = req.headers.authorization;

    // Check if auth header is present
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    // STEP 2 - If the token is present, verify it using the secret key (Agar token hai to usko verify karna hai)

    // STEP 3 - If the token is valid, proceed to the next middleware (Agar token valid hai to next middleware ko jana hai)


    // const token = req.headers['authorization']
    const token = req.headers.authorization.split(' ')[1]; // Bearer token => token => [Bearer, token] => [0, 1] => 1 => token

    // STEP 4 - If the token is invalid, return an unauthorized response (Agar token invalid hai to unauthorized response dena hai)
    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // STEP 5 - Attach the decoded user information to the request object (Decoded user information ko request object k andar attach karna hai)

    // we can change the variable name from req.user to req.decodedUser or req.userData or anything else it is depends on your application or requirments.....

    // The main aspect to do is to make sure that the decoded user information is attached to request object (req) so that it can be accessed in the next middleware or other route handler.

    req.user = decoded
    // STEP 6 - Call the next middleware function (Next middleware ko call karna hai)

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

// Function to generate JWT token
// make sure karna he ki parameter me user ka object pass karna hai jo humne decoded me dala 

// const generateToken = (user) => {
//     const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' })
//     return token
// }

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION || '9h'
  });
};

// JWT_SECRET ko environment variable me rakhna he to humko .env file me JWT_SECRET ko define karna he AND process.env.JWT_SECRET ko use karna he AND JWT.SIGN ko use karna he to humko JWT ki library ko install karna he to humko command line me ye command run karna he
// npm i jsonwebtoken

// Function to verify JWT token
const verifyToken = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  return decoded
}

module.exports = { jwtAuthMiddleware, generateToken, verifyToken }