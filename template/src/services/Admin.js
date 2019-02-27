import Api from '@/services/Api'

export default {
    createUser(value) {
        return Api().post('createUser', value);
    },
    createGroup(value){
        return Api().post('createGroup', value);
    },
    getTeachers(value){
        return Api().post('getTeachers', value);
    }
}