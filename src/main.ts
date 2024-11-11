import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faEyeDropper,
  faArrowsUpDown,
  faBan,
  faBars,
  faXmark,
  faCaretDown,
  faSpinner,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import router from "./router";
import store from "./store";

library.add(
  faEyeDropper,
  faArrowsUpDown,
  faBan,
  faBars,
  faXmark,
  faCaretDown,
  faSpinner,
  faPlus
);

(async () => {
  const userData = window.sessionStorage.getItem("userData");
  if (userData) {
    store.commit("setUserInfo", JSON.parse(userData));
  } else {
    const baseUrl = process.env.VUE_APP_API_URL;
    if (!baseUrl) return false;
    try {
      const data = await fetch(baseUrl + "/user/info/me", {
        method: "GET",
        credentials: "include",
        headers: {
          "x-access-key": process.env.VUE_APP_ACCESS_KEY,
        },
      });
      const json = await data.json();
      if (json.success !== undefined && !json.success) {
        store.commit("setUserInfo", null);
      } else {
        store.commit("setUserInfo", json);
        window.sessionStorage.setItem("userData", JSON.stringify(json));
      }
    } catch (error) {
      store.commit("setUserInfo", null);
    }
  }
  createApp(App)
    .use(store)
    .use(router)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount("#app");
})();
