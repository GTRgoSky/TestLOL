import Vuex from 'vuex'
import Vue from 'vue' 
import user from './modules/user';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 99
    },
    mutations: {
        increment(state) {
            state.count++
        }
    },
    modules: {
        user
    }
})