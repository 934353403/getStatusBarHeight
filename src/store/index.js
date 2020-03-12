import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate'; //持久化vuex状态;
Vue.use(Vuex);
const store = new Vuex.Store({
    // strict: process.env.NODE_ENV !== 'production',
    // // plugins: [createPersistedState()],
    state: {
        statusBarHeight: 0,
    },
    //相当于计算属性;
    getters: {},
    //必须同步
    mutations: {
        //设置手机状态栏高度
        setStatusBarHeight(state, height) {
            state.statusBarHeight = height;
        }
    },
    //可以异步执行;
    actions: {}
});
export default store;
