const router = require('express').Router();;
const TestControllers = require('../controllers/test');
const checkAuth = require('../config/checkAuth');

router.post('/createTest', checkAuth, TestControllers.createTest);
router.post('/deleteTest', checkAuth, TestControllers.deleteTest);

module.exports = router;