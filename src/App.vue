<template>
  <nav-bar :pages="pages" :footer-buttons="footerButtons" />
  <transition name="bg">
    <div
      v-show="sideMenuVisible"
      class="bg-black opacity-60 z-[1] fixed w-full min-h-screen top-0 left-0 transition-all duration-200 md:hidden"
    ></div>
  </transition>
  <side-menu :pages="pages" :footer-buttons="footerButtons" />
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import NavBar from "./components/NavBar.vue";
import SideMenu from "./components/SideMenu.vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "App",
  components: {
    NavBar,
    SideMenu,
  },
  data() {
    return {
      pages: [
        {
          id: 0,
          name: "Home",
          route: "home",
        },
        {
          id: 1,
          name: "TierMaker",
          route: "tiermaker",
        },
      ],
      footerButtons: [
        {
          id: 0,
          name: "Sign in",
          route: "login",
        },
        {
          id: 1,
          name: "Sign up",
          route: "register",
          color: "!bg-purple-600",
          hover: "hover:!bg-gray-300 hover:text-purple-700",
          selected: "!bg-white !text-purple-600 !border-b-4 border-purple-600",
        },
      ],
    };
  },
  computed: {
    ...mapState(["sideMenuVisible"]),
  },
});
</script>

<style lang="postcss" scoped>
.bg-enter-from,
.bg-leave-to {
  @apply opacity-0;
}
.bg-enter-active,
.bg-leave-active {
  @apply transition-opacity duration-200;
}
</style>
