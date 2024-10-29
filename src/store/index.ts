import { createStore } from "vuex";

export default createStore({
  state: {
    sideMenuVisible: false,
  },
  getters: {},
  mutations: {
    sideMenuVisibility(state) {
      state.sideMenuVisible = !state.sideMenuVisible;
    },
  },
  actions: {},
  modules: {},
});
