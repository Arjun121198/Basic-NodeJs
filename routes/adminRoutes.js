const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/login', adminController.loginAdmin);
router.post('/logout', adminController.logoutAdmin);

module.exports = router;