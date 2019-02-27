import Api from '@/services/Api'

export default {
    createGroup(value) {
        return Api().post('createGroup', value);
    },
    getStudents(){
        return Api().get('getStudents');
    }
}