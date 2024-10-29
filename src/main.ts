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
} from "@fortawesome/free-solid-svg-icons";

import router from "./router";
import store from "./store";

library.add(faEyeDropper, faArrowsUpDown, faBan, faBars);

createApp(App)
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
