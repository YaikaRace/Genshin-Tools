<template>
  <Transition name="sidemenu" :duration="200">
    <article
      v-show="sideMenuVisible"
      @click.self="sideMenuVisibility"
      class="text-white fixed min-h-screen min-w-full z-40 top-0 left-0"
    >
      <div
        class="min-h-full min-w-56 bg-slate-700 fixed right-0 flex flex-col items-center p-4 text-center"
      >
        <div class="h-8 w-full mb-4 border-white border-b-[1px]"></div>
        <ul class="h-full w-full">
          <li v-for="page in pages" :key="page.id">
            <router-link class="sidebar-button" :to="{ name: page.route }">{{
              page.name
            }}</router-link>
          </li>
        </ul>
        <ul class="min-h-full w-full mt-auto">
          <li v-for="button in footerButtons" :key="button.id">
            <router-link :to="{ name: button.route }" class="sidebar-button">{{
              button.name
            }}</router-link>
          </li>
        </ul>
      </div>
    </article>
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";

export default defineComponent({
  name: "SideMenu",
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
          route: "home",
        },
      ],
      footerButtons: [
        {
          id: 0,
          name: "Sign in",
          route: "home",
        },
        {
          id: 1,
          name: "Sign up",
          route: "home",
        },
      ],
    };
  },
  computed: {
    ...mapState(["sideMenuVisible"]),
  },
  methods: {
    ...mapMutations(["sideMenuVisibility"]),
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
  @apply relative block w-full h-full p-2 mb-1 bg-slate-600 rounded-lg;
}
.sidebar-button:after {
  @apply w-full h-[2px] content-[''] absolute bottom-[-2px] left-0 bg-[radial-gradient(closest-side,white,rgba(255,255,255,0))] 
  transition-transform duration-200 ease-out origin-center scale-x-0;
}
.sidebar-button:hover::after {
  @apply scale-x-100;
}
</style>
