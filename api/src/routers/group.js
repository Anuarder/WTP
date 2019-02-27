const GroupControllers = require('../controllers/group');
const router = require('express').Router();;
const checkAuth = require('../config/checkAuth');

router.post('/createGroup', checkAuth, GroupControllers.createGroup);
router.post('/deleteGroup', checkAuth, GroupControllers.deleteGroup);

router.get('/getGroups', checkAuth, GroupControllers.getGroups);
router.get('/getStudents', checkAuth,  GroupControllers.getStudents);

module.exports = router;