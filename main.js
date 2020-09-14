import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './main.scss'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
