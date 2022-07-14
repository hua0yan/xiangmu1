import { getLocal, setLocal } from "@/utils/storage";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: getLocal("key"),
    CityName: "北京",
    CityNameid: "AREA|88cff55c-aaa4-e2e0",
  },
  getters: {},
  mutations: {
    //把token存到state.user里，并存到本地
    getUser(state, user) {
      state.user = user;
      setLocal("key", user);
    },
    getCityName(state, item) {
      state.CityName = item.label;
      state.CityNameid = item.value;
      console.log(state);
    },
  },
  actions: {},
  modules: {},
});
