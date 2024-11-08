<template>
  <footer>
    <div class="dropdown hidden font-bold relative min-w-32 h-fit md:block">
      <button
        class="text-center border-2 border-b-0 rounded-t-lg border-transparent w-full"
      >
        {{ userInfo.username }}
        <font-awesome-icon icon="fa-solid fa-caret-down" class="ml-1" />
      </button>
      <ul
        class="absolute hidden text-center min-w-full border-2 border-t-0 rounded-b-lg border-transparent"
      >
        <li>
          <router-link :to="{ name: 'settings' }" class="drop-button"
            >Settings</router-link
          >
        </li>
        <li>
          <router-link :to="{ name: 'logout' }" class="drop-button"
            >Log Out</router-link
          >
        </li>
      </ul>
    </div>
    <div class="block md:hidden">
      <details class="sidebar-button">
        <summary>{{ userInfo.username }}</summary>
        <ul
          class="text-center min-w-full border-2 border-t-0 border-transparent"
        >
          <li>
            <router-link :to="{ name: 'settings' }" class="drop-button py-2"
              >Settings</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'logout' }" class="drop-button py-2"
              >Log Out</router-link
            >
          </li>
        </ul>
      </details>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "UserDropdown",
  computed: {
    ...mapState(["userInfo"]),
  },
});
</script>

<style lang="postcss" scoped>
.dropdown:hover button {
  @apply bg-slate-900 border-white;
}
.dropdown:hover ul {
  @apply bg-slate-900 border-white block;
}
.dropdown ul li {
  @apply min-w-full min-h-full block;
}
.drop-button {
  @apply block min-w-full min-h-full py-1 hover:bg-slate-700 rounded-lg;
}
details {
  @apply border-2 border-transparent cursor-pointer;
}
details ul {
  @apply transition-transform duration-200 scale-y-0 origin-bottom;
}
details[open] ul {
  @apply scale-y-100;
}
details ul li {
  @apply block;
}
</style>
