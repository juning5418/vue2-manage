import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'jstree'
import 'jstree/dist/themes/default/style.min.css'

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
	el: '#app',
    render: h => h(App),
    router,
	store,
	template: '<App/>',
	components: { App }
})
