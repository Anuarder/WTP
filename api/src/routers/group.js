const GroupControllers = require('../controllers/group');
const router = require('express').Router();;
const checkAuth = require('../config/checkAuth');

router.post('/createGroup', checkAuth, GroupControllers.createGroup);
router.post('/deleteGroup', checkAuth, GroupControllers.deleteGroup);

router.get('/getStudents',  GroupControllers.getStudents);

module.exports = router;