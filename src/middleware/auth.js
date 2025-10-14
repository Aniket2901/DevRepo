const adminAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader === 'Bearer admin-token') {
    next(); // User is authenticated, proceed to the next middleware/route handler
  } else {
    res.status(403).json({ message: 'Forbidden: Admins only' });
  }
};

const userAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader === 'Bearer user-token') {
    next(); // User is authenticated, proceed to the next middleware/route handler
  } else {
    res.status(403).json({ message: 'Forbidden: Users only' });
  }
};

module.exports = { adminAuth, userAuth };