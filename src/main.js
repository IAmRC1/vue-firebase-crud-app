import Vue from 'vue'
import * as VueFire from 'vuefire'
import * as VueRouter from 'vue-router'
import router from './router'
import moment from 'moment'
import App from './App.vue'

Vue.use(VueFire)
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.prototype.moment = moment

new Vue({
  router,
  render: h => h(App),
  
}).$mount('#app')
