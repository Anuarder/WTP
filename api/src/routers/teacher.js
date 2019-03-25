const router = require('express').Router();;
const TeacherController = require('../controllers/teacher');
const checkAuth = require('../config/checkAuth');

router.post('/createTest', checkAuth, TeacherController.createTest);
router.post('/deleteTest', checkAuth, TeacherController.deleteTest);

router.post('/sendTestToStudents', checkAuth, TeacherController.sendTestToStudents);
router.get('/getStudents', checkAuth, TeacherController.getStudents);

module.exports = router;