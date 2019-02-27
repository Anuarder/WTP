const express = require('express');
const router = express.Router();
const AdminUserController = require('../controllers/adminUser');
const AdminGroupController = require('../controllers/adminGroup');
const checkAuth = require('../config/checkAuth');

//? Admin
router.post('/createUser', checkAuth, AdminUserController.createNewUser);
router.post('/createGroup', checkAuth, AdminGroupController.createNewGroup);

router.post('/getTeachers',  AdminUserController.getTeachers);
module.exports = router;