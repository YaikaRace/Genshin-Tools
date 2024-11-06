import { createStore } from "vuex";

export default createStore({
  state: {
    sideMenuVisible: false,
    loggedIn: false,
    userInfo: {},
  },
  getters: {},
  mutations: {
    sideMenuVisibility(state) {
      state.sideMenuVisible = !state.sideMenuVisible;
    },
    setUserInfo(state, payload) {
      state.userInfo = payload;
      state.loggedIn = Boolean(payload);
    },
  },
  actions: {},
  modules: {},
});
