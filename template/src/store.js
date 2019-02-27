import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: false,
        user: null,
    },
    plugins: [createPersistedState()],
    mutations: {
        setUserToken(state, token){
            state.token = token;
        },
        setUserData(state, user){
            state.user = user;
        },
        logout(state){
            state.token = false;
            state.user = null;
        },
    },
    actions: {
        setUserToken({commit}, token){
            commit('setUserToken', token);
        },
        setUserData({commit}, user){
            commit('setUserData', user);
        },
        logout({commit}){
            commit('logout')
        },
    }
})
