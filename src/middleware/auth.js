const User=require("../models/user");
const jwt = require('jsonwebtoken');


// const adminAuth = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   if (authHeader && authHeader === 'Bearer admin-token') {
//     next(); // User is authenticated, proceed to the next middleware/route handler
//   } else {
//     res.status(403).json({ message: 'Forbidden: Admins only' });
//   }
// };

// const userAuth = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   if (authHeader && authHeader === 'Bearer user-token') {
//     next(); // User is authenticated, proceed to the next middleware/route handler
//   } else {
//     res.status(403).json({ message: 'Forbidden: Users only' });
//   }
// };

const jwtUserAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }else{
    try{
      const validateJwt=await jwt.verify(token,"Aniket@1234");
      const userId=validateJwt.id;
      const user =await User.findById(userId);
      if(!user){
        return res.status(401).json({ message: 'Unauthorized: User not found' });
      }
      req.user=user;
      next();
    }catch(err){
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  }
}

module.exports = { jwtUserAuth };