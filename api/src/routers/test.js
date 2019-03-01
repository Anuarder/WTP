const router = require('express').Router();;
const TestControllers = require('../controllers/test');
const checkAuth = require('../config/checkAuth');

router.post('/createTest', checkAuth, TestControllers.createTest);
router.post('/deleteTest', checkAuth, TestControllers.deleteTest);

router.post('/sendTest', checkAuth, TestControllers.sendTest);

router.get('/getTests', checkAuth, TestControllers.getTests);
router.get('/getStudentTests', checkAuth, TestControllers.getStudentTests);

module.exports = router;