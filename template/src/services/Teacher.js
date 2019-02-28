import Api from '@/services/Api'

export default {
    createGroup(value) {
        return Api().post('createGroup', value);
    },
    deleteGroup(value){
        return Api().post('deleteGroup', value);
    },
    getStudents(){
        return Api().get('getStudents');
    },
    getGroups(){
        return Api().get('getGroups');
    },
    createTest(value){
        return Api().post('createTest', value);
    }
}