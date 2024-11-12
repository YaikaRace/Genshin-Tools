<template>
  <Transition name="sidemenu" :duration="200">
    <aside
      v-show="sideMenuVisible"
      @click.self="sideMenuVisibility"
      class="text-white fixed min-h-[100dvh] min-w-full z-[1] top-0 left-0 md:hidden"
    >
      <div
        class="min-h-full min-w-56 bg-slate-900 fixed right-0 flex flex-col items-center p-4 text-center"
      >
        <div class="h-8 w-full mb-4 border-white border-b-[1px]"></div>
        <ul class="h-full w-full">
          <li v-for="page in pages as any" :key="page.id">
            <router-link
              class="sidebar-button"
              :to="{ name: page.route }"
              @click="sideMenuVisibility"
              >{{ page.name }}</router-link
            >
          </li>
        </ul>
        <ul v-if="!loggedIn" class="min-h-full w-full mt-auto">
          <li v-for="button in footerButtons as any" :key="button.id">
            <router-link
              :to="{ name: button.route }"
              @click="sideMenuVisibility"
              :class="[
                button.color ? button.color : '',
                button.hover ? button.hover : '',
              ]"
              class="sidebar-button"
              :exact-active-class="
                button.selected ? button.selected : 'router-link-exact-active'
              "
              >{{ button.name }}</router-link
            >
          </li>
        </ul>
        <div v-else class="min-h-full w-full mt-auto">
          <user-dropdown />
        </div>
      </div>
    </aside>
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import UserDropdown from "./UserDropdown.vue";

export default defineComponent({
  name: "SideMenu",
  components: {
    UserDropdown,
  },
  props: {
    pages: {
      type: Array,
      default: () => [],
    },
    footerButtons: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapState(["sideMenuVisible", "loggedIn", "userInfo"]),
  },
  methods: {
    ...mapMutations(["sideMenuVisibility"]),
  },
});
</script>

<style lang="postcss">
.sidemenu-enter-from,
.sidemenu-leave-to {
  @apply opacity-0 translate-x-full;
}
.sidemenu-enter-active,
.sidemenu-leave-active {
  @apply transition-all duration-200;
}
.sidebar-button {
  @apply relative block min-h-11 w-full h-full p-2 mb-1 bg-slate-800 rounded-lg;
}
.router-link-exact-active {
  @apply !border-purple-600 border-b-2 text-purple-600;
}
.sidebar-button:after {
  @apply w-full h-[2px] content-[''] absolute bottom-[-2px] left-0 bg-[radial-gradient(closest-side,white,rgba(255,255,255,0))] 
  transition-transform duration-200 ease-out origin-center scale-x-0 -z-10;
}
.sidebar-button:hover::after {
  @apply scale-x-100 -z-10;
}
</style>
