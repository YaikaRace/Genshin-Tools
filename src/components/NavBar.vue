<template>
  <header
    class="h-12 w-screen bg-slate-900 fixed top-0 z-50 text-white border-white border-b-[1px]"
  >
    <div class="w-11/12 mx-auto h-full flex items-center relative">
      <router-link
        :to="{ name: 'home' }"
        class="font-bold text-2xl text-center min-w-fit p-1 rounded-md"
        active-class="logo-active"
        exact-active-class="logo-exact-active"
      >
        Genshin Tools
      </router-link>
      <div class="hidden h-full w-full p-4 md:flex items-center">
        <div>
          <router-link
            v-for="page in pages as any"
            :key="page.id"
            class="navbar-button mr-1"
            :to="{ name: page.route }"
            >{{ page.name }}</router-link
          >
        </div>
        <div class="ml-auto">
          <router-link
            :key="button.id"
            v-for="button in footerButtons as any"
            :to="{ name: button.route }"
            class="navbar-button ml-1"
            >{{ button.name }}</router-link
          >
        </div>
      </div>
      <div class="w-fit h-full md:hidden">
        <button
          @click.prevent="openSideMenu"
          type="button"
          class="w-fit h-full absolute right-0 z-[51]"
        >
          <div class="w-6 h-6 relative">
            <font-awesome-icon
              icon="fa-solid fa-bars"
              class="min-w-4 h-6 absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-200"
              :class="{
                'opacity-0': sideMenuVisible,
                'rotate-180': sideMenuVisible,
              }"
            />
            <font-awesome-icon
              icon="fa-solid fa-xmark"
              class="min-w-4 h-7 absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-200"
              :class="{
                'opacity-0': !sideMenuVisible,
                'rotate-180': !sideMenuVisible,
              }"
            />
          </div>
        </button>
        <transition name="bg">
          <div
            v-show="sideMenuVisible"
            class="bg-black opacity-60 fixed w-full min-h-screen top-0 left-0 transition-all duration-200"
          ></div>
        </transition>
        <side-menu :pages="pages" :footer-buttons="footerButtons" />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideMenu from "./SideMenu.vue";
import store from "@/store";
import { mapState } from "vuex";

export default defineComponent({
  name: "NavBar",
  components: {
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
        },
      ],
    };
  },
  computed: {
    ...mapState(["sideMenuVisible"]),
  },
  methods: {
    openSideMenu() {
      store.commit("sideMenuVisibility");
    },
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
.navbar-button {
  @apply relative inline w-full h-full py-2 px-4 bg-slate-800 rounded-lg;
}
.router-link-exact-active {
  @apply bg-purple-600;
}
</style>
