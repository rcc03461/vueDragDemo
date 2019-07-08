import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import VueDragResize from 'vue-drag-resize'
Vue.component('vue-drag-resize', VueDragResize)

import * as svgicon from 'vue-svgicon';

Vue.use(svgicon, {
    tagName: 'svgicon'
});


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
