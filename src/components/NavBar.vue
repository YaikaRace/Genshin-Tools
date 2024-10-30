<template>
  <header
    class="h-12 w-screen bg-slate-700 fixed top-0 z-50 border-white border-b-[1px]"
  >
    <div class="w-11/12 mx-auto h-full flex items-center relative">
      <router-link
        :to="{ name: 'home' }"
        class="font-bold text-2xl text-white text-center"
      >
        Genshin Tools
      </router-link>
      <div class="w-fit h-full md:hidden">
        <button
          @click.prevent="openSideMenu"
          type="button"
          class="w-fit h-full absolute right-0 z-[51]"
        >
          <div class="w-6 h-6 text-white relative">
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
        <side-menu />
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
</style>
