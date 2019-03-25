import Api from '@/services/Api'

export default {
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