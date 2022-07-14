import Vue from "vue";
import App from "./App.vue";
import router from "@/router/index";
import vant from "vant"
import 'vant/lib/index.css'
import store from "./store";
Vue.use(store)
import "amfe-flexible";
//引入公共组件=>图标
import haokeIcon from "@/components/haokeIcon.vue";
Vue.component("haokeIcon", haokeIcon); //注册全局组件
Vue.use(vant);
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
