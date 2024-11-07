<template>
  <header
    class="h-12 w-screen bg-slate-900 fixed top-0 z-[1] text-white border-white border-b-[1px] shadow-xl shadow-slate-900"
  >
    <div class="w-11/12 mx-auto h-full flex items-center relative">
      <router-link
        :to="{ name: 'home' }"
        class="font-bold text-2xl text-center w-9 mr-6 invert"
        active-class="logo-active"
        exact-active-class="logo-exact-active"
      >
        <img src="../assets/logo.png" alt="logo" class="w-full" />
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
        <div v-if="!loggedIn" class="ml-auto">
          <router-link
            :key="button.id"
            v-for="button in footerButtons as any"
            :to="{ name: button.route }"
            class="navbar-button ml-1"
            :exact-active-class="
              button.selected ? button.selected : 'router-link-exact-active'
            "
            :class="[
              button.color ? button.color : '',
              button.hover ? button.hover : '',
            ]"
            >{{ button.name }}</router-link
          >
        </div>
        <user-dropdown v-else class="ml-auto" />
      </div>
      <div class="w-fit h-full md:hidden">
        <button
          @click.prevent="openSideMenu"
          type="button"
          class="w-fit h-full absolute right-0 z-[100]"
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
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserDropdown from "./UserDropdown.vue";
import store from "@/store";
import { mapState } from "vuex";

export default defineComponent({
  name: "NavBar",
  components: {
    UserDropdown,
  },
  props: ["pages", "footerButtons"],
  computed: {
    ...mapState(["sideMenuVisible", "loggedIn", "userInfo"]),
  },
  methods: {
    openSideMenu() {
      store.commit("sideMenuVisibility");
    },
  },
});
</script>

<style lang="postcss" scoped>
.navbar-button {
  @apply relative inline w-full h-full py-2 px-4 font-bold hover:bg-slate-700 rounded-lg;
}
.router-link-exact-active {
  @apply !border-purple-600 border-b-2 text-purple-600;
}
</style>
