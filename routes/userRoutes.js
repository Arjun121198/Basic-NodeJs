const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateAdmin = require('../middleware/adminAuth'); 

router.post('/', authenticateAdmin, userController.createUser);             
router.get('/', authenticateAdmin, userController.getAllUsers);                
router.get('/:id', authenticateAdmin, userController.getUserById);                
router.put('/:id', authenticateAdmin, userController.updateUser);              
router.delete('/:id', authenticateAdmin, userController.deleteUser);              

module.exports = router;