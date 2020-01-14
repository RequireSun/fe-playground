import { Vue } from 'vue-property-decorator';
import VueRouter from 'vue-router';
import App from './App.vue';
import Index from './pages/index.vue';
import ChildMethod from './pages/child-method.vue';
import Store from './pages/store.vue';
import store from './stores/index';
import Vuex from 'vuex';

// Vue.prototype.$store = store;
// Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
        path: '/',
        component: Index,
    }, {
        path: '/child-method',
        component: ChildMethod,
    }, {
        path: '/store',
        component: Store,
    }],
});

new App({
    router,
    store,
}).$mount('#app');
