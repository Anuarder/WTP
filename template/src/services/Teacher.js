import Api from '@/services/Api'

export default {
    getTeacherStudents(){
        return Api().get('/getTeacherStudents');
    },
    getAllStudents(){
        return Api().get('/getAllStudents');
    },
    addStudents(payload){
        return Api().put('/addStudents', payload);
    },
    deleteTeacherStudents(payload){
        return Api().put('/deleteTeacherStudents', payload);
    },
    getTeacherTests(){
        return Api().get('/getTeacherTests');
    },
    createTest(payload){
        return Api().post('/createTest', payload);
    },
    deleteTests(payload){
        return Api().delete('/deleteTest', payload);
    },
    sendTestToStudents(payload){
        return Api().put('/sendTestToStudents', payload);
    }
}