import Vue from 'vue'
import Vuex from 'vuex'
import store from './store/store';
import App from './App.vue'

Vue.use(Vuex);

new Vue({
	store,
  el: '#app',
  render: h => h(App)
})
