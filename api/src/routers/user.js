const UserControllers = require('../controllers/user');
const express = require('express');
const router = express.Router();
const checkAuth = require('../config/checkAuth');

//* All users
router.post('/login', UserControllers.loginUser);
router.put('/changePassword', checkAuth, UserControllers.changePassword);

module.exports = router;