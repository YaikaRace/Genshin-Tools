<template>
  <article
    class="text-white fixed min-h-screen min-w-full bg-black bg-opacity-35 z-50 top-0 left-0"
  >
    <div
      class="min-h-full min-w-56 bg-slate-700 fixed right-0 flex justify-center"
    >
      <ul>
        <li><router-link :to="{ name: 'home' }">Home</router-link></li>
      </ul>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SideMenu",
});
</script>
