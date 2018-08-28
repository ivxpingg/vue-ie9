import Vue from 'vue';
import App from './App.vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import router from './router';
import store from './store';
import Ajax from '@/lib/axios';

Vue.config.productionTip = false;
Vue.use(iView);
Vue.prototype.$http = Ajax;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
