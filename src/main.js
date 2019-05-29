// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'common/styles/index.styl'
import 'swiper/dist/css/swiper.css'
import 'babel-polyfill'
import VueLazyload from 'vue-lazyload'
import store from 'store/index.js'
import 'common/styles/iconfont.css'
import 'common/styles/border.css'
// import 'common/js/vconsole.js'

Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload,{
  loading:require('common/img/default.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
