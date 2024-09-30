const User = require('../models/user');
const { handleNotFound, handleError } = require('../utils/responseHandler'); // Import the helpers

class UserController {
  
  // CREATE
  createUser = async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(200).json({ message: 'User created successfully', user });
    } catch (error) {
      handleError(res, error);
    }
  };

  // READ (Get All Users)
  getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({ message: 'Get all users successfully', users });
    } catch (error) {
      handleError(res, error);
    }
  };

  // READ (Get Single User by ID)
  getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (handleNotFound(res, user, 'User not found')) return;
      res.status(200).json(user);
    } catch (error) {
      handleError(res, error);
    }
  };

  // UPDATE
  updateUser = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (handleNotFound(res, user, 'User not found')) return;
      res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      handleError(res, error);
    }
  };

  // DELETE
  deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (handleNotFound(res, user, 'User not found')) return;
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      handleError(res, error);
    }
  };
}

module.exports = new UserController();
