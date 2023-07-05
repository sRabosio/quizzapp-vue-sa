// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import {createApp} from 'vue'
import App from './App.vue'
// import router from './router'

/* eslint-disable no-new */
const app = createApp({
  // router,
  components: { App },
  template: '<App/>'
})
app.mount('#app')

