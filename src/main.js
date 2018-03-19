import Vue from 'vue'
import App from './App.vue'

import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en'
})

new Vue({
  el: '#app',
  i18n,
  render: h => h(App)
})
