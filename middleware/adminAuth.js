const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const authenticateAdmin = async (req, res, next) => {
  
  try {

    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findOne({ _id: decoded.id, token: token });
    
    if (!admin) {
      return res.status(403).json({ message: 'Access denied. Please login.' });
    }

    req.admin = admin; 
    next();

  } catch (error) {
       return res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticateAdmin;
