/**
 * Created by Administrator on 2018/4/20.
 */
import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);



import config from './modules/config';//引入某个store对象
import user from './modules/user';//引入某个store对象
import getters from './getters'
var store=new vuex.Store({
  modules: {
    user: user,
    config: config
  },
  getters:  getters
})
export default store
