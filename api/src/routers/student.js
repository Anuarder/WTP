const router = require('express').Router();;
const StudentControllers = require('../controllers/student');
const checkAuth = require('../config/checkAuth');

router.get('/getAllStudents', checkAuth, StudentControllers.getAllStudents);

router.get('/getActiveTests', checkAuth, StudentControllers.getActiveTests);
router.get('/getPassedTests', checkAuth, StudentControllers.getPassedTests);
router.post('/passTest', checkAuth, StudentControllers.passTest);

module.exports = router;