const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');

class AdminController {
  // Login Admin
  loginAdmin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ email });

      if (!admin) {
        return res.status(404).json({ message: 'Admin not found!' });
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials!' });
      }

      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      admin.token = token;
      await admin.save(); 
      
      res.status(200).json({
        message: 'Login successfully!',
        token,
        admin: {
          id: admin._id,
          email: admin.email,
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in:', error });
    }
  };

  // Logout Admin
  logoutAdmin = async (req, res) => {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const admin = await Admin.findById(decoded.id);

      if (!admin) {
        return res.status(403).json({ message: 'Access denied. Not an admin.' });
      }

      admin.token = null; 
      await admin.save(); 

      return res.status(200).json({ message: 'Logout successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Error logging out:', error });
    }
  };
}

module.exports = new AdminController(); 
