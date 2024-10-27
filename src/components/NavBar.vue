<template>
  <header class="h-12 bg-slate-700">
    <div class="w-11/12 mx-auto h-full flex items-center">
      <router-link
        :to="{ name: 'home' }"
        class="font-bold text-2xl text-white text-center"
      >
        Genshin TierMaker
      </router-link>
      <!-- <side-menu /> -->
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import SideMenu from "./SideMenu.vue";

export default defineComponent({
  name: "NavBar",
  components: {
    // SideMenu,
  },
});
</script>

<style lang="postcss" scoped></style>
