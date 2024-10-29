<template>
  <Transition name="sidemenu" :duration="200">
    <article
      v-show="sideMenuVisible"
      class="text-white fixed min-h-screen min-w-full bg-black bg-opacity-35 z-50 top-0 left-0 Transition-all duration-200"
    >
      <div
        class="min-h-full min-w-56 bg-slate-700 fixed right-0 flex justify-center p-4 text-center"
      >
        <ul>
          <li>
            <router-link class="sidebar-button" :to="{ name: 'home' }"
              >Home</router-link
            >
          </li>
          <li>
            <router-link class="sidebar-button" :to="{ name: 'home' }"
              >TierMaker</router-link
            >
          </li>
        </ul>
      </div>
    </article>
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "SideMenu",
  computed: {
    ...mapState(["sideMenuVisible"]),
  },
});
</script>

<style lang="postcss" scoped>
.sidemenu-enter-from,
.sidemenu-leave-to {
  @apply opacity-0 translate-x-full;
}
.sidemenu-enter-active,
.sidemenu-leave-active {
  @apply transition-all duration-200;
}
.sidebar-button {
  @apply relative;
}
.sidebar-button:after {
  @apply w-full h-[2px] content-[''] absolute bottom-[-2px] left-0 bg-white transition-transform duration-200 ease-out origin-center scale-x-0;
}
.sidebar-button:hover::after {
  @apply scale-x-100;
}
</style>
