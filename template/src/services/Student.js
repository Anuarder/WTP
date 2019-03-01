import Api from '@/services/Api'

export default {
    getStudentTests(){
        return Api().get('/getStudentTests');
    }
}