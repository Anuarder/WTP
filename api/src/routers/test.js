const router = require('express').Router();;
const TestControllers = require('../controllers/test');
const checkAuth = require('../config/checkAuth');

router.post('/createTest', checkAuth, TestControllers.createTest);
router.post('/deleteTest', checkAuth, TestControllers.deleteTest);

router.get('/getTests', checkAuth, TestControllers.getTests);
router.post('/sendTest', checkAuth, TestControllers.sendTest);

module.exports = router;