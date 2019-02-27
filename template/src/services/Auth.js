import Api from '@/services/Api'

export default {
    register(value) {
        return Api().post('register', value);
    },
    login(value) {
        return Api().post('login', value)
    },
    updatePassword(value) {
        return Api().put('changePassword', value);
    }
}