import Vue from 'vue';
import io from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import VueKeyCloak from '@dsb-norge/vue-keycloak-js';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import VueLodash from 'vue-lodash';
import lodashDebounce from 'lodash/debounce';

Vue.config.productionTip = false;

Vue.use(VueLodash, { lodash: { debounce: lodashDebounce }});

Vue.use(Buefy);

let url = 'https://todo.shitcloud.io';

if (process.env.NODE_ENV === 'development')
	url = 'localhost:3000';

Vue.use(VueKeyCloak, {
	init: {
		onLoad: 'login-required',
		checkLoginIframe: false
	},
	config: {
		url: 'https://login.shitcloud.io/auth',
		clientId: 'todo',
		realm: 'shitcloud'
	},
	onReady(keycloak) {
		const socketInstance = io(url, { auth: { token: keycloak.token } });
		Vue.use(new VueSocketIO({ debug: true, connection: socketInstance }));

		new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount('#app');
	}
});

