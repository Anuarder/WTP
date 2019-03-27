const router = require('express').Router();;
const TeacherController = require('../controllers/teacher');
const checkAuth = require('../config/checkAuth');

router.post('/createTest', checkAuth, TeacherController.createTest);
router.post('/deleteTest', checkAuth, TeacherController.deleteTest);

router.post('/sendTestToStudents', checkAuth, TeacherController.sendTestToStudents);
router.get('/getTeacherStudents', checkAuth, TeacherController.getTeacherStudents);
router.post('/addStudents', checkAuth, TeacherController.addStudents);
router.get('/getTeacherTests', checkAuth, TeacherController.getTeacherTests);
router.get('/getAllStudents', checkAuth, TeacherController.getAllStudents);

module.exports = router;