import Vue from 'vue'
import App from './App.vue'
import './assets/styles/index.css'
import VueMask from 'v-mask'
import PrettyCheck from 'pretty-checkbox-vue/check';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueTippy, { TippyComponent } from "vue-tippy";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueTippy);

Vue.use(VueSweetalert2);

Vue.component("tippy", TippyComponent);

library.add(faExclamationCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('p-check', PrettyCheck);

Vue.use(VueMask);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
