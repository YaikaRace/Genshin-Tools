<template>
  <header class="h-12 bg-slate-700">
    <div class="w-11/12">
      <router-link :to="{ name: 'home' }" class="font-bold text-4xl text-white">
        Genshin TierMaker
      </router-link>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavBar",
});
</script>

<style scoped></style>
