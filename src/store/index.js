import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import getters from './getters'
import states from './state'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app
  },
  getters,
  states
})

export default store
