import Api from '@/services/Api'

export default {
    getTeacherStudents(){
        return Api().get('/getTeacherStudents');
    },
    getAllStudents(){
        return Api().get('/getAllStudents');
    },
    addStudents(payload){
        return Api().post('/addStudents', payload);
    },
    getTeacherTests(){
        return Api().get('/getTeacherTests');
    },
    createTest(payload){
        return Api().post('/createTest', payload);
    },
    deleteTest(payload){
        return Api().post('/deleteTest', payload);
    },
    sendTestToStudents(payload){
        return Api().post('/sendTestToStudents', payload);
    }
}