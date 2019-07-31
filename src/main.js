import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import axios from './plugins/axios'

Vue.config.productionTip = false
Vue.config.ignoredElements = ['microblink-ui-web']
new Vue({
  router,
  vuetify,
  axios,
  render: h => h(App)
}).$mount('#app')
