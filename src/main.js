import Vue from 'vue';
import App from './App.vue';
import router from './routes';
import store from './store';
import api from './api';
//css global
import './assets/css/main.scss';

Vue.config.productionTip = false;

// init default api configs 
api.init();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
