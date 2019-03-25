import Api from '@/services/Api'

export default {
    getActiveTests(){
        return Api().get('/getActiveTests');
    },
    getPassedTests(){
        return Api().get('/getPassedTests');
    },
    passTest(payload){
        return Api().post('/passTest', payload);
    }
}