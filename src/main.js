import Vue from 'vue'
import App from './App'
import VR from 'vue-resource'
// Vue.use(require('vue-resource'))
Vue.use(VR)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
