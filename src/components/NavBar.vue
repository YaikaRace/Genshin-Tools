<template>
  <header class="h-12 bg-slate-700">
    <div class="w-11/12 mx-auto h-full flex items-center relative">
      <router-link
        :to="{ name: 'home' }"
        class="font-bold text-2xl text-white text-center"
      >
        Genshin TierMaker
      </router-link>
      <button
        @click.prevent="openSideMenu"
        type="button"
        class="w-4 absolute right-0"
      >
        <font-awesome-icon
          icon="fa-solid fa-bars"
          class="text-white min-w-4 h-full"
        />
      </button>
      <side-menu />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideMenu from "./SideMenu.vue";
import store from "@/store";

export default defineComponent({
  name: "NavBar",
  components: {
    SideMenu,
  },
  methods: {
    openSideMenu() {
      store.commit("sideMenuVisibility");
    },
  },
});
</script>

<style lang="postcss" scoped></style>
