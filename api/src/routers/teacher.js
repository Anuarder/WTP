const router = require('express').Router();;
const TeacherController = require('../controllers/teacher');
const checkAuth = require('../config/checkAuth');

router.get('/getTeacherStudents', checkAuth, TeacherController.getTeacherStudents);
router.get('/getTeacherTests', checkAuth, TeacherController.getTeacherTests);
router.get('/getAllStudents', checkAuth, TeacherController.getAllStudents);
router.get('/getStudentsResults', checkAuth, TeacherController.getStudentsResults);

router.post('/createTest', checkAuth, TeacherController.createTest);
router.post('/deleteTests', checkAuth, TeacherController.deleteTests);

router.put('/sendTestToStudents', checkAuth, TeacherController.sendTestToStudents);
router.put('/addStudents', checkAuth, TeacherController.addStudents);
router.put('/deleteTeacherStudents', checkAuth, TeacherController.deleteTeacherStudents);


module.exports = router;