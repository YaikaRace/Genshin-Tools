import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faEyeDropper,
  faArrowsUpDown,
} from "@fortawesome/free-solid-svg-icons";

library.add(faEyeDropper, faArrowsUpDown);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
