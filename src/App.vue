<template>
  <nav-bar />
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import NavBar from "./components/NavBar.vue";

export default defineComponent({
  name: "App",
  components: {
    NavBar,
  },
});
</script>
